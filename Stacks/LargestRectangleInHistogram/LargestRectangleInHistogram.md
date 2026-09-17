# 84. Largest Rectangle in Histogram

**Difficulty:** Hard
**Topics:** Array, Stack, Monotonic Stack

---

## Problem

Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.

---

## Examples

### Example 1

```
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The largest rectangle has area = 10 units (bars at indices 2 and 3, height 5, width 2).
```

### Example 2

```
Input: heights = [2,4]
Output: 4
```

---

## Constraints

- `1 <= heights.length <= 10⁵`
- `0 <= heights[i] <= 10⁴`

---

## Stats

| Accepted | Submissions | Acceptance Rate |
|---|---|---|
| 1,659,170 | 3.3M | 50.4% |

---

## My Solution

### Monotonic Stack with Backward Extension (Current Implementation)

This solution uses a monotonic increasing stack of `[height, startIndex]` pairs. The key insight: when a bar is shorter than the previous bar, the previous bar's rectangle can't extend any further to the right — so we pop it and calculate its area. But the shorter bar *can* extend backward to where the taller bar started.

How it works:

1. Initialize an empty `stack` and `maxArea = 0`.
2. Loop through each bar `h` from `0` to `heights.length - 1`:
   - Set `startIndex = h` (tracks how far left the current bar can extend).
   - **While** the stack is not empty **and** the top of the stack has a height greater than `heights[h]`:
     - Pop `[height, strIdx]` from the stack via the `popper` helper.
     - Calculate the area: `height × (h - strIdx)`.
     - Update `maxArea` if this area is larger.
     - Set `startIndex = strIdx` — the current shorter bar can extend backward to where the popped taller bar started.
   - Push `[heights[h], startIndex]` onto the stack.
3. After the loop, any bars remaining on the stack extend all the way to the end of the histogram. Pop each and calculate: `height × (heights.length - strIdx)`.
4. Return `maxArea`.

**Why the backward extension is the key trick:**

When we pop a taller bar because the current bar is shorter, we know the current bar's height is at least as tall as everything from `strIdx` to `h`. So we push `[heights[h], strIdx]` instead of `[heights[h], h]` — effectively extending the current bar's rectangle backward over the popped bars' positions.

**Complexity:**

- **Time:** O(n) — each bar is pushed and popped at most once.
- **Space:** O(n) — for the stack.

✅ _This is the optimal approach for this problem._

---

## Alternative Approaches

### Approach 1: Brute Force (O(n²))

For each bar, expand left and right to find the widest rectangle that uses this bar's height as the minimum.

**Time:** O(n²) | **Space:** O(1)
⚠️ _Too slow for n up to 10⁵_

### Approach 2: Divide and Conquer (O(n log n))

Find the minimum height bar, compute the area of the rectangle spanning the full width at that height, then recursively solve the left and right subarrays.

**Time:** O(n log n) average, O(n²) worst | **Space:** O(log n) stack frames

---

## Similar Questions

| Problem | Difficulty |
|---|---|
| Maximal Rectangle | Hard |
| Maximum Score of a Good Subarray | Hard |

---

## Implementation

See [LargestRectangleInHistogram.js](./LargestRectangleInHistogram.js) for the JavaScript implementation.
