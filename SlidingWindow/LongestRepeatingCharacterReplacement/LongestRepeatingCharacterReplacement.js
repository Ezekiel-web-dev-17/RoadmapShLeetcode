/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s = "AABABBA", k = 1) {
    const firstLetter = s[0], replacer = s.split("").findIndex((str) => str !== firstLetter);
    let total = 0, max = 0, start = 0;

    while (k) {
        s = s.replace(firstLetter, s[replacer]);
        k--;
    }

    return s;
};

console.log(characterReplacement())