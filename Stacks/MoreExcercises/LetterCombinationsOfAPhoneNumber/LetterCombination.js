/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits = "23") {
  const HASH = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  let result = [],
    curr = [];

  function backtrack(i) {
    if (curr === digits.length) {
      return;
    }

    for (let a = 0; a < HASH[digits[0]].length; a++) {
      for (let c = 0; c < HASH[digits[i]].length; c++) {
        curr.push(HASH[digits[0]][a], HASH[digits[i]][c]);
        result.push([...curr].join(""));
        curr = [];
      }
    }

    backtrack(i + 1);
  }

  backtrack(1);

  return result;
};

console.log(letterCombinations("2"));
