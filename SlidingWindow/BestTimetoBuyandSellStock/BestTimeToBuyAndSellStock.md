# 121. Best Time to Buy and Sell Stock

**Difficulty:** Easy  
**Topics:** Array, Dynamic Programming, Sliding Window  
**LeetCode Link:** [LeetCode 121 - Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

---

## Problem Description

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

---

## Examples

### Example 1

```text
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

### Example 2

```text
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

---

## Constraints

- `1 <= prices.length <= 10⁵`
- `0 <= prices[i] <= 10⁴`

---

## My Solution

### Current Implementation: Two-Pointer Sliding Window

A sliding window approach that uses two pointers to track the buy day and sell day as we scan through the prices array.

```javascript
var maxProfit = function (prices = [7, 1, 5, 3, 6, 4]) {
    let left = 0, maxProf = 0, right = left + 1;

    while (right < prices.length) {
        if (prices[left] <= prices[right]) {
            maxProf = Math.max(maxProf, prices[right] - prices[left]);
        } else {
            left = right;
        }

        right++;
    }

    return maxProf;
};
```

#### How It Works

1. **Pointer Initialization:**
   - `left = 0`: Represents the candidate buy day (aiming for the lowest price).
   - `right = left + 1`: Represents the candidate sell day.
   - `maxProf = 0`: Tracks the maximum profit seen so far.

2. **Window Expansion & Evaluation:**
   - While `right < prices.length`:
     - **Profitable Transaction (`prices[left] <= prices[right]`):** We can make a non-negative profit by buying on day `left` and selling on day `right`. Calculate `profit = prices[right] - prices[left]` and update `maxProf = Math.max(maxProf, profit)`.
     - **Found Cheaper Buy Price (`prices[left] > prices[right]`):** Selling at `prices[right]` would yield a loss relative to `prices[left]`. More importantly, `prices[right]` is lower than `prices[left]`, making day `right` a better buy candidate for all subsequent days. We shift our buy pointer: `left = right`.
     - Advance `right++` to examine the next potential selling day.

3. **Return Result:**
   - Once `right` reaches the end of the array, return `maxProf`.

#### Complexity Analysis

- **Time Complexity:** $O(n)$
  - A single pass where `right` iterates from index `1` to `n - 1`. Each element is processed at most once.
- **Space Complexity:** $O(1)$
  - Uses only scalar variables (`left`, `right`, `maxProf`), requiring constant auxiliary space.

---

## Alternative Approaches

### Approach 1: Running Minimum (One-Pass Greedy) ⭐

Instead of explicit pointers, track the minimum purchase price encountered so far in a single variable:

```javascript
var maxProfit = function (prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }

    return maxProfit;
};
```

- **Time Complexity:** $O(n)$
- **Space Complexity:** $O(1)$
- **Note:** Conceptually identical to the sliding window approach, expressed more compactly.

---

### Approach 2: Brute Force (Nested Loops)

Check every possible pair of buy and sell days $(i, j)$ where $i < j$:

```javascript
var maxProfit = function (prices) {
    let maxProf = 0;

    for (let i = 0; i < prices.length - 1; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            maxProf = Math.max(maxProf, prices[j] - prices[i]);
        }
    }

    return maxProf;
};
```

- **Time Complexity:** $O(n^2)$
  - Number of pairs checked is $\frac{n(n - 1)}{2}$. Given $n \le 10^5$, this results in up to $10^{10}$ operations, causing a **Time Limit Exceeded (TLE)** on LeetCode.
- **Space Complexity:** $O(1)$

---

## Summary Comparison

| Approach | Time Complexity | Space Complexity | Status |
| :--- | :--- | :--- | :--- |
| **Two-Pointer Sliding Window (Current)** | $O(n)$ | $O(1)$ | ✅ Optimal & Accepted |
| **Running Minimum (Greedy)** | $O(n)$ | $O(1)$ | ✅ Optimal & Accepted |
| **Brute Force (Nested Loops)** | $O(n^2)$ | $O(1)$ | ❌ Time Limit Exceeded (TLE) |
