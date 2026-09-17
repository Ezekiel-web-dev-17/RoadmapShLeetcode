# 739. Daily Temperatures

**Difficulty:** Medium
**Topics:** Array, Stack, Monotonic Stack

---

## Problem

Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

---

## Examples

### Example 1

```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

### Example 2

```
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
```

### Example 3

```
Input: temperatures = [30,60,90]
Output: [1,1,0]
```

---

## Constraints

- `1 <= temperatures.length <= 10⁵`
- `30 <= temperatures[i] <= 100`

---

## Hints

**Hint 1:** If the temperature is say, 70 today, then in the future a warmer temperature must be either 71, 72, 73, ..., 99, or 100. We could remember when all of them occur next.

---

## Stats

| Accepted | Submissions | Acceptance Rate |
|---|---|---|
| 1,793,241 | 2.6M | 68.8% |

---

## My Solution

### Monotonic Decreasing Stack (Current Implementation)

This solution uses a **monotonic stack** that stores indices of temperatures in decreasing order. When a warmer temperature is found, all cooler days waiting on the stack get their answer filled in.

How it works:

1. Initialize `ordered` (the result array) with all zeros, same length as `temperatures`.
2. Initialize an empty `stack` that will hold **indices** (not values).
3. Loop through each day `i` from `0` to `temperatures.length - 1`:
   - **While** the stack is not empty **and** today's temperature `temperatures[i]` is greater than the temperature at the top of the stack (`temperatures[stack[stack.length - 1]]`):
     - Pop the index `prev_index` from the stack.
     - The answer for `prev_index` is `i - prev_index` (how many days it had to wait).
     - Set `ordered[prev_index] = i - prev_index`.
   - Push the current index `i` onto the stack.
4. Any indices remaining on the stack never found a warmer day — their values stay `0` (already initialized).
5. Return `ordered`.

**Why this works:**

- The stack maintains a monotonically decreasing sequence of temperatures (by index). When a new temperature is higher, it "resolves" all the cooler days stacked up before it.
- Each index is pushed once and popped at most once, so the total work across all iterations is linear.

**Complexity:**

- **Time:** O(n) — each element is pushed and popped from the stack at most once.
- **Space:** O(n) — for the stack and the result array.

✅ _This is the optimal approach for this problem._

---

## Alternative Approaches

### Approach 1: Brute Force (O(n²))

For each day `i`, scan forward through all remaining days to find the first warmer temperature.

**Time:** O(n²) | **Space:** O(n) for the result array
⚠️ _Too slow for large inputs_

### Approach 2: Backward Iteration with Temperature Buckets (O(n))

Since temperatures are bounded (30–100), maintain an array `next[temp]` tracking when each temperature next occurs. Iterate from right to left, and for each day look up the minimum of `next[temp]` for all `temp > temperatures[i]`.

**Time:** O(n × 71) = O(n) | **Space:** O(1) extra (fixed 71-element array)

---

## Similar Questions

| Problem | Difficulty |
|---|---|
| Next Greater Element I | Easy |
| Online Stock Span | Medium |

---

## Implementation

See [DailyTemperatures.js](./DailyTemperatures.js) for the JavaScript implementation.
