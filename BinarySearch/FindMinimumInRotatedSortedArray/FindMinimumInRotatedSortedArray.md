# 153. Find Minimum in Rotated Sorted Array

**Difficulty:** Medium
**Topics:** Array, Binary Search

---

## Problem

Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:

- `[4,5,6,7,0,1,2]` if it was rotated 4 times.
- `[0,1,2,4,5,6,7]` if it was rotated 7 times.

Notice that rotating an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of **unique** elements, return the minimum element of this array.

You must write an algorithm that runs in `O(log n)` time.

---

## Examples

### Example 1

```
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```

### Example 2

```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
```

### Example 3

```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
```

---

## Constraints

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- All the integers of `nums` are **unique**.
- `nums` is sorted and rotated between `1` and `n` times.

---

## My Solution

### Binary Search — Compare Mid to Right Boundary (Current Implementation)

The key insight is that in a rotated sorted array, the minimum element is at the "inflection point" — the only place where a larger value is immediately followed by a smaller value. Binary search can find this point by comparing `nums[mid]` to `nums[right]`.

How it works:

1. Initialize `left = 0`, `right = nums.length - 1`.
2. While `left <= right`:
   - Calculate `mid = left + Math.floor((right - left) / 2)`.
   - **Base case:** If `left === right`, the search space has been narrowed to one element — return `nums[mid]`.
   - **If `nums[mid] > nums[right]`:** The inflection point (minimum) must be to the right of `mid`, because the right portion is "broken" (not fully sorted). Set `left = mid + 1`.
   - **Otherwise (`nums[mid] <= nums[right]`):** The right half is sorted, so the minimum is at `mid` or to its left. Set `right = mid` (not `mid - 1`, because `mid` itself could be the minimum).
3. Return `-1` as a fallback (never reached with valid input).

**Complexity:**

- **Time:** O(log n) — the search space halves each iteration.
- **Space:** O(1) — only pointer variables.

Why this works:

- Comparing `nums[mid]` to `nums[right]` tells us which half contains the rotation point. If `nums[mid] > nums[right]`, the array "wraps around" somewhere between `mid` and `right`, so the minimum is in that range. Otherwise, the subarray `[mid..right]` is properly sorted and the minimum is at or before `mid`.

---

## Alternative Approaches

### Approach 1: Linear Scan with `Math.min` (O(n))

The `finder` function in the JS file uses `Math.min(...nums)` — a one-liner but runs in O(n) time. It doesn't satisfy the O(log n) requirement.

**Time:** O(n) | **Space:** O(1)
⚠️ _Does not meet the problem's time constraint_

---

## Stats

| Accepted | Submissions | Acceptance Rate |
|---|---|---|
| 3,379,686 | 6.1M | 55.3% |

---

## Similar Questions

| Problem | Difficulty |
|---|---|
| Search in Rotated Sorted Array | Medium |
| Find Minimum in Rotated Sorted Array II | Hard |

---

## Implementation

See [FindMinimumInRotatedSortedArray.js](./FindMinimumInRotatedSortedArray.js) for the JavaScript implementation.
