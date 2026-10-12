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

## My Solution

### Current Implementation: Array-Based Sliding Window Queue

An array `subString` acts as a FIFO (First-In, First-Out) sliding window queue, dynamically tracking the current contiguous sequence of non-repeating characters.

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s = "abcabcbb") {
    let max = '', subString = [];

    for (let right = 0; right < s.length; right++) {
        while (subString.includes(s[right])) subString.shift();

        subString.push(s[right]);
        max = max.length < subString.length ? subString.join('') : max;
    }

    return max.length;
};
```

#### How It Works

1. **State Initialization:**
   - `subString = []`: Stores characters inside the current active window in order.
   - `max = ''`: Stores the longest valid non-repeating substring found so far.

2. **Window Expansion & Dynamic Shrinking:**
   - Iterate through `s` using pointer `right` from `0` to `s.length - 1`:
     - **Conflict Resolution (`while (subString.includes(s[right]))`):**
       - If the incoming character `s[right]` already exists in `subString`, shrink the window from the left by calling `subString.shift()`.
       - Repeat until the previous instance of `s[right]` is evicted from the queue.
     - **Enqueue New Character:**
       - Append `s[right]` to the end of the window queue via `subString.push(s[right])`.
     - **Update Maximum Substring:**
       - If `subString.length` exceeds `max.length`, update `max = subString.join('')`.

3. **Return Result:**
   - Return `max.length`, which represents the maximum length achieved.

#### Complexity Analysis

- **Time Complexity:** $O(n \cdot k)$ where $n$ is `s.length` and $k = \min(n, |\Sigma|)$ is the size of the character set ($|\Sigma| \le 128$ for standard ASCII).
  - The outer loop runs $n$ times.
  - In each iteration, `subString.includes(s[right])` performs an $O(k)$ linear scan over the array.
  - `subString.shift()` takes $O(k)$ time to re-index array elements.
  - `subString.join('')` takes $O(k)$ to build a string when a new maximum is reached.
  - While $k$ is bounded by 128 for ASCII strings (making it practically fast), array lookups and shifts carry higher overhead than hash set lookups.
- **Space Complexity:** $O(\min(n, |\Sigma|))$
  - `subString` holds at most $k = \min(n, |\Sigma|)$ unique characters at any time.
  - `max` holds a string of length at most $k$.

---

## Evolution: Initial Attempt vs Current Solution

### Initial Attempt (Flawed)

```javascript
// Initial broken attempt
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

#### Why the Initial Attempt Failed
1. **Checking `maxSubstring` instead of active window:** Checking `maxSubstring.includes(s[right])` tested against historical characters that were no longer part of the current window (e.g., failed on `"1R1T7"`).
2. **Aggressive pointer jumping (`left = right`):** When a duplicate was encountered, jumping `left = right` discarded valid intermediate characters (e.g., failed on `"dvdf"` and `"cdcda"`).
3. **Out-of-bounds loop boundary (`right <= s.length`):** Read `undefined` at the string boundary.

#### How the Current Solution Fixes These Issues
- Instead of checking historical substrings, `subString` only tracks the **active contiguous window**.
- Instead of jumping `left = right`, `subString.shift()` evicts characters from the front **one by one** until only the conflicting duplicate is removed, preserving valid prefix characters.

---

## Optimal Approaches

### Approach 1: Sliding Window with Hash Set ($O(n)$ Time, $O(k)$ Space) ⭐

Instead of an array with linear `.includes()` and `.shift()`, use a `Set` for $O(1)$ lookups and deletions:

```javascript
var lengthOfLongestSubstring = function (s) {
    let set = new Set();
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }

        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};
```

