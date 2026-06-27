/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s = "()[]{}") {
  let opens = ["{", "(", "["],
    map = {
      "]": "[",
      "}": "{",
      ")": "(",
    };

  let stack = s.split(""), // stack of characters.
    tmpStack = [];

  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);

    if (opens.includes(char)) {
      // When you encounter an opening bracket, push it to the top of the stack.
      stack = [...stack.filter((stc) => stc !== char)];
      tmpStack.push(char);
    } else if (tmpStack.length && map[char] === tmpStack[tmpStack.length - 1]) {
      //   When you encounter a closing bracket, check if the top of the stack was the opening for it. If yes, pop it from the stack. Otherwise, return false.
      stack = [...stack.filter((stc) => stc)];
      tmpStack.pop();
      console.log("tmpStack", tmpStack);
    }
  }

  return tmpStack.length ? false : true;
};

console.log(isValid());
console.log(isValid("()"));
console.log(isValid("(]"));
console.log(isValid("([])"));
console.log(isValid("({{{{}}}))")); // false
console.log(isValid("()))")); // false
