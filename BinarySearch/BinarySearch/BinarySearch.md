# 704. Binary Search

**Difficulty:** Easy  
**Topic:** Array, Binary Search  
**LeetCode Link:** [LeetCode 704 - Binary Search](https://leetcode.com/problems/binary-search/)

---

## Problem Description

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with $O(\log n)$ runtime complexity.

---

## Examples

### Example 1

```text
Input: nums = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
```

### Example 2

```text
Input: nums = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
```

---

## Constraints

- `1 <= nums.length <= 10^4`
- `-10^4 < nums[i], target < 10^4`
- All the integers in `nums` are **unique**.
- `nums` is sorted in **ascending order**.

---

## Solution & Approach

### Standard Iterative Binary Search

Binary Search is a divide-and-conquer algorithm that efficiently locates a target value in a sorted array by repeatedly halving the search space.

#### How It Works:
1. Initialize two pointers:
   - `left = 0` (start of the array)
   - `right = nums.length - 1` (end of the array)
2. While `left <= right`:
   - Calculate the midpoint to divide the search space:
     `mid = Math.floor(left + (right - left) / 2)`  
     *(Using `left + (right - left) / 2` avoids potential integer overflow compared to `(left + right) / 2` in languages with fixed-width integers).*
   - **Check condition:**
     - If `nums[mid] === target`: target is found, return `mid`.
     - If `nums[mid] < target`: target must be in the right half, so discard the left half by setting `left = mid + 1`.
     - If `nums[mid] > target`: target must be in the left half, so discard the right half by setting `right = mid - 1`.
3. If the search interval becomes empty (`left > right`), the target is not present in the array, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$ — The search space is halved at each iteration, giving logarithmic time complexity.
- **Space Complexity:** $O(1)$ — Iterative implementation uses constant extra space for pointers (`left`, `right`, `mid`).

---

## Implementation

See [BinarySearch.js](./BinarySearch.js) for the JavaScript implementation.

---

## Similar Questions

- [Search in a Sorted Array of Unknown Size](https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/) — Medium
- [Search Insert Position](https://leetcode.com/problems/search-insert-position/) — Easy
- [First Bad Version](https://leetcode.com/problems/first-bad-version/) — Easy
- [Maximum Count of Positive Integer and Negative Integer](https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer/) — Easy