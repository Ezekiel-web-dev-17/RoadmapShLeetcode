/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const MAX_INDEX = nums.length - 1,
    sortedNums = nums.toSorted((a, b) => a - b);

  for (let i = 0; i < MAX_INDEX; i++) {
    if (sortedNums[i] === sortedNums[i + 1]) return true;
  }

  return false;
};

console.log(containsDuplicate([1, 2, 3, 4]));
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]));
