# 20. Valid Parentheses

**Difficulty:** Easy  
**Topic:** String, Stack

## Problem Description

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Examples

### Example 1

```
Input: s = "()"
Output: true
```

### Example 2

```
Input: s = "()[]{}"
Output: true
```

### Example 3

```
Input: s = "(]"
Output: false
```

### Example 4

```
Input: s = "([])"
Output: true
```

### Example 5

```
Input: s = "([)]"
Output: false
```

## Constraints

- `1 <= s.length <= 10^4`
- `s` consists of parentheses only `'()[]{}'`.

## Hints

**Hint 1:** Use a stack of characters.

**Hint 2:** When you encounter an opening bracket, push it to the top of the stack.

**Hint 3:** When you encounter a closing bracket, check if the top of the stack was the opening for it. If yes, pop it from the stack. Otherwise, return false.

## My Solution

### Iterative Scanning with Stack (Current Implementation)

This implementation splits the input string into a stack and processes characters sequentially, maintaining a temporary stack of open brackets.

How it works:
1. Create list of open brackets `open = ["[", "{", "("]` and a `map` connecting open brackets to their corresponding closing brackets.
2. Split string `s` into an array/stack of characters `stack` and initialize a temporary stack `tmpStack` to store active open brackets.
3. Loop while `stack` has characters:
   - If the next character is an open bracket, push it to `tmpStack` and remove it from `stack`.
     - `stack.splice(0, 1)` is used to remove from the front of the array.
   - If the next character is a closing bracket, check if it matches the closing bracket for the last open bracket in `tmpStack`.
     - If it doesn't match (or `tmpStack` is empty), the sequence is invalid, return `false`.
     - If it matches, pop the corresponding open bracket from `tmpStack`.
   - Remove the character from `stack`.
4. Return `true` if `tmpStack` is empty (all open brackets were successfully matched and closed), otherwise `false`.

**Current Complexity:**
- **Time Complexity:** O(n²) — due to array splitting and calling `splice(0, 1)` inside the loop, which shifts all remaining elements in the array. ⚠️
- **Space Complexity:** O(n) — auxiliary storage for the stacks.

---

## Alternative Approaches to Try

### Approach 1: Array-based Stack with Direct Push (Optimized - O(n) time, O(n) space) ⭐

Instead of pre-splitting the string into an array and calling `splice(0, 1)` (which is an O(n) operation in JavaScript and makes the overall runtime quadratic O(n²)), iterate directly over the string character-by-character and push matches onto a standard stack:

1. Create a `map` of closing-to-opening brackets: `map = { ')': '(', '}': '{', ']': '[' }`
2. Initialize an empty array `stack = []`
3. Iterate through each character `char` in string `s`:
   - If `char` is a closing bracket (exists in `map` keys):
     - Pop the top element from the stack.
     - If the popped element does not match `map[char]`, return `false`.
   - If `char` is an opening bracket:
     - Push `char` onto `stack`.
4. Return `true` if `stack` is empty, otherwise `false`.

**Time Complexity:** O(n) — one single pass over the string with O(1) stack operations.  
**Space Complexity:** O(n) — for the stack in the worst case.  
✅ _Most efficient and standard stack approach_

## Similar Questions

- [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) — Medium
- [Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/) — Hard
- [Remove Invalid Parentheses](https://leetcode.com/problems/remove-invalid-parentheses/) — Hard
- [Check If Word Is Valid After Substitutions](https://leetcode.com/problems/check-if-word-is-valid-after-substitutions/) — Medium
- [Check if a Parentheses String Can Be Valid](https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid/) — Medium

## Implementation

See [ValidParentheses.js](./ValidParentheses.js) for the JavaScript implementation.