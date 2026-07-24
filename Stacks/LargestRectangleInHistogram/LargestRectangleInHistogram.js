/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights = [2, 1, 5, 6, 2, 3]) {
  let stack = [[0, heights[0], 0, recursion(heights[0], 0, +1)]],
    max = 0;

  for (let i = 1; i < heights.length; i++) {
    let startIndex = i;
    if (heights[i] < stack[stack.length - 1][1]) {
      // pop the outermost value and it's index from the stack storing the area if greater than max
      let popped = stack.pop(),
        poppedArea = popped[1] * (popped[2] - popped[0] + 1);

      max = Math.max(poppedArea, max);

      // recursively check if currHieght has a value less than it to the back setting the start index to the value before the lesser height or 0 if no lesser height.
      startIndex = recursion(heights[i], i);
    }

    stack.push([startIndex, heights[i], i, recursion(heights[i], i, +1)]);
  }

  function recursion(curr, index, direction = -1) {
    if (index === 0 && direction === -1) return index;
    else if (index === heights.length - 1) return heights.length;

    if (heights[index] >= curr)
      return recursion(curr, (index += direction), direction);
    else return index;
  }

  stack.forEach((area) => {
    let width = area[3] - area[0];
    console.log(width * area[1], area);
    max = Math.max(max, width * area[1]);
  });

  return max;
};

console.log(largestRectangleArea());
console.log(largestRectangleArea([3, 6, 5, 7, 4, 8, 1, 0]));
console.log(largestRectangleArea([1, 1]));
console.log(largestRectangleArea([2, 1, 2]));
console.log(largestRectangleArea([0, 9]));
console.log(largestRectangleArea([1]));
console.log(largestRectangleArea([2, 4]));
console.log(largestRectangleArea([1, 2, 2]));
console.log(largestRectangleArea([1, 2, 3, 4, 5]));
