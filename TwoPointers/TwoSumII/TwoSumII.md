# Two Sum II - Input Array Is Sorted

**Difficulty:** Medium
**Topic:** Array, Two Pointers, Binary Search

## Problem Description

Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 <= numbers.length`.

Return the indices of the two numbers, `index1` and `index2`, added by one as an integer array `[index1, index2]` of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.

## Examples

### Example 1

```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
```

### Example 2

```
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
```

### Example 3

```
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
```

## Constraints

- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in non-decreasing order.
- `-1000 <= target <= 1000`
- The tests are generated such that there is exactly one solution.

## My Solution

### Two Pointers (Current Implementation)

How it works:

1. Initialize two pointers: `i = 0` (left pointer) and `j = numbers.length - 1` (right pointer).
2. While `i < j`:
   - Calculate the sum `numbers[i] + numbers[j]`.
   - If the sum equals the target, return `[i + 1, j + 1]` (converting to 1-indexed representation).
   - If the sum is greater than the target, decrement the right pointer `j--` to decrease the sum.
   - If the sum is less than the target, increment the left pointer `i++` to increase the sum.
3. If no solution is found (though the problem guarantees exactly one solution), the loop ends.

**Complexity:**

- **Time:** O(N) — each element is visited at most once by the pointers.
- **Space:** O(1) — only constant extra space is used for the pointers.

Why this works:

- Since the array is sorted, moving the right pointer inward decreases the sum, and moving the left pointer inward increases it. This property allows us to narrow down the search space linearly without checking all pairs.

---

## Alternative Approaches to Try

### Approach 1: Binary Search (O(N log N) Time, O(1) Space)

For each element `numbers[i]`, we can perform a binary search in the subarray `numbers[i + 1 ... end]` for the value `target - numbers[i]`.

**Time:** O(N log N) | **Space:** O(1)

### Approach 2: Hash Map (O(N) Time, O(N) Space)

Store the visited numbers and their indices in a hash map. For each element, check if the complement `target - numbers[i]` exists in the map.
*(Note: This does not meet the "constant extra space" constraint of the problem, but is a valid Two Sum solution).*

**Time:** O(N) | **Space:** O(N)

## Implementation

See [TwoSumII.js](./TwoSumII.js) for the JavaScript implementation.

## Similar Questions

- [Two Sum](https://leetcode.com/problems/two-sum/) — Easy
- [Two Sum IV - Input is a BST](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/) — Easy
- [Two Sum Less Than K](https://leetcode.com/problems/two-sum-less-than-k/) — Easy