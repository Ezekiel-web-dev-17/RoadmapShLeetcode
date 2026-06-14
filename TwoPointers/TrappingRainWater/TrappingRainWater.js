/**
 * @param {number[]} height
 * @return {number}
 */

var trap = function (height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) {
  let total = 0;

  while (height.length) {
    let left = 0,
      right = 1;

    // reverse hieghts if the first element is greater than the last element, so we can start from the left
    if (height[0] > height[height.length - 1]) height.reverse();

    for (let i = left + 1; i < height.length; i++) {
      let max = height[left];

      if (max < height[i]) {
        max = height[i];
        right = i;
        break;
      } else if (max === height[i]) {
        right = i;
        break;
      }
    }

    if (right - left > 1) {
      let diff = right - left,
        h = left > right ? height[right] : height[left],
        tot = (diff - 1) * h;

      for (i = 1; i < diff; i++) {
        tot -= height[left + i];
      }

      total += tot;
    }

    height = height.slice(right);
  }

  return total;
};

console.log(trap()); // 6
console.log(trap([4, 2, 3])); // 1
console.log(trap([4, 2, 0, 3, 2, 5])); // 9
console.log(
  trap([
    6, 4, 2, 0, 3, 2, 0, 3, 1, 4, 5, 3, 2, 7, 5, 3, 0, 1, 2, 1, 3, 4, 6, 8, 1,
    3,
  ]),
); // 83