#### Key Intuition
- **Two Pointers:** `left` marks the window start, `right` marks the window end.
- When `s[right]` duplicates a character currently in `set`, slide `left` forward and remove `s[left]` until `s[right]` can safely enter.
- **Complexity:**
  - **Time Complexity:** $O(n)$ — Each character is visited at most twice (once by `right`, once by `left`). All `set.has`, `set.add`, and `set.delete` operations are $O(1)$.
  - **Space Complexity:** $O(\min(n, |\Sigma|))$ — The set stores at most $\min(n, |\Sigma|)$ unique characters.

---

### Approach 2: Optimized Sliding Window with Hash Map / Index Jump ($O(n)$ Single-Pass) ⭐⭐

Instead of shifting `left` step-by-step, store the **last seen index** of each character in a `Map` (or object). When a duplicate is encountered, jump `left` directly past the previous occurrence:

```javascript
var lengthOfLongestSubstring = function (s) {
    let map = new Map();
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        if (map.has(char) && map.get(char) >= left) {
            // Jump left pointer directly past the duplicate
            left = map.get(char) + 1;
        }

        map.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};
```

#### Key Intuition
- If `s[right]` was seen at index `j >= left`, any substring starting at or before `j` would contain duplicate `s[right]`.
- We immediately advance `left = j + 1` in $O(1)$ without an inner `while` loop.
- **Complexity:**
  - **Time Complexity:** $O(n)$ — Exactly $n$ iterations, strictly single-pass.
  - **Space Complexity:** $O(\min(n, |\Sigma|))$ — Hash map stores at most $\min(n, |\Sigma|)$ entries.

---

### Approach 3: Direct Integer Array for ASCII ($O(n)$ Time, $O(1)$ Space)

If `s` contains standard ASCII characters (128 characters), use a fixed-size integer array to store the last seen indices with zero hash map overhead:

```javascript
var lengthOfLongestSubstring = function (s) {
    const lastSeen = new Int32Array(128).fill(-1);
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const code = s.charCodeAt(right);

        if (lastSeen[code] >= left) {
            left = lastSeen[code] + 1;
        }

        lastSeen[code] = right;
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};
```

#### Key Intuition
- Direct array indexing via `s.charCodeAt(right)` avoids all hashing, object lookups, and garbage collection.
- **Complexity:**
  - **Time Complexity:** $O(n)$ — Extremely cache-friendly and fast execution.
  - **Space Complexity:** $O(1)$ — Fixed table of size 128.

---

### Approach 4: Brute Force ($O(n^3)$ Time)

Check all possible substrings and verify if all characters in each substring are distinct:

```javascript
var lengthOfLongestSubstring = function (s) {
    let maxLen = 0;

    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const sub = s.substring(i, j + 1);
            const set = new Set(sub);
            if (set.size === sub.length) {
                maxLen = Math.max(maxLen, sub.length);
            }
        }
    }

    return maxLen;
};
```

- **Time Complexity:** $O(n^3)$ — $O(n^2)$ substrings, and validating each takes $O(n)$. With $n = 10^5$, this requires $10^{15}$ operations and results in a **Time Limit Exceeded (TLE)**.
- **Space Complexity:** $O(\min(n, |\Sigma|))$ for the set validation.

---

## Summary Comparison

| Approach | Time Complexity | Space Complexity | Passes | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Array Queue Window (Current)** | $O(n \cdot k)$ | $O(k)$ | 1 | ✅ Accepted |
| **Sliding Window + Hash Set** | $O(n)$ | $O(k)$ | 2 amortized | ✅ Optimal & Accepted |
| **Sliding Window + Hash Map (Index Jump)** | $O(n)$ | $O(k)$ | 1 strict | ✅ Optimal & Accepted ⭐ |
| **Direct ASCII Array (Fixed 128)** | $O(n)$ | $O(1)$ | 1 strict | ✅ Most Memory-Efficient |
| **Brute Force** | $O(n^3)$ | $O(k)$ | Multiple | ❌ Time Limit Exceeded (TLE) |

> Where $n = \text{s.length}$ and $k = \min(n, |\Sigma|)$.
