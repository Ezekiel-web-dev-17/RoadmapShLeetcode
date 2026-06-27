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
    tmpStack.push(stack.pop());
    if (
      map[tmpStack[tmpStack.length - 1]] === stack[stack.length - 1] ||
      opens.includes(stack[stack.length - 1])
    )
      tmpStack.pop();
  }

  return tmpStack.length ? false : true;
};

console.log(isValid());
console.log(isValid("()"));
console.log(isValid("(]"));
console.log(isValid("([])"));
console.log(isValid("({{{{}}}))")); // false
console.log(isValid("()))")); // false
