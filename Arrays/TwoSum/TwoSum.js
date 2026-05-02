/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

var twoSum = function (nums = [2, 7, 11, 15], target = 18) {
  const values = {};
  for (let i = 0; i <= nums.length; i++) {
    if (Object.hasOwn(values, nums.indexOf(target - nums[i]))) {
      return [nums.indexOf(target - nums[i]), i];
    }

    values[i] = target - nums[i];
  }
};

console.log(twoSum((nums = [3, 3]), (target = 6)));
