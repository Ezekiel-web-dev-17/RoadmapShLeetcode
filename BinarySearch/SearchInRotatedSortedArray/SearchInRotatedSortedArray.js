/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums = [4, 5, 6, 7, 0, 1, 2], target = 0) {
    const MIN = Math.min(...nums), min_index = nums.indexOf(MIN);
    let mid;

    const binarySearch = (left, right) => {
        mid = 0;
        while (left <= right) {
            mid = left + Math.floor((right - left) / 2);

            if (nums[mid] === target) return mid;
            else if (nums[mid] > target) right = mid - 1;
            else left = mid + 1;
        }

        return nums[mid] === target ? mid : -1;
    }

    let result = binarySearch(0, min_index - 1);

    if (result === -1) return binarySearch(min_index, nums.length - 1);

    return mid;
};


console.log(search()); // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1
console.log(search([1], 0)); // -1
console.log(search([1], 1)); // 0