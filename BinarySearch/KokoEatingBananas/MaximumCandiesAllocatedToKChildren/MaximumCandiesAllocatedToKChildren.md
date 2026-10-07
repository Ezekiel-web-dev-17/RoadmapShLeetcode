# 2226. Maximum Candies Allocated to K Children

**Difficulty:** Medium  
**Topics:** Array, Binary Search  

---

## Problem

You are given a **0-indexed** integer array `candies`. Each element in the array denotes a pile of candies of size `candies[i]`. You can divide each pile into any number of sub-piles, but you **cannot** merge two piles together.

You are also given an integer `k`. You should allocate piles of candies to `k` children such that each child gets the **same** number of candies. Each child can be allocated candies from **only one** pile of candies and some piles of candies may go unused.

Return the *maximum number of candies each child can get*.

---

## Examples

### Example 1

```
Input: candies = [5,8,6], k = 3
Output: 5
Explanation: We can divide candies[1] into 2 piles of size 5 and 3, and candies[2] into 2 piles of size 5 and 1. We now have five piles of candies of sizes 5, 5, 3, 5, and 1. We can allocate the 3 piles of size 5 to 3 children. It can be proven that each child cannot receive more than 5 candies.
```

### Example 2

```
Input: candies = [2,5], k = 11
Output: 0
Explanation: There are 11 children but only 7 candies in total, so it is impossible to ensure each child receives at least one candy. Thus, each child gets no candy and the answer is 0.
```

---

## Constraints

- `1 <= candies.length <= 10⁵`
- `1 <= candies[i] <= 10⁷`
- `1 <= k <= 10¹²`

---

## My Solution

### Binary Search on the Answer (Optimal)

This problem is another classic example of **Binary Search on the Answer**, sharing the exact same core principle as **Koko Eating Bananas** and **Minimum Time to Repair Cars**. Instead of searching through the input array, we binary search over the range of possible candy amounts each child can receive.

#### Key Intuition

1. **Identifying the Search Space (Bounds for Candies per Child):**
   - **Minimum (`left = 1`):** The minimum non-zero candies a child could receive is $1$. If even $1$ candy per child is not feasible (e.g., total candies across all piles $< k$), the result defaults to $0$.
   - **Maximum (`right = Math.max(...candies)`):** Since piles cannot be merged, no single child can receive more candies than the largest existing pile.
   - Therefore, the search range is bounded by $[1, \max(\text{candies})]$.

2. **Monotonicity (Why Binary Search Works):**
   - The number of children that can be allocated candies is a **monotonically decreasing** function of the candy allocation size $m$.
   - If we can give each child $m$ candies, it might be possible to give them even more! We record $m$ as a valid candidate (`res = mid`) and search the higher half: `left = mid + 1`.
   - If we cannot give $k$ children $m$ candies, then giving them any amount $> m$ is strictly impossible. We must decrease our guess: `right = mid - 1`.

#### How It Works

1. **Feasibility Helper Function (`distribute`):**
   - **The Question:** "Can we allocate at least $k$ children `trial` candies each?"
   - **Calculation:** For each pile `i`, the number of children who can get `trial` candies from that pile is $\lfloor i / \text{trial} \rfloor$.
   - We iterate through the piles and subtract $\lfloor i / \text{trial} \rfloor$ from our remaining child quota. If the remaining count drops to $\le 0$ (or accumulated count $\ge k$), the allocation is feasible (`true`), otherwise `false`.

2. **Binary Search Loop (`while (left <= right)`):**
   - Compute midpoint: `mid = left + Math.floor((right - left) / 2)`.
   - Test feasibility:
     - **If feasible (`distribute(mid)` is `true`):** Record `res = mid` and search for larger pile sizes on the right (`left = mid + 1`).
     - **If not feasible:** Search smaller pile sizes on the left (`right = mid - 1`).

3. **Termination:**
   - When the search concludes, `res` holds the maximum feasible candies per child (or `0` if no distribution is possible).

#### Complexity Analysis (In Plain English)

- **Time Complexity:** $O(N \cdot \log M)$
  - $N$ = Number of piles (`candies.length`).
  - $M$ = Maximum pile size ($\max(\text{candies}) \le 10^7$).
  - **Why $\log M$?** Binary search halves the candidate range in each iteration. With $M \le 10^7$, $\log_2(10^7) \approx 24$ iterations at most.
  - **Why multiply by $N$?** Each iteration scans all $N$ piles to compute feasibility.
  - **Total Operations:** At most $\sim 24 \times 10^5 \approx 2.4 \times 10^6$ operations—executes in milliseconds.
- **Space Complexity:** $O(1)$
  - Uses only a few primitive pointer variables (`left`, `right`, `mid`, `res`), requiring constant auxiliary space.

---

## Alternative Approaches

### Approach 1: Linear Search / Brute Force ($O(N \cdot M)$)

- **The Idea:** Test every possible candy amount starting from $\max(\text{candies})$ down to $1$ (or $1$ upwards to $\max(\text{candies})$).
- **Why it Fails:** With $\max(\text{candies}) \le 10^7$ and $N \le 10^5$, this would require up to $10^{12}$ operations, which will inevitably trigger a **Time Limit Exceeded (TLE)** on LeetCode. ⚠️
- **Takeaway:** Binary Search on the Answer reduces the search space logarithmically, making what would otherwise be a $10^{12}$ operation problem solvable in under 3 million operations.

---

## Stats

| Accepted | Submissions | Acceptance Rate |
|---|---|---|
| 220,963 | 442.8K | 49.9% |

---

## Similar Questions

| Problem | Difficulty |
|---|---|
| Koko Eating Bananas | Medium |
| Minimum Limit of Balls in a Bag | Medium |
| Minimum Speed to Arrive on Time | Medium |
| Maximum Number of Removable Characters | Medium |
| Minimized Maximum of Products Distributed to Any Store | Medium |
| Minimum Time to Complete Trips | Medium |
| Minimize Maximum of Array | Medium |
| Maximize Happiness of Selected Children | Medium |

---

## Implementation

See [MaximumCandiesAllocatedToKChildren.js](./MaximumCandiesAllocatedToKChildren.js) for the JavaScript implementation.
