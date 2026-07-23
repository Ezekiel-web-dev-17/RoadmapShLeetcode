/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights = [2, 1, 5, 6, 2, 3]) {
  let stack = [],
    max = 0,
    start = 0;

  for (let i = 0; i < heights.length; i++) {
    stack.push(heights[i]);
    lastInStack = stack.slice(-2, -1).pop() ?? 0;
    h = Math.min(heights[i], lastInStack);
    s = start ? i - start : i;
    max = Math.max(max, h * (s + 1));
    if (max <= heights[i]) {
      stack = [heights[i]];
      start = i;
      max = heights[i];
    }
    if (lastInStack < heights[i]) {
      stack = [lastInStack, heights[i]];
      start = i;
    }

    console.log(stack, max, start, i, heights[i]);
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
