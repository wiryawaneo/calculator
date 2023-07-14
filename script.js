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
  return (
    Math.round(operators[operator](firstNumber, secondNumber) * 1000) / 1000
  );
};

//set variables
const numbers = document.querySelectorAll(".number");
const operatorOptions = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const remove = document.querySelector(".delete");
const currentNumber = document.getElementById("currentDisplay");
const previousNumber = document.getElementById("prevDisplay");
// const currentResult = firstValue + currentOperator + secondValue;
firstValue = "";
secondValue = "";
currentOperator = "";

//Click functions for all the numbers
function chosenNumber(clickedNumber) {
  let currentNumber = parseInt(clickedNumber);
  if (!currentOperator) {
    firstValue += currentNumber;
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  } else if (currentOperator) {
    secondValue += parseInt(currentNumber);
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
}

//Click functions for all the operators
function chosenOperator(clickOperator) {
  let clickedOperator = clickOperator;
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
}

//Click function for results
function getResult() {
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
    firstValue = result.toString();
    currentOperator = "";
    secondValue = "";
    return;
  }
}

//reset calculator
function resetCalc() {
  firstValue = "";
  secondValue = "";
  currentOperator = "";
  previousNumber.innerHTML = "";
  currentNumber.innerHTML = 0;
  return;
}
//remove value function
function removeValue() {
  if (secondValue) {
    console.log("delete second");
    secondValue = secondValue.toString().slice(0, -1);
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  } else if (currentOperator) {
    console.log("delete op");
    currentOperator = currentOperator.toString().slice(0, -1);
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  } else if (firstValue) {
    firstValue = firstValue.toString().slice(0, -1);
    firstValue = firstValue ? firstValue : 0;
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
}

//click event listeners
numbers.forEach((number) => {
  number.addEventListener("click", (event) =>
    chosenNumber(event.target.innerHTML)
  );
});
operatorOptions.forEach((operatorOption) => {
  operatorOption.addEventListener("click", (event) =>
    chosenOperator(event.target.innerHTML)
  );
});
equal.addEventListener("click", getResult);
clear.addEventListener("click", resetCalc);
remove.addEventListener("click", removeValue);

// //keypress event listeners
window.addEventListener("keydown", getKeyboardInput);

function getKeyboardInput(e) {
  if (!isNaN(e.key)) {
    chosenNumber(e.key);
  } else if (e.key === "=") {
    getResult();
  } else if (e.key === "Backspace") {
    removeValue();
  } else if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "x" ||
    e.key === "/"
  ) {
    chosenOperator(e.key);
  } else if (e.key === "Escape") {
    resetCalc();
  }
}
