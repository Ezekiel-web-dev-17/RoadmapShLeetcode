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
    tmpStack = [];

  stack = stack.map((stk) => {
    if (open.includes(stk)) {
      tmpStack.push(stk);
    } else return stk;
  });

  // console.log("stack: ", stack, "tmpStack: ", tmpStack);

  for (let i = stack.length - 1; i >= 0; i--) {
    // console.log(
    //   stack[i],
    //   tmpStack[tmpStack.length - 1],
    //   map[tmpStack[tmpStack.length - 1]],
    //   map[tmpStack[tmpStack.length - 1]] === stack[i],
    // );
    if (
      stack[i] !== undefined &&
      map[tmpStack[tmpStack.length - 1]] === stack[i]
    ) {
      // console.log("first", stack);
      stack[i] = undefined;
      i = s.length;
      // console.log("2nd", stack);
      tmpStack.pop();
    }
  }

  // console.log("stack: ", stack, "tmpStack: ", tmpStack);

  return tmpStack.length ? false : true;
};

console.log(isValid());
console.log(isValid("()"));
console.log(isValid("(]"));
console.log(isValid("([])"));
console.log(isValid("({{{{}}}))")); // false
console.log(isValid("()))")); // false
