# 74. Search a 2D Matrix

**Difficulty:** Medium  
**Topics:** Array, Binary Search, Matrix  

---

## Problem

You are given an `m x n` integer matrix `matrix` with the following two properties:

1. Each row is sorted in non-decreasing order.
2. The first integer of each row is greater than the last integer of the previous row.

Given an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.

You must write a solution in **O(log(m * n))** time complexity.

---

## Examples

### Example 1

![Example 1 Matrix](https://assets.leetcode.com/uploads/2020/10/05/mat.jpg)

```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

### Example 2

![Example 2 Matrix](https://assets.leetcode.com/uploads/2020/10/05/mat2.jpg)

```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```

---

## Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-10⁴ <= matrix[i][j], target <= 10⁴`

---

## My Solution

### Current Implementation: Nested Binary Search (Row-level & Column-level)

A layered binary search approach where an outer binary search narrows down candidate rows while an inner binary search probes the columns of the selected row.

#### How It Works

1. **Outer Row Search (`while (left <= right)`):**
   - Initialize `left = 0` and `right = matrix.length - 1`.
   - Calculate candidate row index: `mid = left + Math.floor((right - left) / 2)`.

2. **Inner Column Search (`while (l <= r)`):**
   - For the current row `matrix[mid]`, initialize `l = 0` and `r = matrix[mid].length - 1`.
   - Compute column midpoint: `m = l + Math.floor((r - l) / 2)`.
   - If `matrix[mid][m] === target`, return `true` immediately.
   - If `matrix[mid][m] > target`, shift left: `r = m - 1`.
   - Otherwise, shift right: `l = m + 1`.

3. **Row Boundary Adjustment:**
   - If the target is not found in the inner binary search, compare `target` against `matrix[mid][m]` to adjust the outer search space:
     - If `target <= matrix[mid][m]`, eliminate lower rows: `right = mid - 1`.
     - Otherwise, eliminate upper rows: `left = mid + 1`.

4. **Return Result:**
   - If `left > right` without locating the value, return `false`.

#### Complexity Analysis

- **Time Complexity:** $O(\log m \cdot \log n)$
  - Outer loop performs binary search across $m$ rows in $O(\log m)$ steps.
  - At each row visited, an inner binary search runs across $n$ columns in $O(\log n)$ steps.
  - Overall time: $O(\log m \cdot \log n)$.
- **Space Complexity:** $O(1)$
  - Uses only scalar pointer variables (`left`, `right`, `mid`, `l`, `r`, `m`), requiring constant auxiliary space.

---

## Optimal Approaches

### Approach 1: Virtual 1D Array Flattening ($O(\log(m \cdot n))$)

Because every row is sorted and the first element of any row is strictly greater than the last element of the preceding row, the 2D matrix can be treated as a single sorted 1D array of length $m \times n$.

#### Key Intuition

1. **Index Mapping:**
   - A virtual 1D index `idx` in the range $[0, m \times n - 1]$ corresponds directly to 2D coordinates:
     $$\text{row} = \left\lfloor \frac{\text{idx}}{n} \right\rfloor, \quad \text{col} = \text{idx} \pmod n$$
2. **Single Binary Search:**
   - Initialize `left = 0` and `right = m * n - 1`.
   - Calculate `mid = left + Math.floor((right - left) / 2)`.
   - Retrieve element `val = matrix[Math.floor(mid / n)][mid % n]`.
   - Compare `val` with `target`:
     - If `val === target`, return `true`.
     - If `val < target`, `left = mid + 1`.
     - If `val > target`, `right = mid - 1`.

#### Complexity

- **Time Complexity:** $O(\log(m \cdot n))$
  - Single binary search over $m \cdot n$ elements.
- **Space Complexity:** $O(1)$
  - No matrix flattening or extra data structures required.

```javascript
var searchMatrixOptimal = function(matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0, right = m * n - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const val = matrix[Math.floor(mid / n)][mid % n];

        if (val === target) return true;
        if (val < target) left = mid + 1;
        else right = mid - 1;
    }

    return false;
};
```

---

### Approach 2: Two-Phase Binary Search ($O(\log m + \log n)$)

Divide the search into two distinct, sequential binary searches:

1. **Phase 1 (Find Row):** Binary search across row boundaries to find the single row where `matrix[row][0] <= target <= matrix[row][n - 1]`. Takes $O(\log m)$.
2. **Phase 2 (Search Row):** Standard binary search within that identified row. Takes $O(\log n)$.

#### Complexity

- **Time Complexity:** $O(\log m + \log n) = O(\log(m \cdot n))$
- **Space Complexity:** $O(1)$

---

## Stats

| Accepted | Submissions | Acceptance Rate |
|---|---|---|
| 3,144,708 | 5,791,359 | 54.3% |

---

## Similar Questions

| Problem | Difficulty |
|---|---|
| Search a 2D Matrix II | Medium |
| Count Negative Numbers in a Sorted Matrix | Easy |

---

## Implementation

See [SearchA2DArray.js](./SearchA2DArray.js) for the JavaScript implementation.
