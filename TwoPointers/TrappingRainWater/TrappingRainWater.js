/**
 * @param {number[]} height
 * @return {number}
 */

var trap = function (height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) {
  let total = 0,
    left = 0,
    right = 1;

  while (left < right) {
    // console.log(left, right, height[left], height[right]);
    for (let i = left + 1; i < height.length; i++) {
      let max = height[left];

      if (max < height[i]) {
        max = height[i];
        // console.log("less");
        right = i;
        break;
      } else if (max === height[i]) {
        right = i;
        break;
      }

      // console.log("maxing");
    }

    console.log(left, right);

    if (right - left > 1) {
      // console.log("hello world", right - left);
      let diff = right - left,
        h = left > right ? height[right] : height[left],
        tot = (diff - 1) * h;
      // console.log("tot:", tot, "h:", h);

      for (i = 1; i < diff; i++) {
        // console.log("tots: ", tot, "curr: ", height[left + i], "i:", i);
        tot -= height[left + i];
      }

      total += tot;
    }

    left = right;
    height.length - 1 > right ? right++ : right;
    console.log("total:", total);
  }

  return total;
};

console.log(trap()); // 6
console.log(trap([4, 2, 0, 3, 2, 5])); // 9

/*

# 

##
# 

# 
###
##
# 
##
#


// //////////////////////////////
####
##

###
##
#####
*/
