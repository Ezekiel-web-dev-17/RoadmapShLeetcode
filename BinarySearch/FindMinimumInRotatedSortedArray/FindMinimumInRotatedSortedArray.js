/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums = [4, 5, 6, 7, 0, 1, 2]) {
    let left = 0, right = nums.length - 1, mid = left + Math.floor((right - left) / 2);

    while (left <= right) {
        mid = left + Math.floor((right - left) / 2);

        if (left === right) return nums[mid];
        else if (nums[mid] > nums[right]) left = mid + 1;
        else right = mid;
    }

    return -1;
};

var finder = function (nums = [4, 5, 6, 7, 0, 1, 2]) {
    return Math.min(...nums);
}

// console.log(findMin());
// console.log(findMin([3, 4, 5, 1, 2]));
// console.log(findMin([11, 13, 15, 17]));
console.time("Binary")
console.log(findMin());
console.timeEnd("Binary")
console.time("linear")
console.log(finder());
console.timeEnd("linear")