/**
 * @param {number[]} height
 * @return {number}
 */

var maxArea = function (height = [1, 8, 6, 2, 5, 4, 8, 3, 7]) {
  let left = 0,
    right = height.length - 1,
    result = 0;

  while (left < right) {
    // Water is limited by the shorter of the two walls
    const area =
      (height[left] < height[right] ? height[left] : height[right]) *
      (right - left);

    if (area > result) result = area;

    // Move the shorter wall inward — the taller wall can never improve the area
    if (height[left] < height[right]) left++;
    else right--;
  }

  return result;
};

console.log(maxArea()); // 49
console.log(maxArea([1, 1])); // 1
