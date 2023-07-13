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

//testing operators
// console.log("add", add(1, 2));
// console.log("subtract", subtract(3, 1));
// console.log("multiply", multiply(3, 5));
// console.log("divide", divide(5, 2));

// const firstNumber = 0;
//calls a function based on operator called
const operators = {
  "+": add,
  "-": subtract,
  x: multiply,
  "/": divide,
};
// const secondNumber = 0;

//run operator
const operate = (firstNumber, operator, secondNumber) => {
  return operators[operator](firstNumber, secondNumber);
};

//receive value from button clicked
const elements = document.querySelectorAll(".number");
let firstValue = "";
let secondValue = "";
let currentOperator = "";
elements.forEach((number) => {
  number.addEventListener("click", function handleClick(event) {
    // console.log("box clicked", event.target.textContent);
    //get first value
    if (!isNaN(event.target.textContent) && currentOperator === "") {
      firstValue += event.target.textContent;
      return (document.getElementById("currentDisplay").innerHTML = firstValue);
    }
    //get operator
    else if (
      (event.target.textContent === "+" ||
        event.target.textContent === "-" ||
        event.target.textContent === "x" ||
        event.target.textContent === "/") &&
      firstValue &&
      currentOperator === ""
    ) {
      //   console.log("operator added");
      currentOperator += event.target.textContent;
      return (document.getElementById("currentDisplay").innerHTML =
        firstValue + currentOperator);
    }
    //get second value
    else if (
      firstValue &&
      currentOperator &&
      !isNaN(event.target.textContent)
    ) {
      secondValue += event.target.textContent;
      return (document.getElementById("currentDisplay").innerHTML =
        firstValue + currentOperator + secondValue);
    }
    //operate calculations
    else if (event.target.textContent === "=" && currentOperator) {
      if (!currentOperator) {
        return (document.getElementById("currentDisplay").innerHTML =
          firstValue);
      } else {
        firstValue = operate(parseInt(firstValue), currentOperator, parseInt(secondValue));
        document.getElementById("currentDisplay").innerHTML = firstValue;
        secondValue = "";
        currentOperator = "";
        return;
      }
    }
  });
});
