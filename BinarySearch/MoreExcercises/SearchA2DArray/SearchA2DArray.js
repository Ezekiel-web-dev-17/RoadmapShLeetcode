/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 3) {
    let left = 0, right = matrix.length - 1, mid = 0;

    while (left <= right) {
        mid = left + Math.floor((right - left) / 2)
        let l = 0, r = matrix[mid].length - 1, m = 0;

        console.log("overview:", "left:", left, "mid:", mid, "right:", right, "l:", l, "m:", m, "r:", r);

        while (l <= r) {
            m = l + Math.floor((r - l) / 2);
            if (matrix[mid][m] === target) return true;
            else if (matrix[mid][m] > target) r = m - 1;
            else l = m + 1;

            console.log("inner:", "l:", l, "m:", m, "r:", r);
        }

        if (target <= matrix[mid][m]) {
            right = mid - 1;
            console.log("\nright down")
        } else {
            left = mid + 1;
            console.log("\nleft up")
        }

    }

    return false;
};

console.log(searchMatrix());
console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13));
console.log(searchMatrix([[1], [3]], 3));