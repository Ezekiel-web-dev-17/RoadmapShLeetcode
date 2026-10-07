# 2594. Minimum Time to Repair Cars

**Difficulty:** Medium  
**Topics:** Array, Binary Search  

---

## Problem

You are given an integer array `ranks` representing the ranks of some mechanics. `ranks[i]` is the rank of the $i$th mechanic. A mechanic with a rank $r$ can repair $n$ cars in $r \cdot n^2$ minutes.

You are also given an integer `cars` representing the total number of cars waiting in the garage to be repaired.

Return the *minimum time taken to repair all the cars*.

**Note:** All mechanics can repair cars simultaneously.

---

## Examples

### Example 1

```
Input: ranks = [4,2,3,1], cars = 10
Output: 16
Explanation:
- The first mechanic will repair 2 cars. The time required is 4 * 2 * 2 = 16 minutes.
- The second mechanic will repair 2 cars. The time required is 2 * 2 * 2 = 8 minutes.
- The third mechanic will repair 2 cars. The time required is 3 * 2 * 2 = 12 minutes.
- The fourth mechanic will repair 4 cars. The time required is 1 * 4 * 4 = 16 minutes.
It can be proved that the cars cannot be repaired in less than 16 minutes.
```

### Example 2

```
Input: ranks = [5,1,8], cars = 6
Output: 16
Explanation:
- The first mechanic will repair 1 car. The time required is 5 * 1 * 1 = 5 minutes.
- The second mechanic will repair 4 cars. The time required is 1 * 4 * 4 = 16 minutes.
- The third mechanic will repair 1 car. The time required is 8 * 1 * 1 = 8 minutes.
It can be proved that the cars cannot be repaired in less than 16 minutes.
```

---

## Constraints

- `1 <= ranks.length <= 10⁵`
- `1 <= ranks[i] <= 100`
- `1 <= cars <= 10⁶`

---

## My Solution

### Binary Search on the Answer (Optimal)

This problem is solved using **Binary Search on the Answer**. Rather than simulating mechanic assignments greedily, we search over the domain of possible total completion times.

#### Key Intuition

1. **Identifying the Search Space (Bounds for Time):**
   - **Minimum Time (`left = 1`):** Repairing at least 1 car takes at least 1 minute.
   - **Maximum Time (`right = Math.min(...ranks) * cars * cars`):** In the worst case, the fastest mechanic (minimum rank) repairs all `cars` alone, taking $\min(\text{ranks}) \cdot \text{cars}^2$ minutes. Any other mechanic contributing only reduces the time.
   - Therefore, the search range is bounded by $[1, \min(\text{ranks}) \cdot \text{cars}^2]$.

2. **Monotonicity (Why Binary Search Works):**
   - As time $T$ increases, the number of cars that any mechanic can repair monotonically increases.
   - For a given mechanic with rank $r$ and available time $T$:
     $$r \cdot n^2 \le T \implies n \le \sqrt{\frac{T}{r}} \implies n = \left\lfloor\sqrt{\frac{T}{r}}\right\rfloor$$
   - If the total cars repaired by all mechanics $\sum \lfloor\sqrt{T / r}\rfloor \ge \text{cars}$, then time $T$ is sufficient. We try to find a smaller feasible time: `right = mid`.
   - If the total cars repaired $< \text{cars}$, then $T$ is insufficient: `left = mid + 1`.

#### How It Works

1. **Feasibility Helper Function (`canRepair`):**
   - Computes the total number of cars all mechanics can repair within `time` minutes:
     $$\text{totalCars} = \sum_{r \in \text{ranks}} \left\lfloor\sqrt{\frac{\text{time}}{r}}\right\rfloor$$
   - Returns `true` if `totalCars >= cars`, otherwise `false`.

2. **Binary Search Loop (`while (left < right)`):**
   - Evaluates the midpoint: `mid = left + Math.floor((right - left) / 2)`.
   - If `canRepair(mid)` is `true`: search left half (`right = mid`).
   - If `canRepair(mid)` is `false`: search right half (`left = mid + 1`).

3. **Termination:**
   - Loop converges when `left === right`, giving the exact minimum time.

#### Complexity Analysis (In Plain English)

- **Time Complexity:** $O(N \cdot \log(\min(\text{ranks}) \cdot \text{cars}^2))$
  - $N$ = Number of mechanics (`ranks.length`).
  - Search range upper bound is at most $100 \times (10^6)^2 = 10^{14}$.
  - $\log_2(10^{14}) \approx 47$ binary search iterations.
  - In each iteration, we loop through all $N$ mechanics to evaluate square roots: $47 \times 10^5 \approx 4.7 \times 10^6$ operations, executing within $\sim 100$ms.
- **Space Complexity:** $O(1)$
  - Uses only constant auxiliary memory for binary search pointers and running sum.

---

## Alternative Approaches

### Approach 1: Priority Queue / Min-Heap Simulation ($O(k \log N)$)

- **The Idea:** Use a min-heap to assign each car greedily to the mechanic who would finish it earliest.
- **Why it Fails:** With `cars` up to $10^6$, pushing and popping from the heap $10^6$ times with $N = 10^5$ exceeds memory and time limits compared to the direct mathematical check in binary search.

---

## Stats

| Accepted | Submissions | Acceptance Rate |
|---|---|---|
| 160,217 | 270.5K | 59.2% |

---

## Similar Questions

| Problem | Difficulty |
|---|---|
| Sort Transformed Array | Medium |
| Koko Eating Bananas | Medium |

---

## Implementation

See [MinimumTimeToRepairCars.js](./MinimumTimeToRepairCars.js) for the JavaScript implementation.
