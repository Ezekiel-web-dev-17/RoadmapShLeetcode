/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s = "()[]{}") {
  let open = ["[", "{", "("],
    map = {
      "[": "]",
      "{": "}",
      "(": ")",
    };

  let stack = s.split(""), // stack of characters.
    tmpStack = [],
    remnant = [];

  stack = stack.map((stk) => {
    if (open.includes(stk)) {
      tmpStack.push(stk);
    }

    return stk;
  });

  const a = stack.length - 1;

  for (let i = a; i >= 0; i--) {
    if (map[tmpStack[tmpStack.length - 1]] === stack[stack.length - 1]) {
      stack.pop();
      tmpStack.pop();
    } else if (open.includes(stack[i])) {
      stack.pop();
    } else if (tmpStack[tmpStack.length - 1] === stack[stack.length - 1]) {
      stack.pop();
    } else {
      remnant.push(stack.pop());
    }
  }

  for (let b = 0; b < tmpStack.length; b++) {
    if (map[tmpStack[tmpStack.length - 1]] === remnant[remnant.length - 1]) {
      tmpStack.pop();
      remnant.pop();
    }
  }

  return tmpStack.length === 0 && remnant.length === 0 ? true : false;
};

console.log(isValid());
console.log(isValid("()"));
console.log(isValid("(]"));
console.log("#######################");
console.log(isValid("([)]"));
console.log("!!!!!!!!!!!!!!!!!!!!!!!");
console.log(isValid("([])"));
console.log(isValid("({{{{}}}))")); // false
console.log(isValid("()))")); // false
