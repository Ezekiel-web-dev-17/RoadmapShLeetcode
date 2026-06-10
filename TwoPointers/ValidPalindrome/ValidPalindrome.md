# Valid Palindrome

**Difficulty:** Easy  
**Topic:** Two Pointers, String

## Problem Description

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

## Examples

### Example 1

```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

### Example 2

```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

### Example 3

```
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
```

## Constraints

- `1 <= s.length <= 2 * 10^5`
- `s` consists only of printable ASCII characters.

## My Solution

### Clean String + Two Pointers (Current Implementation)

How it works:

1. Normalise the string: `s.toLowerCase()` then strip non-alphanumeric chars with `.replace(/[^a-zA-Z0-9]/g, "")` into `word`
2. Compute `half = Math.floor(word.length / 2)` — we only need to check up to the midpoint
3. Loop with two indices `i` (from left) and `j` (from right), comparing `word[i]` vs `word[j]`
4. If any pair mismatches, return `false` immediately
5. If the loop completes with no mismatches, return `true`

**Complexity:**

- **Time:** O(n) — one normalisation pass + up to n/2 comparisons
- **Space:** O(n) — we build a new cleaned string

Why this works:

- A palindrome reads the same forwards and backwards, so comparing character `i` from the front against character `j` from the back is sufficient.
- Normalising first keeps the comparison logic simple.

---

## Alternative Approaches to Try

### Approach 1: In-Place Two Pointers — No Extra String (Best - O(1) Space) ⭐

Skip non-alphanumeric characters on the fly without building a cleaned string:

1. Set `left = 0`, `right = s.length - 1`
2. While `left < right`:
   - Advance `left` while `s[left]` is not alphanumeric
   - Decrement `right` while `s[right]` is not alphanumeric
   - Compare `s[left].toLowerCase()` vs `s[right].toLowerCase()`; if different return `false`
   - Increment `left`, decrement `right`
3. Return `true`

**Time:** O(n) | **Space:** O(1)  
✅ _Most efficient — preferred in interviews_

### Approach 2: Reverse and Compare (O(n) Space)

1. Clean the string (lowercase + remove non-alphanumeric) into `cleaned`
2. Return `cleaned === cleaned.split("").reverse().join("")`

**Time:** O(n) | **Space:** O(n)  
⚠️ _Simple one-liner but allocates extra arrays_

### Approach 3: Manual Character Check (Avoid Regex)

Replace the regex with a helper `isAlphaNum(c)` that checks char codes directly:

1. `(c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')`
2. Use with in-place two pointers (Approach 1) for O(n) time, O(1) space

**Time:** O(n) | **Space:** O(1)  
_Useful when you want to avoid regex overhead or support custom character rules_

## Similar Questions

- [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/) — Easy

## Implementation

See [ValidPalindrome.js](./ValidPalindrome.js) for the JavaScript implementation.
