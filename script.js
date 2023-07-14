// basic operator functions
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

// //calls a function based on operator called
const operators = {
  "+": add,
  "-": subtract,
  x: multiply,
  "/": divide,
};

// //run operator
const operate = (firstNumber, operator, secondNumber) => {
  return operators[operator](firstNumber, secondNumber);
};

//set variables
const numbers = document.querySelectorAll(".number");
const operatorOptions = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const currentNumber = document.getElementById("currentDisplay");
const previousNumber = document.getElementById("prevDisplay");
firstValue = "";
secondValue = "";
currentOperator = "";

//Click functions for all the numbers
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    let currentNumber = event.target.innerHTML;
    if (!currentOperator) {
      firstValue += currentNumber;
      return (currentDisplay.innerHTML =
        firstValue + currentOperator + secondValue);
    } else if (currentOperator) {
      secondValue += currentNumber;
      return (currentDisplay.innerHTML =
        firstValue + currentOperator + secondValue);
    }
  });
});

//Click functions for all the operators
operatorOptions.forEach((operatorOption) => {
  operatorOption.addEventListener("click", (event) => {
    let clickedOperator = event.target.innerHTML;
    if (firstValue && !secondValue) {
      currentOperator = clickedOperator;
      return (currentDisplay.innerHTML =
        firstValue + currentOperator + secondValue);
    } else if (firstValue && secondValue) {
      const result = operate(
        parseInt(firstValue),
        currentOperator,
        parseInt(secondValue)
      );
      firstValue = result;
      secondValue = "";
      currentOperator = clickedOperator;
      previousNumber.innerHTML = firstValue + currentOperator + secondValue;
      return (currentDisplay.innerHTML =
        firstValue + currentOperator + secondValue);
    }
  });
});

//Click function for results
const result = equal.addEventListener("click", () => {
  if (!currentOperator || !secondValue) {
    previousNumber.innerHTML = firstValue;
  } else {
    const result = operate(
      parseInt(firstValue),
      currentOperator,
      parseInt(secondValue)
    );
    previousNumber.innerHTML = firstValue + currentOperator + secondValue;
    currentNumber.innerHTML = result;
    return;
  }
});

const reset = clear.addEventListener("click", () => {
  firstValue = "";
  secondValue = "";
  currentOperator = "";
  previousNumber.innerHTML = "";
  currentNumber.innerHTML = 0;
  return;
});
