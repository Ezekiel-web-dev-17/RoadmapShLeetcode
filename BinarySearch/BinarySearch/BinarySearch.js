/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums = [-1, 0, 3, 5, 9, 12], target = 9) {
    let left = 0, right = nums.length - 1, mid = Math.floor(right / 2), index = -1;

    while (left <= right) {
        mid = Math.floor(((right - left) / 2) + left);
        console.log("Left:", left, "Right:", right, "Mid:", mid, "Index:", index);
        if (nums[mid] === target) { index = mid; break }
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return index;
};

// console.log(search());
// console.log(search([-1, 0, 3, 5, 9, 12], 2));
// console.log(search([5], 5));
console.log(search([0, 1, 2, 4, 5, 6, 7], 3));