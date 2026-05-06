# Two Sum

**Difficulty:** Easy  
**Topic:** Array, Hash Map

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

## My Solution

### Hash Map with Complement Storage (Current Implementation)

This implementation stores complements in an object and then looks up the matching index in the original array.

How it works:

1. Create empty hash map `values = {}`
2. Iterate through array with index `i`
3. For each number, compute `complement = target - nums[i]`
4. Check if a matching complement was seen before with `Object.hasOwn(...)`
5. If it exists, use `nums.indexOf(complement)` to get the first index and return `[complement_index, i]`
6. If no, store the complement: `values[i] = target - nums[i]`

**Current Complexity:**

- **Time Complexity:** O(n²) due to `indexOf()` calls ⚠️
- **Space Complexity:** O(n)

Why this works:

- For each `nums[i]`, the needed partner is `target - nums[i]`.
- Once that partner has effectively been tracked, the pair can be returned.

Implementation notes for other developers:

- `indexOf()` returns the first match, which may not always represent the intended prior index when duplicates exist.
- A direct value-to-index map avoids this ambiguity and improves performance.

---

## Alternative Approaches to Try

### Approach 1: Optimized Hash Map (Best - O(n)) ⭐

Store actual values with indices instead of complements:

1. Create empty hash map `seen = {}`
2. Iterate through array once
3. For each number `nums[i]`, calculate: `complement = target - nums[i]`
4. Check if `complement` exists in `seen` map (O(1) lookup)
5. If yes, return `[seen[complement], i]`
6. If no, store current value: `seen[nums[i]] = i`

**Time Complexity:** O(n) - single pass with O(1) lookups  
**Space Complexity:** O(n)  
✅ _Most efficient_

### Approach 2: Two Pointers with Sorting (O(n log n))

Sort array and use two pointers:

1. Create array of `[value, originalIndex]` pairs
2. Sort by value
3. Initialize left pointer at start, right at end
4. If `nums[left] + nums[right] == target`, return indices
5. If sum too small, increment left pointer
6. If sum too large, decrement right pointer

**Time Complexity:** O(n log n)  
**Space Complexity:** O(n)

### Approach 3: Brute Force (O(n²))

Check every pair:

1. Use nested loops: `for (let i = 0; i < n; i++)` and `for (let j = i + 1; j < n; j++)`
2. Check if `nums[i] + nums[j] == target`
3. Return `[i, j]` when found

**Time Complexity:** O(n²)  
**Space Complexity:** O(1)  
⚠️ _Simple but inefficient for large arrays_

## Implementation

See [TwoSum.js](./TwoSum.js) for the JavaScript implementation.
