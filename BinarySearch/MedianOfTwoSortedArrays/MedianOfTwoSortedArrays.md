# 4. Median of Two Sorted Arrays

**Difficulty:** Hard  
**Topics:** Array, Binary Search, Divide and Conquer  

---

## Problem

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the **median** of the two sorted arrays.

The overall run time complexity should be **O(log (m+n))**.

---

## Examples

### Example 1

```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

### Example 2

```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```

---

## Constraints

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10⁶ <= nums1[i], nums2[i] <= 10⁶`

---

## My Solution

### Current Implementation: Merge and Sort (Baseline)

A direct, intuitive approach that merges both arrays and locates the central elements.

#### How It Works

1. Combine `nums1` and `nums2` using array spread syntax: `[...nums1, ...nums2]`.
2. Sort the combined array in ascending order with `.sort((a, b) => a - b)`.
3. Compute the midpoint index: `mid = left + Math.floor((right - left) / 2)`.
4. Return the median based on total length parity:
   - **Odd Length (`len % 2 !== 0`):** Return the middle element `nums[mid]`.
   - **Even Length (`len % 2 === 0`):** Return the average of `nums[mid]` and `nums[mid + 1]`.

#### Complexity Analysis

- **Time Complexity:** $O((m + n) \log (m + n))$
  - Creating the combined array takes $O(m + n)$.
  - Sorting an array of size $(m + n)$ with JavaScript's Timsort takes $O((m + n) \log(m + n))$.
  - ⚠️ *Note:* Does not meet the strict $O(\log(m + n))$ constraint required by the problem prompt, but serves as a clean and reliable baseline.
- **Space Complexity:** $O(m + n)$
  - Requires auxiliary space to store the concatenated array.

---

## Optimal Approach

### Binary Search on Partition ($O(\log(\min(m, n)))$)

To achieve the optimal $O(\log(m + n))$ time without creating new arrays, we use **Binary Search on the Partition Point**.

#### Key Intuition

1. **Partitioning the Search Space:**
   - The median splits the combined sorted collection into two halves of equal size (or left has 1 more element if total is odd):
     $$\text{totalLeft} = \left\lfloor\frac{m + n + 1}{2}\right\rfloor$$
   - If we pick a cut point `i` in the smaller array `nums1`, the cut point `j` in `nums2` is automatically fixed:
     $$j = \text{totalLeft} - i$$

2. **Condition for Correct Partition:**
   - Elements to the left of the cut must all be $\le$ elements to the right of the cut:
     - `maxLeft1 <= minRight2`
     - `maxLeft2 <= minRight1`
   - If `maxLeft1 > minRight2`, partition `i` is too far to the right $\rightarrow$ search left (`high = i - 1`).
   - If `maxLeft2 > minRight1`, partition `i` is too far to the left $\rightarrow$ search right (`low = i + 1`).

3. **Calculating the Median:**
   - **Odd Total Length:** $\max(\text{maxLeft1}, \text{maxLeft2})$
   - **Even Total Length:** $\frac{\max(\text{maxLeft1}, \text{maxLeft2}) + \min(\text{minRight1}, \text{minRight2})}{2}$

#### Optimal Complexity

- **Time Complexity:** $O(\log(\min(m, n)))$
  - We perform binary search exclusively on the smaller array ($m \le n$).
- **Space Complexity:** $O(1)$
  - Only uses partition indices and boundary values.

---

## Alternative Approaches

### Approach 1: Two Pointers Simulation ($O(m + n)$)

- **The Idea:** Keep two pointers (one in `nums1`, one in `nums2`) and simulate merge-sort step-by-step until reaching the $(m + n) / 2$-th element.
- **Trade-off:** Achieves $O(1)$ auxiliary space and $O(m + n)$ time, but still linear rather than logarithmic.

---

## Stats

| Accepted | Submissions | Acceptance Rate |
|---|---|---|
| 3,380,000 | 8,050,000 | 42.0% |

---

## Similar Questions

| Problem | Difficulty |
|---|---|
| Median of a Row Wise Sorted Matrix | Medium |
| Find K-th Smallest Pair Distance | Hard |

---

## Implementation

See [MedianOfTwoSortedArrays.js](./MedianOfTwoSortedArrays.js) for the JavaScript implementation.
