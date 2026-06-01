/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums = [-1, 0, 1, 2, -1, -4]) {
  nums.sort();
  let i = 0,
    j,
    k,
    mapper = new Map(),
    answer = [];

  for (let i = 0; i < nums.length / 2; i++) {
    for (let j = nums.length - 1; j >= 0; j--) {
      for (let k = 0; k < nums.length; k++) {
        if (i !== j && i !== k && j !== k) {
          let complement = 0 - nums[k];
          mapper[k] = complement;

          if (nums[i] + nums[j] === complement) {
            let ans = [nums[i], nums[j], nums[k]].toSorted();

            answer.push(ans);
          }
        }
      }
    }
  }

  return answer;
};

console.log(threeSum());
