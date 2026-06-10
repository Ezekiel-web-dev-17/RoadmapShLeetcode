# 11. Container With Most Water

**Difficulty:** Medium  
**Topics:** Array, Two Pointers, Greedy

## Problem Description

You are given an integer array `height` of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.

Notice that you may not slant the container.

## Examples

### Example 1

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: Lines at index 1 (height 8) and index 8 (height 7) form the best container.
             Area = min(8,7) × (8-1) = 7 × 7 = 49
```

### Example 2

```
Input: height = [1,1]
Output: 1
```

## Constraints

- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

## Hints

**Hint 1:** If you simulate the problem, it will be O(n²) which is not efficient.

**Hint 2:** Try to use two-pointers. Set one pointer to the left and one to the right of the array. Always move the pointer that points to the lower line.

**Hint 3:** How can you calculate the amount of water at each step?

## My Solution

### Two Pointers — Greedy (Current Implementation)

How it works:

1. Set `left = 0`, `right = height.length - 1`, `result = 0`
2. While `left < right`:
   - Calculate `area = min(height[left], height[right]) × (right - left)`
   - Update `result = max(result, area)`
   - Move the **shorter** wall's pointer inward — moving the taller wall can never improve the area since the water level is already capped by the shorter wall
3. Return `result`

**Complexity:**

- **Time:** O(n) — each pointer moves at most n steps total
- **Space:** O(1)

Why this works:

- Starting with the widest container, we greedily narrow the width only when it might gain us height. Moving the shorter wall gives us a chance to find a taller one; moving the taller wall guarantees we can't do better (same or shorter cap, less width).

---

## Alternative Approaches to Try

### Approach 1: Brute Force (O(n²))

Check every pair of lines:

1. Nested loops: for each `i` and `j > i`
2. Compute `area = min(height[i], height[j]) × (j - i)`
3. Track the maximum area

**Time:** O(n²) | **Space:** O(1)  
⚠️ _Too slow for large inputs (n up to 10^5)_

## Similar Questions

- [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) — Hard
- [Maximum Tastiness of Candy Basket](https://leetcode.com/problems/maximum-tastiness-of-candy-basket/) — Medium
- [House Robber IV](https://leetcode.com/problems/house-robber-iv/) — Medium

## Implementation

See [ContainerWithMostWater.js](./ContainerWithMostWater.js) for the JavaScript implementation.
