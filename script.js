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
firstValue = "";
secondValue = "";
result = "";
currentOperator = "";

//Click functions for all the numbers
function chosenNumber(clickedNumber) {
  let currentNumber = parseInt(clickedNumber);
  //Does not allow user to put more than one zero for first value
  if (!currentOperator) {
    if (firstValue == "0" && currentNumber == "0") {
      return;
    }
    //String up first value to allow user to enter a string of number
    firstValue += currentNumber;
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  } else if (currentOperator) {
    //does not allow user to put more than one zero for second value
    if (secondValue == "0") {
      return;
    }
    //String up second value to allow user to enter a string of number
    secondValue += parseInt(currentNumber);
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
}

//Click functions for all the operators
function chosenOperator(clickOperator) {
  let clickedOperator = clickOperator;
  if (clickedOperator === "-" && !firstValue && !result) {
    firstValue = "-";
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
  //If user does an operator right after receiving = result...
  if ((result || result == "0") && !firstValue) {
    currentOperator = clickedOperator;
    firstValue = result;
    result = "";
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
  //User's first operator input
  if ((+firstValue || firstValue === "0") && !secondValue) {
    currentOperator = clickedOperator;
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
  //User's second operator input that automatically compiles the result first
  else if (
    (+firstValue || firstValue === "0") &&
    (+secondValue || secondValue === "0")
  ) {
    const opResult = operate(firstValue, currentOperator, secondValue);
    previousNumber.innerHTML = firstValue + currentOperator + secondValue + "=";
    firstValue = opResult;
    secondValue = "";
    currentOperator = clickedOperator;
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
}

//Click function for decimal
//Allow user to put one decimal point per string
function getDecimal() {
  if (!secondValue && !currentOperator && firstValue.includes(".") === false) {
    firstValue += ".";
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  } else if (currentOperator && secondValue.includes(".") === false) {
    secondValue += ".";
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  }
}

//Click function for results
function getResult() {
  if (firstValue) {
    result = "";
  }
  if (result || result === 0) {
    return (previousNumber.innerHTML = result + "=");
  }
  if (!currentOperator || !secondValue) {
    previousNumber.innerHTML = firstValue;
  } else {
    result = operate(firstValue, currentOperator, secondValue);
    previousNumber.innerHTML = firstValue + currentOperator + secondValue + "=";
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
  result = "";
  previousNumber.innerHTML = "";
  currentNumber.innerHTML = "";
  return;
}
//remove value function
function removeValue() {
  if (secondValue) {
    secondValue = secondValue.toString().slice(0, -1);
    return (currentDisplay.innerHTML =
      firstValue + currentOperator + secondValue);
  } else if (currentOperator) {
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
  } else if (result) {
    result = result.toString().slice(0, -1);
    result = result ? result : "";
    if (result === "") {
      return (currentDisplay.innerHTML = "0");
    }
    return (currentDisplay.innerHTML = result);
  }
}

//animation function
function addTransition(e) {
  if (e.propertyName == "transform") return;
  currentDisplay.className += " added";
}
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("added");
}

//click event listeners
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    chosenNumber(event.target.innerHTML);
    addTransition(event);
  });
});

operatorOptions.forEach((operatorOption) => {
  operatorOption.addEventListener("click", (event) => {
    chosenOperator(event.target.innerHTML);
    addTransition(event);
  });
});
equal.addEventListener("click", (e) => {
  getResult(), addTransition(e);
});
decimal.addEventListener("click", (e) => {
  getDecimal(), addTransition(e);
});
clear.addEventListener("click", resetCalc);
remove.addEventListener("click", (e) => {
  removeValue(), addTransition(e);
});

//animation event listener
currentNumber.addEventListener("transitionend", removeTransition);

//keypress event listeners
//listen to keypress
window.addEventListener("keydown", getKeyboardInput);

//key press functions
function getKeyboardInput(e) {
  addTransition(e);
  if (!isNaN(e.key)) {
    chosenNumber(e.key);
  } else if (e.key === "=" || e.key === "Enter") {
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
