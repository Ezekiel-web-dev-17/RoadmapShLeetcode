# 155. Min Stack

**Difficulty:** Medium  
**Topic:** Stack, Design

## Problem Description

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the `MinStack` class:

- `MinStack()` initializes the stack object.
- `void push(int val)` pushes the element `val` onto the stack.
- `void pop()` removes the element on the top of the stack.
- `int top()` gets the top element of the stack.
- `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with $O(1)$ time complexity for each function.

## Examples

### Example 1

```
Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

## Constraints

- $-2^{31} \le \text{val} \le 2^{31} - 1$
- Methods `pop`, `top` and `getMin` operations will always be called on non-empty stacks.
- At most $3 \times 10^4$ calls will be made to `push`, `pop`, `top`, and `getMin`.

## Hints

**Hint 1:** Consider each node in the stack having a minimum value. (Credits to @aakarshmadhavan)

## My Solution

### Linear Scan for Minimum (Current Implementation)

This implementation uses a standard array as a stack. To retrieve the minimum value, it iterates through the entire stack to find the smallest element.

How it works:
1. Initialize an empty array `this.stack`.
2. `push(value)` appends `value` to the end of the array.
3. `pop()` removes the last element from the array.
4. `top()` returns the last element of the array.
5. `getMin()` performs a linear scan through `this.stack` from index `0` to `this.stack.length - 1` to find and return the minimum value.

**Current Complexity:**
- **Time Complexity:**
  - `push(value)`: $O(1)$
  - `pop()`: $O(1)$
  - `top()`: $O(1)$
  - `getMin()`: $O(n)$ — due to traversing the entire stack to find the minimum element. ⚠️
- **Space Complexity:** $O(n)$ — to store the elements in the stack.

Why this is not ideal:
- The problem description explicitly requires $O(1)$ time complexity for each function, including `getMin()`. The linear search makes `getMin()` an $O(n)$ operation.

---

## Alternative Approaches to Try

### Approach 1: Stack of Objects with Value and Current Min (Optimized - $O(1)$ time) ⭐

Instead of storing just the raw value in the stack, store an object containing the value itself and the minimum value seen so far up to that point in the stack.

How it works:
1. When pushing a new value `val`, check if the stack is empty.
2. If empty, the current minimum is `val`.
3. If not empty, the current minimum is the minimum of `val` and the stored min of the top element: `Math.min(val, this.getMin())`.
4. Push `{ val: val, min: currentMin }` onto the stack.
5. `top()` returns the `val` of the top object.
6. `getMin()` returns the `min` of the top object.

**Complexity:**
- **Time Complexity:** $O(1)$ for all operations (`push`, `pop`, `top`, `getMin`).
- **Space Complexity:** $O(n)$ auxiliary space to store the minimum value alongside each element.

### Approach 2: Two Stacks (Optimized - $O(1)$ time)

Use an additional auxiliary stack to keep track of the minimum values:

1. Maintain two stacks: `stack` and `minStack`.
2. `push(val)`: Push `val` onto `stack`. If `minStack` is empty or `val <= minStack[top]`, push `val` onto `minStack`.
3. `pop()`: Pop from `stack`. If the popped value is equal to the top of `minStack`, pop from `minStack` as well.
4. `top()`: Return the top of `stack`.
5. `getMin()`: Return the top of `minStack`.

**Complexity:**
- **Time Complexity:** $O(1)$ for all operations.
- **Space Complexity:** $O(n)$ auxiliary space.

## Similar Questions

- [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) — Hard
- [Max Stack](https://leetcode.com/problems/max-stack/) — Hard

## Implementation

See [MinStack.js](./MinStack.js) for the JavaScript implementation.
