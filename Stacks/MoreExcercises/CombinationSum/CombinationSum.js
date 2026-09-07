/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates = [2, 3, 6, 7], target = 7) {
  let curr = [],
    result = [];

  function sum(arr = []) {
    let initVal = 0;

    arr.forEach((a) => (initVal += a));

    return initVal;
  }

  /*
  function backtrack(i) {
    if (i >= candidates.length) return;
    if (sum(curr) === target) {
      result.push([...curr]);
      curr = [];
      return;
    }

    console.log(curr);
    curr.push(candidates[i]);

    if (sum(curr) > target) {
      curr.pop();
      curr.pop();
      backtrack(i + 1);
    }
    
    backtrack(i + 1);
  }
  */

  function backtrack(i) {

    if (i > candidates.length - 1) return;

    if (sum(curr) === target) {
      result.push([...curr]);
      return;
    }

    if (sum(curr) > target) {
      curr.pop();

      console.log("first: ", curr);
      backtrack(i + 1);
      return;
    }

    curr.push(candidates[i]);

    console.log(i, curr, candidates[i]);
    backtrack(i);
  }


  backtrack(0);

  return result;
};

console.log(combinationSum());
// console.log(combinationSum([2, 3, 5], 8));
// console.log(combinationSum([2], 1));

// if (i > candidates.length - 1) return;

// if (sum(curr) === target) {
//   result.push([...curr]);
//   return;
// }

// if (sum(curr) > target) {
//   curr.pop();

//   console.log("first: ", curr);
//   backtrack(i + 1);
//   return;
// }

// curr.push(candidates[i]);

// console.log(i, curr, candidates[i]);
// backtrack(i);
