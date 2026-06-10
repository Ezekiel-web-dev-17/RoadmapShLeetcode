/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function (nums = [-1, 0, 1, 2, -1, -4]) {
  // 1. Sort the array in ascending order.
  nums.sort((a, b) => a - b);

  // 2. Create an empty list called result.
  let result = [];

  // 3. Iterate through the sorted array using a `for` loop.
  for (let i = 0; i < nums.length - 1; i++) {
    // Skip duplicate values for the fixed element
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // 4. Initialize a `left` pointer to `i + 1` and a `right` pointer to `nums.length - 1`.
    let left = i + 1,
      right = nums.length - 1;

    // 5. While `left` is less than `right`:
    while (left < right) {
      // Calculate the sum of the three numbers
      const total = nums[i] + nums[left] + nums[right];

      // If the sum is equal to zero, we have found a triplet.
      if (total === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // 6. Skip duplicate values for the left and right pointers
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (total < 0) {
        left++; // sum too small — need a larger number
      } else {
        right--; // sum too large — need a smaller number
      }
    }
  }

  return result;
};

console.log(threeSum()); // [[-1,-1,2],[-1,0,1]]
console.log(threeSum([0, 0, 0])); // [[0,0,0]]
console.log(threeSum([2, -3, 0, -2, -5, -5, -4, 1, 2, -2, 2, 0, 2, -4, 5, 5, -10]));
