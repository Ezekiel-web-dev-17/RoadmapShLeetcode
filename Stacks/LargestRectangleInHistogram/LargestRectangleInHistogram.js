/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights = [2, 1, 5, 6, 2, 3]) {
  let stack = [heights[0]],
    max = heights[0],
    start = 0;

  for (let i = 1; i < heights.length; i++) {
    if (heights[i] >= stack[stack.length - 1]) {
      stack.push(heights[i]);
    } else {
      stack = [heights[i]];
    }

    for (let j = 0; j < stack.length; j++) {
      max = Math.max(max, stack[j] * (stack.length - j), stack[j]);
    }
  }

  return max;
};
console.log(largestRectangleArea());
console.log(largestRectangleArea([2, 1, 2]));
console.log(largestRectangleArea([0, 9]));
console.log(largestRectangleArea([1]));
console.log(largestRectangleArea([2, 4]));
console.log(largestRectangleArea([1, 2, 2]));
console.log(largestRectangleArea([1, 2, 3, 4, 5]));

// #
// ##
// ###
// ####
// #####
