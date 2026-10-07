/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1 = [1, 3], nums2 = [2]) {
    const nums = [...nums1, ...nums2].sort((a, b) => a - b), len = nums.length;
    let right = nums.length - 1, left = 0, mid = left + Math.floor((right - left) / 2);

    return len % 2 ? nums[mid] : (nums[mid] + nums[mid + 1]) / 2;
};

console.log(findMedianSortedArrays());
console.log(findMedianSortedArrays([1, 2], [3, 4]));    