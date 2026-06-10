/**
 * @param {number[]} height
 * @return {number}
 */

var trap = function (height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) {
  let left = 0,
    right = height.length - 1,
    maxLeft = 0,
    maxRight = 0,
    total = 0;

  while (left < right) {
    if (height[left] <= height[right]) {
      // Left side is the bottleneck — water level determined by maxLeft
      if (height[left] >= maxLeft) maxLeft = height[left];
      else total += maxLeft - height[left];
      left++;
    } else {
      // Right side is the bottleneck — water level determined by maxRight
      if (height[right] >= maxRight) maxRight = height[right];
      else total += maxRight - height[right];
      right--;
    }
  }

  return total;
};

console.log(trap()); // 6
console.log(trap([4, 2, 0, 3, 2, 5])); // 9