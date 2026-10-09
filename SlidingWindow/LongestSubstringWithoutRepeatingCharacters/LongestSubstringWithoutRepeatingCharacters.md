# 3. Longest Substring Without Repeating Characters

**Difficulty:** Medium  
**Topics:** Hash Table, String, Sliding Window  
**LeetCode Link:** [LeetCode 3 - Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

---

## Problem Description

Given a string `s`, find the length of the longest substring without duplicate characters.

---

## Examples

### Example 1

```text
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
```

### Example 2

```text
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

### Example 3

```text
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

---

## Constraints

- `0 <= s.length <= 10⁵`
- `s` consists of English letters, digits, symbols and spaces.

---

## Initial Attempt & Thought Process

### Implementation

```javascript
var lengthOfLongestSubstring = function (s = "abcabcbb") {
    let left = 0, right = left + 1, maxSubstring = s.substring(0, 1);

    while (right <= s.length) {
        maxSubstring = maxSubstring.length < right - left ? s.substring(left, right) : maxSubstring;

        if (maxSubstring.includes(s[right])) left = right;

        right++;
    }

    return maxSubstring.length;
};
```

### The Thought Process

1. **Two-Pointer Window Concept:**
   - Use `left` to mark the start of a candidate non-repeating substring.
   - Use `right` to expand the window forward character by character.
   - Maintain `maxSubstring` to store the longest substring seen so far.

2. **Window Expansion & Updating Max:**
   - At each step, if the current window length `right - left` is greater than `maxSubstring.length`, update `maxSubstring = s.substring(left, right)`.

3. **Duplicate Detection & Reset:**
   - Inspect the incoming character `s[right]`.
   - If `maxSubstring.includes(s[right])`, assume a duplicate has occurred and reset the window start to the current index: `left = right`.
   - Advance `right++`.

4. **Termination:**
   - Once `right` reaches the end of the string, return `maxSubstring.length`.

---

## Why This Approach Is Incorrect (Flaws & Failure Analysis)

While the intuition of expanding a window with two pointers is on the right track, this specific logic suffers from fundamental flaws:

### 1. Checking `maxSubstring` Instead of the Active Window

- **The Flaw:** `maxSubstring` holds the **overall longest substring recorded so far across the entire string**, *not* the current active window `[left, right)`.
- **The Consequence:** Checking `maxSubstring.includes(s[right])` tests against characters from historical substrings that are no longer part of the current window.
- **Example Trace (`s = "1R1T7"`):**
  - Expected output: `4` (`"R1T7"`).
  - When examining index `1` (`'R'`), `maxSubstring` is updated to `"1R"`.
  - At index `2` (`'1'`), the current active window is just `"R"`. However, `maxSubstring` (`"1R"`) contains `'1'`.
  - The algorithm falsely detects a collision with a character from a previous window, triggering `left = right = 2`.
  - This prematurely resets the window, destroying the valid candidate `"R1T7"` and returning `3` instead of `4`.

---

### 2. Skipping Characters with `left = right` on Duplicate

- **The Flaw:** When a duplicate character is encountered, jumping `left = right` discards all valid characters between `left` and `right`.
- **The Consequence:** A repeating character only conflicts with its previous occurrence in the active window. Valid substrings starting immediately *after* that first occurrence are completely skipped.
- **Example Trace (`s = "dvdf"`):**
  - Expected output: `3` (`"vdf"`).
  - Window expands to `"dv"` (`left = 0`, `right = 2`).
  - Next character at index `2` is `'d'`, which duplicates the `'d'` at index `0`.
  - Jumping `left = right = 2` moves `left` straight to index `2`.
  - The window now only sees `"df"` (length 2), completely missing `"vdf"` (length 3, starting at index 1).
- **Example Trace (`s = "cdcda"`):**
  - Expected output: `3` (`"cda"` or `"dcd"`).
  - Actual output: `2`. The reset skips over valid overlapping substrings.

---

### 3. Out-of-Bounds Loop Boundary (`right <= s.length`)

- **The Flaw:** The loop condition `right <= s.length` allows `right` to equal `s.length`.
- **The Consequence:** On the final iteration, `s[right]` accesses `s[s.length]`, which evaluates to `undefined`.
- In JavaScript, `maxSubstring.includes(undefined)` coerces `undefined` to the string `"undefined"`, which is erroneous and relies on undefined behavior.

---

### 4. Premature Update Before Collision Check

- **The Flaw:** `maxSubstring` is updated on line 9 *before* checking if `s[right]` creates a duplicate on line 11.
- Furthermore, updating `maxSubstring` before the window has validated whether `s[right]` can safely be included couples state in an inconsistent order.

---

### 5. Inefficient Time Complexity ($O(n^2)$)

- In addition to being logically incorrect, using `s.substring(left, right)` and `maxSubstring.includes(s[right])` scans strings linearly inside the loop, leading to $O(n^2)$ time complexity rather than the optimal $O(n)$ sliding window using a Hash Set or Hash Map.

---

## Test Cases Comparison

| Input `s` | Expected Output | Actual Output | Status | Reason for Failure |
| :--- | :--- | :--- | :--- | :--- |
| `"abcabcbb"` | `3` (`"abc"`) | `3` | ⚠️ Passed by coincidence | Pattern resets coincidentally aligned |
| `"bbbbb"` | `1` (`"b"`) | `1` | ⚠️ Passed by coincidence | Single repeating character resets every step |
| `"pwwkew"` | `3` (`"wke"`) | `3` | ⚠️ Passed by coincidence | Duplicate is adjacent (`"ww"`) |
| `"mq"` | `2` (`"mq"`) | `2` | ⚠️ Passed by coincidence | No duplicates exist |
| `"1R1T7"` | **`4` (`"R1T7"`)** | **`3`** | ❌ **Failed** | Stale characters in `maxSubstring` cause premature reset |
| `"cdcda"` | **`3` (`"cda"`)** | **`2`** | ❌ **Failed** | `left = right` skips valid substrings across duplicates |
| `"dvdf"` | **`3` (`"vdf"`)** | **`2`** | ❌ **Failed** | Jumping `left = right` discards `'v'` |

---

## What the Correct Sliding Window Approach Requires

1. **Track the Active Window Only:**
   - Use a `Set` or hash map (`Map` / object) that only stores characters present in the **current window** `[left, right]`.

2. **Shrink Incrementally (or Jump to Previous Index + 1):**
   - **Option A (Set):** When `s[right]` is in the set, remove `s[left]` from the set and increment `left++` until `s[right]` is no longer in the set.
   - **Option B (Map):** Store the last seen index of each character. When a duplicate is found, update `left = Math.max(left, map[s[right]] + 1)`.

3. **Track Max Length as a Number:**
   - Keep a scalar `maxLen = Math.max(maxLen, right - left + 1)` instead of slicing strings.
