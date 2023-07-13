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
      isNaN(event.target.textContent) &&
      event.target.textContent != "=" &&
      firstValue
    ) {
      if (!currentOperator) {
        //if no operator found AKA first time entering value
        currentOperator = event.target.textContent;
        if (firstValue) {
          numberArr.push(parseInt(firstValue));
          firstValue = "";
        }
        console.log("NO OPERATOR", numberArr);
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
        // console.log(numberArr);
        currentOperator = event.target.textContent;
        return (document.getElementById("currentDisplay").innerHTML =
          total + currentOperator);
      }
    }
    // equal button function
    else if (event.target.textContent === "=" && currentOperator) {
      numberArr.push(parseInt(firstValue));
      console.log(numberArr);
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
    }
  });
});
