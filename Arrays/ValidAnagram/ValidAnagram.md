# Valid Anagram

**Difficulty:** Easy  
**Topic:** String, Hash Map, Sorting

## Problem Description

Given two strings `s` and `t`, return `true` if `t` is an **anagram** of `s`, and `false` otherwise.

An **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Examples

### Example 1

```
Input: s = "anagram", t = "nagaram"
Output: true
Explanation: t contains the exact same characters as s, just rearranged.
```

### Example 2

```
Input: s = "rat", t = "car"
Output: false
Explanation: t does not contain the same characters as s.
```

### Example 3

```
Input: s = "ab", t = "ba"
Output: true
Explanation: Both strings contain 'a' and 'b', same count.
```

## Constraints

- `1 <= s.length, t.length <= 5 × 10^4`
- `s` and `t` consist of lowercase English letters

**Follow up**: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

## My Solution

### Character Position Scoring (Current Implementation)

This implementation builds a list of unique characters from `s`, then computes a numeric score for `s` and `t` based on each character's position in that unique list.

How it works:

1. Check if lengths differ - return false if so
2. Extract unique characters from `s` into `words = {}`
3. Create a `scorer()` function that:
   - Iterates through a string
   - For each character, searches `words` with `.find()`
   - Adds `position + 1` to a running score (or `0` if not found)
4. Calculate score for string `s` using `scorer(s)`
5. Calculate score for string `t` using `scorer(t)`
6. Compare scores - return true if equal, false otherwise

**Current Complexity:**

- **Time Complexity:** O(n) — each `.find()` runs over at most 26 unique lowercase letters, so scoring is linear in the input length.
- **Space Complexity:** O(k) where k = number of unique characters (≤26 for lowercase English)

Why this works:

- If `s` and `t` contain the same character distribution, they should produce the same score under this mapping.

Important caveat for other developers:

- Score collisions are possible, meaning different strings can produce the same total score.
- Because of collisions, this strategy is not as reliable as frequency counting for strict anagram validation.

Notes:

- This implementation does **not** use `indexOf()` on the full input.
- It relies on `.find()` over a bounded set of lowercase letters, which keeps runtime linear under the given constraints.
- If the alphabet were unbounded, repeated searches could trend toward O(n²).

---

## Alternative Approaches to Try

### Approach 1: Character Frequency Counting (Best - O(n)) ⭐

Count character frequencies and compare:

1. If lengths differ, return false
2. Create frequency map from string `s`: `freq = {}`
3. Iterate through string `s`, increment count for each character
4. Iterate through string `t`:
   - Decrement count for each character
   - If character not in map or count goes negative, return false
5. If loop completes, return true (all counts are 0)

**Time Complexity:** O(n) - two passes  
**Space Complexity:** O(1) - at most 26 lowercase letters  
✅ _Most efficient_

### Approach 2: Sorting Comparison (O(n log n))

Sort both strings and compare:

1. If lengths differ, return false
2. Sort both strings: `s.split('').sort().join('')`
3. Sort both strings: `t.split('').sort().join('')`
4. Return true if sorted strings are identical

**Time Complexity:** O(n log n)  
**Space Complexity:** O(n) - space for sorted arrays

### Approach 3: Fixed-Size Frequency Array (O(n))

Use array instead of object for character counts:

1. If lengths differ, return false
2. Create array of size 26 (for a-z): `counts = new Array(26).fill(0)`
3. Iterate through string `s`: `counts[char.charCodeAt(0) - 'a'.charCodeAt(0)]++`
4. Iterate through string `t`: `counts[char.charCodeAt(0) - 'a'.charCodeAt(0)]--`
5. Check if all counts are 0

**Time Complexity:** O(n)  
**Space Complexity:** O(1) - fixed size 26

### Approach 4: One-Liner Sorting (Simplest)

```javascript
return s.split("").sort().join("") === t.split("").sort().join("");
```

**Time Complexity:** O(n log n)  
**Space Complexity:** O(n)  
✅ _One-liner but less efficient_

## Implementation

See [ValidAnagram.js](./ValidAnagram.js) for the JavaScript implementation.
