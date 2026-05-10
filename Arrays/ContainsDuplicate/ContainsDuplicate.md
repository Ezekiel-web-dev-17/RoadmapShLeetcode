# Contains Duplicate

**Difficulty:** Easy  
**Topic:** Array, Hash Set, Sorting

## Problem Description

Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

## Examples

### Example 1

```
Input: nums = [1, 2, 3, 1]
Output: true
Explanation: The element 1 appears more than once.
```

### Example 2

```
Input: nums = [1, 2, 3, 4]
Output: false
Explanation: All elements are distinct.
```

### Example 3

```
Input: nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
Output: true
Explanation: Multiple values appear at least twice.
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## My Solution

### Sort Then Compare Adjacent Values (Current Implementation)

This implementation sorts a copy of the array and then checks neighboring elements for equality.

How it works:

1. Create a sorted copy: `sortedNums = nums.toSorted((a, b) => a - b)`
2. Loop from index `0` to `nums.length - 2`
3. Compare each element with its next neighbor
4. If any adjacent pair is equal, return `true`
5. If loop finishes, return `false`

**Current Complexity:**

- **Time Complexity:** O(n log n) due to sorting
- **Space Complexity:** O(n) for the sorted copy

Why this works:

- In a sorted array, duplicate values become adjacent.
- So a single pass over neighbors is enough to detect duplicates.

---

## Alternative Approaches to Try

### Approach 1: Hash Set (Best - O(n)) ⭐

Track seen values in a set:

1. Create empty set: `seen = new Set()`
2. Iterate through each number in `nums`
3. If number already exists in `seen`, return `true`
4. Otherwise add it to `seen`
5. Return `false` if no duplicates found

**Time Complexity:** O(n) average  
**Space Complexity:** O(n)  
✅ _Most efficient for this problem_

### Approach 2: Brute Force (O(n²))

Check every pair of values:

1. Use nested loops over indices `i` and `j`
2. Compare `nums[i]` and `nums[j]` for all `j > i`
3. Return `true` if any pair matches
4. Return `false` otherwise

**Time Complexity:** O(n²)  
**Space Complexity:** O(1)  
⚠️ _Simple but too slow for large arrays_

## Implementation

See [ContainsDuplicate.js](./ContainsDuplicate.js) for the JavaScript implementation.
