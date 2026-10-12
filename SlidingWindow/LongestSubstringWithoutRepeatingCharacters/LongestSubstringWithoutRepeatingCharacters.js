/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s = "abcabcbb") {
    let max = '', subString = [];

    for (let right = 0; right < s.length; right++) {
        while (subString.includes(s[right])) subString.shift();

        subString.push(s[right]);
        max = max.length < subString.length ? subString.join('') : max;
    }

    return max.length;
};

console.log(lengthOfLongestSubstring()); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log(lengthOfLongestSubstring("mq")); // 2
console.log(lengthOfLongestSubstring("1R1T7")); // 4
console.log(lengthOfLongestSubstring("cdcda")); // 3
console.log(lengthOfLongestSubstring("i-y}}&iaZ")); // 5