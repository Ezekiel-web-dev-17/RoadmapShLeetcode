/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/*
  Pseudocode algorithm for solving 3Sum:

  1. Sort the input array.
  2. Create an empty list called result.
  3. Loop i from 0 to nums.length - 3:
    - If i > 0 and nums[i] is the same as nums[i - 1], skip it to avoid duplicate triplets.
    - Set left = i + 1.
    - Set right = nums.length - 1.
    - While left < right:
      - Compute total = nums[i] + nums[left] + nums[right].
      - If total === 0:
        - Add [nums[i], nums[left], nums[right]] to result.
        - Move left forward and right backward.
        - Skip any duplicate values on both sides.
      - If total < 0:
        - Move left forward to increase the sum.
      - If total > 0:
        - Move right backward to decrease the sum.
  4. Return result.
*/

var threeSum = function (nums = [-1, 0, 1, 2, -1, -4]) {
  // 1. Sort the input array.
  nums.sort((a, b) => a - b);

  // 2. Create an empty list called result.
  let result = [];

  // Loop i from 0 to nums.length - 2
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      i++;
      continue;
    }

    let left = i + 1,
      right = nums.length - 1;

    while (left < right) {
      let total = nums[i] + nums[left] + nums[right];

      if (total === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
      } else if (total < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  const uniqueResult = Array.from(
    new Set(result.map((item) => JSON.stringify(item))),
  ).map((item) => JSON.parse(item));

  return uniqueResult;
};

console.log(threeSum());
console.log(
  threeSum([2, -3, 0, -2, -5, -5, -4, 1, 2, -2, 2, 0, 2, -4, 5, 5, -10]),
);
console.log(threeSum([0, 0, 0]));
