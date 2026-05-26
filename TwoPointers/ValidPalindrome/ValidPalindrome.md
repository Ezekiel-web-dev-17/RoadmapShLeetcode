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

### Explanation (matches current `ValidPalindrome.js`)

The implementation in `ValidPalindrome.js` performs these steps:

1. Normalize the input string `s` by calling `s.toLowerCase()` and removing non-alphanumeric characters with `s.replace(/[^a-zA-Z0-9]/g, "")`. The resulting string is stored in `word`.
2. Compute `half = Math.floor(word.length / 2)` to know how many pairwise comparisons are needed; comparing only up to the middle avoids redundant checks.
3. Use a `for` loop with two indices: `i` starting at `0` and `j` starting at `word.length - 1`. After each iteration increment `i` and decrement `j`.
4. On each iteration compare `word[i]` and `word[j]`. If any pair differs, return `false` immediately.
5. If the loop completes without mismatches, return `true`.

Key points about this implementation:

- The normalization step allocates a cleaned string, so space usage is `O(n)` where `n` is the length of the input (after cleaning).
- The loop compares only half the characters (`half`), making the number of comparisons roughly `n/2`, but time complexity remains `O(n)`.
- Using the regex `/[^a-zA-Z0-9]/g` ensures only ASCII alphanumeric characters remain; this matches typical LeetCode constraints.

**Time Complexity:** O(n) — normalization plus a single pass of pairwise comparisons.  
**Space Complexity:** O(n) — for the normalized string.

### Suggested Alternative Solutions

- In-place two-pointer scan without building a cleaned string: iterate `left` and `right` over the original `s`, advancing them while skipping non-alphanumeric characters and comparing characters on the fly. This yields O(n) time and O(1) extra space.
- Use `cleaned === cleaned.split("").reverse().join("")` after normalization for a concise approach. This is O(n) time but allocates extra arrays/strings; may be slightly slower in practice.
- Replace the regex normalization with a manual character check (`isAlphaNum`) to avoid the cost of regex on very long strings or to support custom character rules.
- For Unicode inputs, normalization requires care (case folding and Unicode-aware category tests). Consider using `Intl` or dedicated Unicode libraries if needed.

See `ValidPalindrome.js` for the exact code referenced above.

## Implementation

See `ValidPalindrome.js` for both the preserved high-O attempt (commented) and the preferred two-pointer solution with comments.
