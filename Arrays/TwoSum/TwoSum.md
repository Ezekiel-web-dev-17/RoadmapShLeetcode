# Two Sum

**Difficulty:** Easy  
**Topic:** Array, Hash Map  
**Status:** ✅ Solved

## Problem Description

Given an array of integers `nums` and an integer `target`, return the **indices** of the two numbers such that they add up to `target`.

You may assume that each input has exactly one solution, and you **cannot use the same element twice**.

The answer can be returned in any order.

## Examples

### Example 1
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1].
```

### Example 2
```
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]
Explanation: nums[1] + nums[2] = 2 + 4 = 6, so we return [1, 2].
```

### Example 3
```
Input: nums = [3, 3], target = 6
Output: [0, 1]
Explanation: nums[0] + nums[1] = 3 + 3 = 6, so we return [0, 1].
```

## Constraints

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Only one valid answer exists

**Follow-up:** Can you come up with an algorithm that is less than O(n²) time complexity?

## Solution Approach

### Brute Force (O(n²))
Check every pair of elements to find the sum.

### Optimal Solution: Hash Map (O(n))
Use a hash map to store values we've seen and check if the complement exists:

1. Iterate through the array
2. For each number, calculate the complement: `complement = target - current_number`
3. Check if the complement exists in the hash map
4. If yes, return the indices
5. If no, store the current number and its index in the hash map

**Time Complexity:** O(n)  
**Space Complexity:** O(n)

## Implementation

See [TwoSum.js](./TwoSum.js) for the JavaScript implementation.
