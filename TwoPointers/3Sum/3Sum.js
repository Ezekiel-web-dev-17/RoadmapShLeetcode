/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums = [-1, 0, 1, 2, -1, -4]) {
  nums.sort((a, b) => a - b);
  let i = 0,
    j = 1,
    k = 2,
    answers = [];

  while (
    i < nums.length - 1 &&
    nums[i] !== nums[j] &&
    nums[j] !== nums[k] &&
    nums[i] !== nums[k]
  ) {
    if (nums[i] + nums[j] + nums[k] < 0) {
      console.log("plus", nums, nums[k], k);
      k++;
    }

    if (nums[i] + nums[j] + nums[k] > 0) {
      console.log("minus");
      k--;
    }

    if (nums[i] + nums[j] + nums[k] === 0) {
      console.log("good");
      answers.push([nums[i], nums[j], nums[k]]);
    }

    if (j === nums.length - 1) {
      i++;
      j = nums.length - i;
      k = nums.length - j;
      console.log(i, j, k);
    } else if (k === nums.length - 1) {
      j++;
      k = nums.length - j;
      console.log("k is above", k, j);
    }
  }

  return answers;
};

console.log(threeSum());
