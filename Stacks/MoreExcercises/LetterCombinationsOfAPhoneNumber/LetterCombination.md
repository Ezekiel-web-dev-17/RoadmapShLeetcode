# 17. Letter Combinations of a Phone Number

**Difficulty:** Medium
**Topics:** Hash Table, String, Backtracking

---

## Problem

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that `1` does not map to any letters.

| Digit | Letters |
|---|---|
| 2 | abc |
| 3 | def |
| 4 | ghi |
| 5 | jkl |
| 6 | mno |
| 7 | pqrs |
| 8 | tuv |
| 9 | wxyz |

---

## Examples

### Example 1

```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### Example 2

```
Input: digits = "2"
Output: ["a","b","c"]
```

---

## Constraints

- `0 <= digits.length <= 4`
- `digits[i]` is a digit in the range `['2', '9']`.

---

## Stats

| Accepted | Submissions | Acceptance Rate |
|---|---|---|
| 3,113,029 | 4.7M | 66.4% |

---

## Similar Questions

| Problem | Difficulty |
|---|---|
| Generate Parentheses | Medium |
| Combination Sum | Medium |
| Binary Watch | Easy |
| Count Number of Texts | Medium |
| Minimum Number of Pushes to Type Word I | Easy |
| Minimum Number of Pushes to Type Word II | Medium |

---

## Implementation

See [LetterCombination.js](./LetterCombination.js) for the JavaScript implementation.
