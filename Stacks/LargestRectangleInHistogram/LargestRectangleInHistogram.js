/**
 * @param {number[]} heights
 * @return {number}
 */
// var largestRectangleArea = function (heights = [2, 1, 5, 6, 2, 3]) {
//   let stack = [], area = 0, stackLastIn = 0;

//   for (let i = 0; i < heights.length; i++) {
//     let rectArea = 0, len = i + 1, high = stack[stackLastIn] ?? heights[i];

//     if (heights[i] !== high) {
//       stackLastIn = i;
//       high = heights[i];

//       if (high > heights[i]) {
//         len = len - stackLastIn;
//       }
//     }

//     rectArea = len * high;
//     area = Math.max(area, rectArea);
//     stack.push(heights[i])
//   }
// };

//    #
//   ##
//   ##
//   ## #
// # ####
// ######
// console.log(largestRectangleArea());
// console.log(largestRectangleArea([4, 2, 0, 3, 2, 5]));
// console.log(largestRectangleArea([3, 6, 5, 7, 4, 8, 1, 0]));
// console.log(largestRectangleArea([1, 1]));
// console.log(largestRectangleArea([2, 1, 2]));
// console.log(largestRectangleArea([0, 9]));
// console.log(largestRectangleArea([1]));
// console.log(largestRectangleArea([2, 4]));
// console.log(largestRectangleArea([1, 2, 2]));
// console.log(largestRectangleArea([1, 2, 3, 4, 5]));

// Game method
// height scan like tetris.

var largestRectangleArea = function (heights = [2, 1, 5, 6, 2, 3]) {
  let points = 0, maxHeight = 0, maxArea = 0, rectangles = [];

  heights.forEach((h) => maxHeight < h ? maxHeight = h : maxHeight);

  while (points < maxHeight) {
    points += 1;

    for (let i = 0; i < heights.length; i++) {
      let curr_height = heights[i], rects = [points];
      if (heights[i] > 0 && (heights[i - 1] === 0 || heights[i + 1] === 0)) rects.push(i, i + 1);

      if (heights[i] >= 1) {
        heights[i] = curr_height - 1;
      }

      rectangles.push(rects);
    }

    console.log("\nAt", points, "Points:\n", rectangles, "\nHeights\n", heights);
  }

  return rectangles;
}
console.log(largestRectangleArea());