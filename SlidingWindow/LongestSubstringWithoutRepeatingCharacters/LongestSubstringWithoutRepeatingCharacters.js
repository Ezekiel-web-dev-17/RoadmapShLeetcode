/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s = "abcabcbb") {
    let left = 0, right = left + 1, maxSubstring = s.substring(0, 1);

    while (right <= s.length) {
        maxSubstring = maxSubstring.length < right - left ? s.substring(left, right) : maxSubstring;

        if (maxSubstring.includes(s[right])) left = right;

        right++;
    }

    return maxSubstring.length;
};

console.log(lengthOfLongestSubstring()); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log(lengthOfLongestSubstring("mq")); // 2
console.log(lengthOfLongestSubstring("1R1T7")); // 4
console.log(lengthOfLongestSubstring("cdcda")); // 3