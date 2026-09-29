# 875. Koko Eating Bananas

**Difficulty:** Medium
**Topics:** Array, Binary Search

---

## Problem

Koko loves to eat bananas. There are `n` piles of bananas, the `i`th pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during that hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer `k` such that she can eat all the bananas within `h` hours.

---

## Examples

### Example 1

```
Input: piles = [3,6,7,11], h = 8
Output: 4
```

### Example 2

```
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

### Example 3

```
Input: piles = [30,11,23,4,20], h = 6
Output: 23
```

---

## Constraints

- `1 <= piles.length <= 10⁴`
- `piles.length <= h <= 10⁹`
- `1 <= piles[i] <= 10⁹`

---

## My Solution

### Binary Search on the Answer (Optimal — Greg Hogg's Approach)

This problem is a classic example of **Binary Search on the Answer**. Rather than performing binary search on the indices of a sorted array, we binary search over the range of all possible eating speeds $k$.

#### Key Intuition

1. **Identifying the Search Space (Bounds for $k$):**
   - **Minimum Speed (`left = 1`):** Koko must eat at least $1$ banana per hour ($k \ge 1$).
   - **Maximum Speed (`right = Math.max(...piles)`):** The largest single pile. Since Koko can only eat from one pile per hour and cannot move on to another pile during the same hour, eating faster than $\max(\text{piles})$ bananas/hour gives zero additional time savings (each pile would still take exactly $1$ hour, totaling $\text{piles.length}$ hours, and the problem guarantees $h \ge \text{piles.length}$).
   - Therefore, the optimal speed $k$ is guaranteed to lie in the range $[1, \max(\text{piles})]$.

2. **Monotonicity (Why Binary Search Works):**
   - Total hours spent is a monotonically decreasing function of speed $k$.
   - As $k$ increases, the total hours required to eat all bananas decreases or stays the same.
   - If Koko can finish all bananas at speed $k$ within $h$ hours, any speed greater than $k$ will also succeed. We can try to find a smaller speed by searching the lower half: `right = mid`.
   - If Koko cannot finish at speed $k$ within $h$ hours, she is eating too slowly. Any speed less than or equal to $k$ will also fail. We must increase the speed: `left = mid + 1`.

#### How It Works

1. **Helper Function (`timeTaken`):**
   - **The Question:** "If Koko eats at speed `k` bananas per hour, does she finish in time?"
   - **How to calculate:** For any pile, the hours needed is `Math.ceil(pile / k)`.
     - *Example:* If a pile has `7` bananas and speed is `3`, she eats 3 in hour 1, 3 in hour 2, and the last 1 in hour 3 $\rightarrow$ `Math.ceil(7 / 3) = 3` hours.
   - Add up the hours for every pile. If the total is $\le h$, return `true` (she finishes in time!), otherwise `false`.

2. **Binary Search Loop (`while (left < right)`):**
   - Pick a middle speed to test: `mid = left + Math.floor((right - left) / 2)`.
   - Test it: **"Can Koko finish at speed `mid`?"**
     - **YES (`timeTaken(mid)` is `true`):**
       - This speed works! But Koko wants to eat as *slowly* as possible.
       - Can she eat even slower? Let's check smaller speeds on the left.
       - Set `right = mid` (keep `mid` because it could be our final answer).
     - **NO (`timeTaken(mid)` is `false`):**
       - Speed `mid` is too slow—she ran out of time!
       - Any speed $\le mid$ will definitely be too slow as well.
       - She *must* eat faster: set `left = mid + 1`.

3. **Finding the Answer:**
   - Once `left === right`, the search has zoomed in on the exact minimum speed that works. Return `right` (or `left`).

#### Complexity Analysis (In Plain English)

- **Time Complexity:** $O(N \cdot \log M)$
  - $N$ = Number of piles (`piles.length`).
  - $M$ = Number of bananas in the largest pile (`Math.max(...piles)`).
  - **Why $\log M$?** Binary search cuts our speed guesses in half each step. Even if the largest pile has $1,000,000,000$ bananas, halving the range takes only around $\approx 30$ guesses!
  - **Why multiply by $N$?** For each guess, we check all $N$ piles to count total hours.
  - **Total Operations:** At most $\sim 30 \times 10,000 \approx 300,000$ operations—finishes in just a few milliseconds.
- **Space Complexity:** $O(1)$
  - Constant memory. We only track a few number variables (`left`, `right`, `mid`, `hrsSpent`) without creating new arrays.

---

## Alternative Approaches

### Approach 1: Linear Search / Brute Force ($O(N \cdot M)$)

- **The Idea:** Start guessing at speed 1. If that doesn't finish in time, try speed 2, then 3, then 4... all the way up to the largest pile.
- **Why it Fails:** If the biggest pile is $1,000,000,000$, testing numbers one-by-one requires billions of iterations. LeetCode will reject this with **Time Limit Exceeded (TLE)**. ⚠️
- **Takeaway:** That's why Binary Search is essential here—it lets us test only $\sim 30$ speeds instead of $1,000,000,000$!

---

## Stats

| Accepted | Submissions | Acceptance Rate |
|---|---|---|
| 1,825,464 | 3.6M | 50.5% |

---

## Similar Questions

| Problem | Difficulty |
|---|---|
| Minimize Max Distance to Gas Station | Hard |
| Maximum Candies Allocated to K Children | Medium |
| Minimized Maximum of Products Distributed to Any Store | Medium |
| Frog Jump II | Medium |
| Minimum Time to Repair Cars | Medium |

---

## Implementation

See [KokoEatingBananas.js](./KokoEatingBananas.js) for the JavaScript implementation.