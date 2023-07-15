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
    Math.round(
      operators[operator](parseFloat(firstNumber), parseFloat(secondNumber)) *
        1000
    ) / 1000
  );
};

//set variables
const numbers = document.querySelectorAll(".number");
const operatorOptions = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");
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
    if (firstValue === "0" && currentNumber === "0") {
      return;
    }
    firstValue += currentNumber;
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  } else if (currentOperator) {
    if (secondValue === "0") {
      return;
    }
    secondValue += parseInt(currentNumber);
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
}

//Click functions for all the operators
function chosenOperator(clickOperator) {
  let clickedOperator = clickOperator;

  //   if (clickOperator === "-") {
  //     currentOperator = clickOperator;
  //     return (currentDisplay.innerHTML =
  //       firstValue + currentOperator + secondValue);
  //   }
  if ((+firstValue || firstValue === "0") && !secondValue) {
    currentOperator = clickedOperator;
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  } else if (
    (+firstValue || firstValue === "0") &&
    (+secondValue || secondValue === "0")
  ) {
    const result = operate(firstValue, currentOperator, secondValue);
    previousNumber.innerHTML = firstValue + currentOperator + secondValue;
    firstValue = result;
    secondValue = "";
    currentOperator = clickedOperator;
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
}

//Click function for decimal

function getDecimal() {
  if (!secondValue && firstValue) {
    firstValue += ".";
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  } else if (secondValue) {
    secondValue += ".";
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
}

//Click function for results
function getResult() {
  if (!currentOperator || !secondValue) {
    previousNumber.innerHTML = firstValue;
  } else {
    const result = operate(firstValue, currentOperator, secondValue);
    previousNumber.innerHTML = firstValue + currentOperator + secondValue;
    currentNumber.innerHTML = result;
    firstValue = "";
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
  currentNumber.innerHTML = "";
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
    firstValue = firstValue ? firstValue : "";
    if (firstValue === "") {
      return (currentDisplay.innerHTML = "0");
    }
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
decimal.addEventListener("click", getDecimal);
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
    e.key === "X" ||
    e.key === "/"
  ) {
    chosenOperator(e.key.toLowerCase());
  } else if (e.key === "Escape") {
    resetCalc();
  } else if (e.key === ".") {
    getDecimal();
  }
}

//when spamming equal after total, prevDisplay disappear
//user cant enter negative value
