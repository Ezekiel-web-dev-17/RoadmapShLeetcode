# 15. 3Sum

**Difficulty:** Medium  
**Topics:** Array, Two Pointers, Sorting

## Problem Description

Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i`, `j`, and `k` are distinct and `nums[i] + nums[j] + nums[k] == 0`.

The solution set must not contain duplicate triplets. The order of triplets and the order inside each triplet do not matter.

## Examples

### Example 1

```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```

### Example 2

```
Input: nums = [0,1,1]
Output: []
```

### Example 3

```
Input: nums = [0,0,0]
Output: [[0,0,0]]
```

## Constraints

- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`

## Hints

**Hint 1:** So, we essentially need to find three numbers x, y, and z such that they add up to the given value. If we fix one of the numbers say x, we are left with the two-sum problem at hand!

**Hint 2:** For the two-sum problem, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y, which is `value - x` where value is the input parameter. Can we change our array somehow so that this search becomes faster?

**Hint 3:** The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?

## My Solution

### Sort + Two Pointers (Current Implementation)

The key insight: fix one element `nums[i]`, then the problem reduces to finding a pair in the remaining array that sums to `-nums[i]` — the classic Two Sum problem, solvable in O(n) on a sorted array.

How it works:

1. Sort `nums` in ascending order
2. Loop `i` from `0` to `n-3`:
   - If `i > 0` and `nums[i] === nums[i-1]`, skip (avoid duplicate triplets for the fixed element)
   - Set `left = i+1`, `right = n-1`
   - While `left < right`:
     - If `nums[i] + nums[left] + nums[right] === 0`: push triplet, skip duplicate `left` values, skip duplicate `right` values, then `left++` and `right--`
     - If sum is too small: `left++`
     - If sum is too large: `right--`
3. Return `result`

**Complexity:**

- **Time:** O(n²) — O(n log n) sort + O(n) outer loop × O(n) inner two-pointer scan
- **Space:** O(1) extra (not counting the output)

Why this works:

- Sorting enables deterministic pointer movement: increasing `left` raises the sum, decreasing `right` lowers it.
- Skipping duplicate values at `i`, `left`, and `right` prevents repeated triplets in the output without needing a Set.

---

## Alternative Approaches to Try

### Approach 1: Hash Set for Two Sum (O(n²) time, O(n) space)

For each fixed `i`, use a hash set to solve the inner Two Sum:

1. Sort `nums`, skip duplicate `i` values
2. For each `j > i`: compute `complement = -nums[i] - nums[j]`
3. If `complement` is in `seen`, add the triplet; else add `nums[j]` to `seen`

**Time:** O(n²) | **Space:** O(n)  
⚠️ _Same time complexity but uses extra space and requires careful duplicate handling_

### Approach 2: Brute Force (O(n³))

Try every triple `i < j < k` and check if the sum equals zero. Serialize sorted triplets into a Set to deduplicate.

**Time:** O(n³) | **Space:** O(n)  
⚠️ _Way too slow for n up to 3000_

### Approach 3: k-Sum Generalisation

3Sum is a special case of k-Sum. Recursively reduce to (k-1)-Sum until reaching Two Sum as the base case (two pointers on sorted array). Useful when generalising to 4Sum, 5Sum, etc.

**Time:** O(n^(k-1)) | **Space:** O(k)

## Similar Questions

- [Two Sum](https://leetcode.com/problems/two-sum/) — Easy
- [3Sum Closest](https://leetcode.com/problems/3sum-closest/) — Medium
- [3Sum Smaller](https://leetcode.com/problems/3sum-smaller/) — Medium
- [4Sum](https://leetcode.com/problems/4sum/) — Medium

## Implementation

See [3Sum.js](./3Sum.js) for the JavaScript implementation.
