# Group Anagrams

**Difficulty:** Medium  
**Topic:** String, Hash Map, Sorting

## Problem Description

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An **anagram** is a word formed by rearranging the letters of another word using the exact same characters.

## Examples

### Example 1

```
Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

### Example 2

```
Input: strs = [""]
Output: [[""]]
```

### Example 3

```
Input: strs = ["a"]
Output: [["a"]]
```

## Constraints

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

## My Solution

### Sorted String Comparison With Linear Search (Previous Wrong Implementation)

This was my earlier solution. It groups words by sorting each string and then scanning all existing groups to find a match.

How it works:

1. Sort the letters in each word to create a normalized key.
2. Loop through every string in `strs`.
3. For each string, compare its sorted form against the first word of every group already stored.
4. If a match is found, append the string to that group.
5. If no match is found, create a new group.

**Current Complexity:**

- **Time Complexity:** `O(n^2 * k log k)` in the worst case, where `n` is the number of strings and `k` is the average string length.
- **Space Complexity:** `O(n * k)`

Why this is not ideal:

- Each new word may scan every existing group.
- Each comparison can sort strings again, which adds extra work.
- This becomes too slow for larger inputs.

## Alternative Approaches to Try

### Approach 1: Hash Map With Sorted Key (Best - `O(n * k log k)`) ⭐

Store each group in a map using the sorted string as the key:

1. Create an empty map.
2. For each word, sort its characters to build a key.
3. Use the key to look up the matching group.
4. If the key exists, push the word into that group.
5. If the key does not exist, create a new group.
6. Return all grouped values from the map.

**Time Complexity:** `O(n * k log k)`  
**Space Complexity:** `O(n * k)`

### Approach 2: Character Count Key (`O(n * k)`)

Use a frequency signature instead of sorting:

1. Count the frequency of each letter in a word.
2. Turn that count array into a unique string key.
3. Use the key to group words in a map.
4. Return all grouped values.

**Time Complexity:** `O(n * k)`  
**Space Complexity:** `O(n * k)`

### Approach 3: Brute Force (`O(n^2)`)

Compare every word with every other word:

1. Start with an empty list of groups.
2. Compare each new word against all previous words.
3. If it is an anagram of one of them, place it in that group.
4. Otherwise, create a new group.

**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(n)`

## Implementation

See [GroupAnagrams.js](./GroupAnagrams.js) for the JavaScript implementation.
