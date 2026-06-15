# 42. Trapping Rain Water

**Difficulty:** Hard  
**Topics:** Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack

## Problem Description

Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

## Examples

### Example 1

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
```

### Example 2

```
Input: height = [4,2,0,3,2,5]
Output: 9
```

## Constraints

- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## Hints

**Hint 1:** Focus on individual bars: consider how much water can be trapped above a single specific bar at index `i`. The water level at index `i` is determined by the height of the tallest bar to its left and the tallest bar to its right: `min(max_left, max_right) - height[i]`.

**Hint 2:** Optimize with precomputation or two pointers. Instead of recalculating `max_left` and `max_right` for every index in $O(n^2)$ time, we can precalculate them using prefix/suffix arrays ($O(n)$ time and space) or keep track of them dynamically with two pointers moving from both ends ($O(n)$ time and $O(1)$ space).

## My Solution

### Iterative Scanning with Array Slicing (Current Implementation)

How it works:

1. Loop while the `height` array is not empty:
   - If the first element is larger than the last element, reverse the array to ensure we process from the lower side first.
   - Scan from the first element `left` to find the first element `right` where `height[right] >= height[left]`.
   - If a valid range with width `diff > 1` is found:
     - Compute the water capacity between them: `(diff - 1) * min(height[left], height[right])` minus the sum of intermediate bar heights.
     - Add this to the running total.
   - Slice the array to start at index `right` and repeat.
2. Return the total trapped water.

**Complexity:**

- **Time:** O(n²) in the worst case (due to array copying and potential repeated reverses and slices on skewed data).
- **Space:** O(n) due to allocating new arrays during `slice()`.

---

## Alternative Approaches to Try

### Approach 1: Two Pointers (O(n) time, O(1) space)

The optimal approach. Maintain two pointers, `left` at `0` and `right` at `n - 1`, along with `left_max` and `right_max` initialized to 0.
- Compare `height[left]` and `height[right]`.
- If `height[left] < height[right]`:
  - If `height[left] >= left_max`, update `left_max`.
  - Else, add `left_max - height[left]` to total.
  - Move `left` forward.
- Else:
  - If `height[right] >= right_max`, update `right_max`.
  - Else, add `right_max - height[right]` to total.
  - Move `right` backward.

**Time:** O(n) | **Space:** O(1)

### Approach 2: Dynamic Programming / Precomputed Arrays (O(n) time, O(n) space)

Precompute prefix maximums (`left_max`) and suffix maximums (`right_max`) in two arrays.
- `left_max[i] = max(left_max[i-1], height[i])`
- `right_max[i] = max(right_max[i+1], height[i])`
- Loop through the array once and add `min(left_max[i], right_max[i]) - height[i]` to the total.

**Time:** O(n) | **Space:** O(n)

### Approach 3: Monotonic Stack (O(n) time, O(n) space)

Use a monotonic decreasing stack to store the indices of the bars.
- Iterate through the array.
- While the current bar is taller than the bar at the top of the stack:
  - Pop the top of the stack as the bottom of the container.
  - If the stack is empty, break (no left boundary).
  - Calculate distance: `current_index - stack[top] - 1`.
  - Calculate bounded height: `min(height[current_index], height[stack[top]]) - height[bottom]`.
  - Add `distance * bounded_height` to total.
- Push current index to stack.

**Time:** O(n) | **Space:** O(n)

## Similar Questions

- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) — Medium
- [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) — Medium
- [Trapping Rain Water II](https://leetcode.com/problems/trapping-rain-water-ii/) — Hard

## Implementation

See [TrappingRainWater.js](./TrappingRainWater.js) for the JavaScript implementation.
