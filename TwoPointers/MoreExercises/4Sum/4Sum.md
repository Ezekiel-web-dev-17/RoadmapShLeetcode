# 18. 4Sum

**Difficulty:** Medium
**Topics:** Array, Two Pointers, Sorting

## Problem Description

Given an array `nums` of `n` integers, return an array of all the unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that:

- `0 <= a, b, c, d < n`
- `a`, `b`, `c`, and `d` are distinct.
- `nums[a] + nums[b] + nums[c] + nums[d] == target`

You may return the answer in any order.

## Examples

### Example 1

```
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

### Example 2

```
Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
```

## Constraints

- `1 <= nums.length <= 200`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`

## My Solution

### Nested Loops + Two Pointers + Post-Deduplication (Current Implementation)

How it works:

1. Sort the `nums` array in non-decreasing order: `nums.sort((a, b) => a - b)`.
2. Use nested loops for index `i` (from `0` to `n - 1`) and `j` (from `0` to `n - 1`) to pick the first two numbers.
3. For each pair of `(i, j)`, initialize two pointers: `left = 0` and `right = n - 1`.
4. While `left < right`:
   - Check if there are overlapping indices (i.e. if `i`, `j`, `left`, or `right` are equal to each other). If they are, skip or terminate (the current loop condition terminates if any overlap occurs).
   - If the sum of the four numbers is less than `target`, increment `left`.
   - If the sum is greater than `target`, decrement `right`.
   - If the sum is equal to `target`, sort the selected elements and push them to the result list `res`.
5. Since duplicates can still be added to the result due to loop indices scanning all elements, deduplicate the results in post-processing: convert each inner array to a JSON string, add them to a `Set` to remove duplicates, and parse them back to an array of arrays.

**Complexity:**

- **Time:** $O(N^3)$ in the worst case (with early termination when pointer overlaps occur).
- **Space:** $O(N^3)$ in the worst case to store all intermediate permutations in the results array before deduplication.

---

## Alternative Approaches to Try

### Approach 1: Optimized Four Pointers with Pruning and Deduplication (O(N^3) Time, O(1) Space)

Instead of searching the full range and deduplicating at the end, we can design the loops and two-pointer traversal to naturally avoid duplicate permutations and early-exit when the sum cannot possibly reach the target:

1. Sort `nums` in non-decreasing order.
2. Loop `i` from `0` to `nums.length - 4`:
   - Avoid duplicate outer values: `if (i > 0 && nums[i] === nums[i-1]) continue;`
   - **Pruning:** If the smallest possible sum starting with `nums[i]` is greater than `target` (`nums[i] + nums[i+1] + nums[i+2] + nums[i+3] > target`), break early.
   - **Pruning:** If the largest possible sum starting with `nums[i]` is less than `target` (`nums[i] + nums[n-3] + nums[n-2] + nums[n-1] < target`), skip to the next iteration.
3. Loop `j` from `i + 1` to `nums.length - 3`:
   - Avoid duplicate inner values: `if (j > i + 1 && nums[j] === nums[j-1]) continue;`
   - **Pruning:** If the smallest possible sum for this combination is greater than `target`, break early.
   - **Pruning:** If the largest possible sum for this combination is less than `target`, skip to the next iteration.
4. Set two pointers `left = j + 1` and `right = nums.length - 1`. While `left < right`:
   - Calculate sum of elements at `i`, `j`, `left`, `right`.
   - If `sum === target`, push to results, then move pointers past duplicate elements.
   - If `sum < target`, increment `left`.
   - If `sum > target`, decrement `right`.

**Time:** $O(N^3)$ | **Space:** $O(1)$ (excluding space for the output)

## Implementation

See [4Sum.js](./4Sum.js) for the JavaScript implementation.

## Similar Questions

- [Two Sum](https://leetcode.com/problems/two-sum/) — Easy
- [3Sum](https://leetcode.com/problems/3sum/) — Medium
- [4Sum II](https://leetcode.com/problems/4sum-ii/) — Medium
- [Count Special Quadruplets](https://leetcode.com/problems/count-special-quadruplets/) — Easy
