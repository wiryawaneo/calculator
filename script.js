const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

console.log("add", add(1, 2));
console.log("subtract", subtract(3, 1));
console.log("multiply", multiply(3, 5));
console.log("divide", divide(5, 2));

const firstNumber = 0;
const operators = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};
const secondNumber = 0;

const operate = (firstNumber, operator, secondNumber) => {
  return operators[operator](firstNumber, secondNumber);
};
