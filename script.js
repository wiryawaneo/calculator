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
let total = "";
let numberArr = [];
//loop each button
elements.forEach((number) => {
  number.addEventListener("click", function handleClick(event) {
    //get first value function
    if (!isNaN(event.target.textContent)) {
      if (numberArr.length != 0) {
        firstValue += event.target.textContent;
        return (document.getElementById("currentDisplay").innerHTML =
          numberArr[numberArr.length - 1] + currentOperator + firstValue);
      }
      firstValue += event.target.textContent;
      return (document.getElementById("currentDisplay").innerHTML =
        firstValue + currentOperator);
    }
    //opearator functions
    else if (
      (event.target.textContent === "+" ||
        event.target.textContent === "-" ||
        event.target.textContent === "x" ||
        event.target.textContent === "/") &&
      firstValue
    ) {
      if (!currentOperator) {
        //if no operator found AKA first time entering value
        currentOperator = event.target.textContent;
        if (firstValue) {
          numberArr.push(parseInt(firstValue));
          firstValue = "";
        }
        document.getElementById("currentDisplay").innerHTML =
          numberArr[numberArr.length - 1] + currentOperator;
      }

      //if there is an operator AKA calculation needed
      else if (currentOperator) {
        numberArr.push(parseInt(firstValue));
        firstValue = "";
        total = operate(
          numberArr[numberArr.length - 2],
          currentOperator,
          numberArr[numberArr.length - 1]
        );
        numberArr.push(total);
        document.getElementById("prevDisplay").innerHTML =
          numberArr[numberArr.length - 3] +
          currentOperator +
          numberArr[numberArr.length - 2];
        currentOperator = "";
        currentOperator = event.target.textContent;
        return (document.getElementById("currentDisplay").innerHTML =
          total + currentOperator);
      }
    }
    // equal button function
    else if (event.target.textContent === "=" && currentOperator) {
      numberArr.push(parseInt(firstValue));
      numberArr[numberArr.length - 1] = numberArr[numberArr.length - 1]
        ? numberArr[numberArr.length - 1]
        : 0;

      total = operate(
        numberArr[numberArr.length - 2],
        currentOperator,
        numberArr[numberArr.length - 1]
      );
      firstValue = total;
      numberArr.push(total);
      document.getElementById("prevDisplay").innerHTML =
        numberArr[numberArr.length - 3] +
        currentOperator +
        numberArr[numberArr.length - 2];
      currentOperator = "";
      return (document.getElementById("currentDisplay").innerHTML = total);
    } else if (event.target.textContent === "Clear") {
      firstValue = "";
      secondValue = "";
      currentOperator = "";
      total = "";
      numberArr = [];
      document.getElementById("currentDisplay").innerHTML = 0;
    } else if (event.target.textContent === "Delete") {
      const currentNumber = [
        ...document.getElementById("currentDisplay").innerHTML,
      ];
      deletedNumber = currentNumber.pop();
      newNumber = currentNumber.join("");
      if (!newNumber) {
        return (document.getElementById("currentDisplay").innerHTML = 0);
      }
      return (document.getElementById("currentDisplay").innerHTML = newNumber);
    }
  });
});
