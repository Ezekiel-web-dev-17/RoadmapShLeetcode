/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function (s = "()[]{}") {
  let open = ["[", "{", "("], // array of open brackets.
    map = {
      "[": "]",
      "{": "}",
      "(": ")",
    }, // to map the openings to their respective close brackets.
    stack = s.split(""), // stack of characters.
    tmpStack = []; // temporary stack of open braces.

  while (stack.length > 0) {
    // store only open braces in stack
    if (open.includes(stack[0])) {
      tmpStack.push(stack[0]);
      stack.splice(0, 1); // remove from stack after storage in tmpStack.
      continue;
    }

    if (map[tmpStack[tmpStack.length - 1]] !== stack[0]) {
      // to determine if they match.
      return false;
    } else {
      tmpStack.pop(); // remove brace from tmpStack since the respective close is found.
    }

    stack.splice(0, 1); // ultimately remove the brace since respective open is not last in tmpStack.
  }

  return tmpStack.length === 0;
};

console.log(isValid()); // true
console.log(isValid("()")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false
console.log(isValid("([])")); // true
console.log(isValid("({{{{}}}))")); // false
console.log(isValid("()))")); // false
