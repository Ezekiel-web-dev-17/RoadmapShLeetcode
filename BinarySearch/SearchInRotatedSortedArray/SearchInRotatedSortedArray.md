# 33. Search in Rotated Sorted Array

**Difficulty:** Medium  
**Topic:** Array, Binary Search  
**LeetCode Link:** [LeetCode 33 - Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

---

## Problem Description

There is an integer array `nums` sorted in ascending order (with distinct values).

Prior to being passed to your function, `nums` is possibly left rotated at an unknown index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). For example, `[0, 1, 2, 4, 5, 6, 7]` might be left rotated by `3` indices and become `[4, 5, 6, 7, 0, 1, 2]`.

Given the array `nums` after the possible rotation and an integer `target`, return the *index of `target` if it is in `nums`, or `-1` if it is not in `nums`*.

You must write an algorithm with $O(\log n)$ runtime complexity.

---

## Examples

### Example 1

```text
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4
```

### Example 2

```text
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1
```

### Example 3

```text
Input: nums = [1], target = 0
Output: -1
```

---

## Constraints

- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- All values of `nums` are **unique**.
- `nums` is an ascending array that is possibly rotated.
- `-10^4 <= target <= 10^4`

---

## My Solution

### Pivot Finding via `Math.min` + Split Binary Search (Current Implementation)

This implementation locates the inflection (pivot) point by finding the smallest element in the array, then conducts a binary search on the appropriate sorted subarray.

#### How It Works:

1. **Find Pivot Index:**
   - Locate the minimum value using `MIN = Math.min(...nums)`.
   - Find its index `min_index = nums.indexOf(MIN)`.
   - `min_index` divides the array into two sorted segments:
     - Left segment: `[0, min_index - 1]`
     - Right segment: `[min_index, nums.length - 1]`
2. **Binary Search Function:**
   - Define a helper `binarySearch(left, right)` that implements standard iterative binary search:
     - Calculate `mid = left + Math.floor((right - left) / 2)`.
     - If `nums[mid] === target`, return `mid`.
     - If `nums[mid] > target`, shrink search space rightward: `right = mid - 1`.
     - Otherwise, shrink search space leftward: `left = mid + 1`.
     - If search interval is exhausted, return `-1`.
3. **Search Subarrays:**
   - First search the left segment: `binarySearch(0, min_index - 1)`.
   - If not found in the left segment (`result === -1`), search the right segment: `binarySearch(min_index, nums.length - 1)`.
   - Return the resulting index.

#### Current Complexity:

- **Time Complexity:** $O(n)$ — While binary search runs in $O(\log n)$, finding the minimum element via `Math.min(...nums)` and `nums.indexOf(...)` takes linear time $O(n)$. ⚠️
- **Space Complexity:** $O(1)$ auxiliary space (note that spreading `...nums` may use $O(n)$ stack frames in JavaScript engines for very large inputs).

#### Implementation Notes for Other Developers:

- While intuitive and clean to write, LeetCode's problem constraint explicitly asks for an $O(\log n)$ algorithm.
- Finding the pivot via a modified binary search (or searching directly in one pass) allows achieving true $O(\log n)$ runtime.

---

## Alternative Approaches to Try

### Approach 1: Single-Pass Modified Binary Search (Optimal - $O(\log n)$) ⭐

In a rotated sorted array, dividing the array at any `mid` index guarantees that **at least one half is always sorted**. We can check which half is sorted, verify if `target` lies within that half's boundary, and narrow our search space accordingly:

1. Initialize `left = 0` and `right = nums.length - 1`.
2. While `left <= right`:
   - Calculate `mid = left + Math.floor((right - left) / 2)`.
   - If `nums[mid] === target`, return `mid`.
   - **Check if left half is sorted (`nums[left] <= nums[mid]`):**
     - If `nums[left] <= target && target < nums[mid]`, target must be in the left half: `right = mid - 1`.
     - Otherwise, search in the right half: `left = mid + 1`.
   - **Otherwise, right half must be sorted (`nums[mid] < nums[right]`):**
     - If `nums[mid] < target && target <= nums[right]`, target must be in the right half: `left = mid + 1`.
     - Otherwise, search in the left half: `right = mid - 1`.
3. If search completes without a match, return `-1`.

- **Time Complexity:** $O(\log n)$ — Strictly halves the search space at each step.
- **Space Complexity:** $O(1)$ — Only requires pointer variables.
- ✅ *Optimal approach conforming to the $O(\log n)$ problem constraint.*

### Approach 2: Binary Search Pivot + Binary Search Target ($O(\log n)$)

Instead of using `Math.min` in $O(n)$, find the pivot (minimum element's index) using binary search in $O(\log n)$ (as in LeetCode 153), then perform standard binary search on the segment containing `target`:

1. Binary search for `min_index`:
   - Compare `nums[mid]` with `nums[right]`.
   - If `nums[mid] > nums[right]`, pivot is in the right half: `left = mid + 1`.
   - Otherwise, pivot is at or to the left of `mid`: `right = mid`.
2. Once `min_index` is found:
   - If `target >= nums[min_index] && target <= nums[nums.length - 1]`, search in `[min_index, nums.length - 1]`.
   - Otherwise, search in `[0, min_index - 1]`.
3. Perform standard binary search on the chosen range.

- **Time Complexity:** $O(\log n)$
- **Space Complexity:** $O(1)$

---

## Implementation

See [SearchInRotatedSortedArray.js](./SearchInRotatedSortedArray.js) for the JavaScript implementation.

---

## Similar Questions

- [Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/) — Medium
- [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) — Medium
- [Find Peak Element](https://leetcode.com/problems/find-peak-element/) — Medium
- [Pour Water Between Buckets to Make Water Levels Equal](https://leetcode.com/problems/pour-water-between-buckets-to-make-water-levels-equal/) — Medium
