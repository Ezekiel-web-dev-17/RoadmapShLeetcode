/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// This implementation sorts the array first so a two-pointer scan becomes possible.
// The current control flow is trying to move left and right pointers around a fixed i.
// Note: the debug logs are useful while iterating on the approach, but they are not part of the final answer.
var threeSum = function (nums = [-1, 0, 1, 2, -1, -4]) {
  nums.sort((a, b) => a - b);
  console.log(nums);

  let i = 0,
    answer = [],
    left = i + 1,
    right = nums.length - 1;

  while (left < right && i <= nums.length - 2) {
    // Compare the current pair against the fixed value at nums[i].
    const sum = nums[left] + nums[right],
      diff = nums[i] - sum;

    if (diff < 0) {
      // The pair sum is too large, so move the search window inward.
      if (left === right - 1) {
        right--;
        left = i + 1;
      } else if (left + 1 === i) {
        left += 2;
      } else left++;
    } else if (diff > 0) {
      // The pair sum is too small, so move the right pointer left.
      if (left === right - 1) {
        left++;
        right = nums.length - 1;
      } else if (right - 1 === i) {
        right -= 2;
      } else right--;
    } else if (diff === 0) {
      // A matching triplet has been found.
      answer.push([nums[i], left, right]);
    }

    console.log("left: ", left, "right: ", right, "sum: ", sum, "diff: ", diff);

    if (right === left && !answer.length) {
      left = i;
      i++;
      right = nums.length - 1;
      console.log(nums[i], left, right, i <= nums.length - 2);
    }
  }

  console.log(answer);
};

threeSum();
