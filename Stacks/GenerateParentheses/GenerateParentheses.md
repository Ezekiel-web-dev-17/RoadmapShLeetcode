# 22. Generate Parentheses

**Difficulty:** Medium
**Topics:** String, Dynamic Programming, Backtracking

---

## Problem

Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

---

## Examples

### Example 1

```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

### Example 2

```
Input: n = 1
Output: ["()"]
```

---

## Constraints

- `1 <= n <= 8`

---

## Stats

| Accepted | Submissions | Acceptance Rate |
|---|---|---|
| 2,984,839 | 3.8M | 78.9% |

---

## My Solution

### Backtracking with Open/Close Counters (Current Implementation)

This is a classic backtracking solution that builds valid parentheses strings character by character, using two counters to enforce validity rules at every step.

How it works:

1. Calculate the target string length: `length = n * 2` (each pair contributes one `(` and one `)`).
2. Initialize an empty `answer` array to collect all valid combinations.
3. Define a recursive `backtrack(currString, openCount, closeCount)` function:
   - **Base case:** If `currString.length === length`, we've built a complete valid string — push it to `answer` and return.
   - **Add `(`:** If `openCount < n`, we still have open parens available, so recurse with `currString + "("` and `openCount + 1`.
   - **Add `)`:** If `openCount > closeCount`, there are unmatched open parens to close, so recurse with `currString + ")"` and `closeCount + 1`.
4. Start the recursion with `backtrack("", 0, 0)`.
5. Return `answer`.

**Why the two rules guarantee validity:**

- `openCount < n` ensures we never use more than `n` opening parens.
- `openCount > closeCount` ensures we never place a `)` without a matching `(` before it. At every point in the string, the number of `(` characters is ≥ the number of `)` characters.

Together, these two constraints mean only well-formed strings reach the base case.

**Complexity:**

- **Time:** O(4ⁿ / √n) — the nth Catalan number, which counts the number of valid parentheses strings of length 2n.
- **Space:** O(n) — recursion depth is at most `2n`, plus O(Catalan(n)) to store all results.

---

## Alternative Approaches

### Approach 1: Iterative / BFS (O(4ⁿ / √n))

Use a queue (BFS) instead of recursion. Each state in the queue stores `(currentString, openCount, closeCount)`. Process states level by level, applying the same two rules.

**Time:** O(4ⁿ / √n) | **Space:** O(4ⁿ / √n) for the queue

### Approach 2: Dynamic Programming / Memoization

Build valid strings of length `2n` from valid strings of smaller `n`. For each `n`, a valid string can be written as `"(" + valid(i) + ")" + valid(n-1-i)` for `i` from `0` to `n-1`.

**Time:** O(4ⁿ / √n) | **Space:** O(4ⁿ / √n)

---

## Similar Questions

| Problem | Difficulty |
|---|---|
| Letter Combinations of a Phone Number | Medium |
| Valid Parentheses | Easy |
| Check if a Parentheses String Can Be Valid | Medium |

---

## Implementation

See [GenerateParentheses.js](./GenerateParentheses.js) for the JavaScript implementation.
