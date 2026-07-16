/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits = "239") {
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
    if (curr.length === digits.length) {
      result.push([...curr].join(""));
      return;
    }

    const letters = HASH[digits[i]];
    for (const letter of letters) {
      curr.push(letter);
      backtrack(i + 1);
      curr.pop();
    }
  }

  backtrack(0);

  return result;
};

console.log(letterCombinations());
console.log(letterCombinations("2"));
