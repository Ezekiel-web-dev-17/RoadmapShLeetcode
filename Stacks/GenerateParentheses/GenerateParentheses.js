/**
 * @param {number} n
 * @return {string[]}
 */

var generateParenthesis = function (n = 3) {
  const length = n * 2;
  let answer = [];

  function backtrack(currString, openCount, closeCount) {
    if (currString.length === length) {
      answer.push(currString);
      return;
    }

    if (openCount < n) backtrack(currString + "(", openCount + 1, closeCount);
    if (openCount > closeCount)
      backtrack(currString + ")", openCount, closeCount + 1);
  }

  backtrack("", 0, 0);
  return answer;
};

console.log(generateParenthesis(5));
