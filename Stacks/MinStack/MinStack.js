var MinStack = function () {
  this.stack = [];
};

/**
 * @param {number} value
 * @return {void}
 */
MinStack.prototype.push = function (value) {
  this.stack.push(value);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  let min = this.top();

  for (let i = 0; i < this.stack.length; i++) {
    if (min > this.stack[i]) {
      min = this.stack[i];
    }
  }

  return min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(value)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // return -3
minStack.pop();
console.log(minStack.top()); // return 0
console.log(minStack.getMin()); // return -2
