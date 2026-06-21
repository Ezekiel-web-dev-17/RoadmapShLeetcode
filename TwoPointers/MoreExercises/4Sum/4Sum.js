/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums = [1, 0, -1, 0, -2, 2], target = 0) {
  // Sort the array nums.
  nums.sort((a, b) => a - b);

  let res = []; // to store our results.

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      let left = 0,
        right = nums.length - 1;

      // ensure uniqueness and that left is less than the value of right.
      while (
        left < right &&
        i !== left &&
        i !== right &&
        i !== j &&
        j !== left &&
        j !== right
      ) {
        if (nums[left] + nums[right] + nums[i] + nums[j] < target) {
          left++; // move left handle
        } else if (nums[left] + nums[right] + nums[i] + nums[j] > target) {
          right--; // move right handle
        } else {
          res.push(
            [nums[left], nums[right], nums[i], nums[j]].sort((a, b) => a - b),
          ); // store result

          // move the next interation of values.
          left++;
          right--;
        }
      }
    }
  }

  // remove duplicates in results
  const unique2DRes = Array.from(
    new Set(res.map(row => JSON.stringify(row)))
  ).map(str => JSON.parse(str));


  return unique2DRes;
};

console.log(fourSum()); // [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
console.log(fourSum(nums = [2, 2, 2, 2, 2], target = 8)); // [[2,2,2,2]]
