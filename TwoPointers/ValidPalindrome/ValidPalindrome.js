/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s = "A man, a plan, a canal: Panama") {
  const word = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""),
    half = Math.floor(word.length / 2);

  for (let i = 0, j = word.length - 1; i < half; i++, j--) {
    if (word[i] === word[j]) {
      continue;
    } else return false;
  }

  return true;
};

console.log(isPalindrome());
