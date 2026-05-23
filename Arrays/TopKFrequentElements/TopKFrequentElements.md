# Top K Frequent Elements

**Difficulty:** Medium  
**Topic:** Array, Hash Table, Heap, Sorting, Bucket Sort

## Problem Description

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

## Examples

### Example 1

```
Input: nums = [1, 1, 1, 2, 2, 3], k = 2
Output: [1, 2]
Explanation: The element 1 appears 3 times, 2 appears 2 times, and 3 appears 1 time.
```

### Example 2

```
Input: nums = [1], k = 1
Output: [1]
Explanation: Only one unique element.
```

### Example 3

```
Input: nums = [1, 2, 1, 2, 1, 2, 3, 1, 3, 2], k = 2
Output: [1, 2]
Explanation: 1 appears 4 times, 2 appears 4 times, 3 appears 2 times.
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` is in the range `[1, number of unique elements]`
- Answer is guaranteed to be unique

## My Solution

### Hash Map + Sorting (Current Implementation)

This implementation counts frequencies using a hash map, then sorts entries by frequency in descending order.

How it works:

1. Sort the input array (optional optimization, not strictly necessary)
2. Create a hash map to count frequency of each number
3. Iterate through array: for each number, increment its count in the map
4. Convert hash map entries to array: `Array.from(Hash)`
5. Sort the array by frequency (second element) in descending order
6. Extract the first `k` elements (the keys) and return

**Current Complexity:**

- **Time Complexity:** O(n log n) due to sorting (initial sort + sort by frequency)
- **Space Complexity:** O(n) for the hash map

Why this works:

- Hash map gives O(1) frequency lookups and updates.
- Sorting ensures highest frequencies come first.
- Taking first `k` elements gives the answer.

---

## Alternative Approaches to Try

### Approach 1: Min Heap (Best - O(n log k)) ⭐

Maintain a heap of size `k` with smallest frequency element at top:

1. Build frequency map: O(n)
2. Create a min heap of size k from the frequencies
3. For each frequency > smallest in heap, remove smallest and add new
4. Return all k elements from heap

**Time Complexity:** O(n log k)  
**Space Complexity:** O(n)  
✅ _More efficient when k << n_

### Approach 2: Bucket Sort (O(n))

Use bucket sort since frequencies are bounded by array length:

1. Build frequency map: O(n)
2. Create buckets indexed by frequency (0 to n)
3. Place each unique element in its frequency bucket
4. Collect k elements starting from highest frequency bucket

**Time Complexity:** O(n)  
**Space Complexity:** O(n)  
✅ _Optimal time complexity_

### Approach 3: Quickselect (O(n) average)

Partition based on frequencies without fully sorting:

1. Build frequency map
2. Use quickselect to find k most frequent elements
3. Return selected elements

**Time Complexity:** O(n) average, O(n²) worst  
**Space Complexity:** O(n)

## Implementation

See [TopKFrequentElements.js](./TopKFrequentElements.js) for the JavaScript implementation.
