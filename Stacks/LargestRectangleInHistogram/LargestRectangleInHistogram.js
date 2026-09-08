/**
 * @param {number[]} heights
 * @return {number}
*/
var largestRectangleArea = function (heights = [2, 1, 5, 6, 2, 3]) {
  let points = 0, maxHeight = 0, maxArea = 0, rectangles = [];

  heights.forEach((h) => maxHeight < h ? maxHeight = h : maxHeight);

  // Extract heights
  while (points < maxHeight) {
    let hClone = [...heights], rects = [];
    points += 1;

    for (let i = 0; i < hClone.length; i++) {
      let curr_height = hClone[i], rect = [points];
      if (curr_height > 0) rect.push(i, i + 1);

      if (hClone[i] >= 1) {
        hClone[i] = curr_height - 1;
      }

      rects.push(rect);
    }
    rectangles.push(rects);
    rects = []

    console.log("\nAt", points, "Points:\n", rectangles, "\nHeights\n", heights, "\nHClones\n", hClone);
    heights = [...hClone]
  }

  // Like in tetris pop all lower boxes and run through like in mario.
  for (let l = 0; l < rectangles.length; l++) {
    // for (let m = 0; m < rectangles[l].length; m++) {
    let row = rectangles[l];
    console.log("ROw:", row)
    let len = 0, start = [];
    row.filter((rw) => rw.length === 3).forEach((r) => {
      let curr_idx = row.indexOf(r);

      if (curr_idx === row.length - 1) {
        console.log("ender", "row:", row, "r:", r, "len:", len, "curr", curr_idx, "start", start)
        len = start[start.length - 1] - start[0] + 1;
      } else if (row[curr_idx + 1][1] === row[curr_idx][2]) {
        console.log("sequence")
        start[start.length - 1] === row[curr_idx][2] ? start.push(row[curr_idx + 1][1]) : start.push(row[curr_idx][1], row[curr_idx + 1][1]);
        len = start[start.length - 1] - start[0];
      } else {
        if (start.length > 0) {
          len = start[start.length - 1] - start[0] + 1;
          console.log("preabrupt")
          maxArea = Math.max(maxArea, r[0] * len);
        } else {
          maxArea = Math.max(maxArea, row[curr_idx][0] * (row[curr_idx][2] - row[curr_idx][1]));
          len = 0;
        }
        console.log("abrupt", "maxArea", maxArea, "row", row)
      }

      maxArea = Math.max(maxArea, r[0] * len);
    })
    // }
  }

  return maxArea;
}

console.log(largestRectangleArea());

//    #
//   ##
//   ##
//   ## #
// # ####
// ######
// console.log(largestRectangleArea());
console.log(largestRectangleArea([4, 2, 0, 3, 2, 5]));
// console.log(largestRectangleArea([3, 6, 5, 7, 4, 8, 1, 0]));
// console.log(largestRectangleArea([1, 1]));
// console.log(largestRectangleArea([2, 1, 2]));
// console.log(largestRectangleArea([0, 9]));
// console.log(largestRectangleArea([1]));
// console.log(largestRectangleArea([2, 4]));
// console.log(largestRectangleArea([1, 2, 2]));
// console.log(largestRectangleArea([1, 2, 3, 4, 5]));

// // Game method
// // height scan like tetris.
