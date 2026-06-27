/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s = "()[]{}") {
  let map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  if (s.length % 2 !== 0) {
    return false;
  }

  let stack = s.split(""),
    tmpStack = [],
    i = stack.length - 1;

  while (i > 1) {
    tmpStack.push(stack[stack.length - 1]);
    stack.pop();

    if (map[stack[stack.length - 1]] === tmpStack[tmpStack.length - 1]) {
      tmpStack.pop();
      stack.pop();
    }

    i--;
  }

  console.log(stack, tmpStack);
  if (stack.length > 1) {
    tmpStack.push(stack[stack.length - 1]);
    stack.pop();
  }

  return map[stack[stack.length - 1]] === tmpStack[tmpStack.length - 1]
    ? true
    : false;
};

console.log(isValid());
console.log(isValid("()"));
console.log(isValid("(]"));
console.log(isValid("([])"));
console.log(isValid("({{{{}}}))")); // false
console.log(isValid("()))")); // false
