//Screen

const calculatorScreen = document.querySelector(".calculator-screen");

const numbers = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".operator");

const equalSign = document.querySelector(".equal-sign");

const clearBtn = document.querySelector(".all-clear");

const decimalBtn = document.querySelector(".decimal");

const historyScreen = document.querySelector(".history");

let prevNumber = "";
let calculationOperator = "";
let currentNumber = "0";

let calculationHistory = [];

const updateScreen = (number) => {
  calculatorScreen.value = number;
};

const updateHistory = () => {
  let history = "";
  calculationHistory.forEach((calculation) => {
    history += `${calculation.prevNumber} ${calculation.operator} ${calculation.currentNumber} = ${calculation.result} <br>`;
  });
  historyScreen.innerHTML = history;
};

const inputNumber = (number) => {
  if (currentNumber === "0") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
};

const inputDecimal = (dot) => {
  if (currentNumber.includes(".")) {
    return;
  }
  currentNumber += dot;
};

const inputOperator = (operator) => {
  if (calculationOperator) {
    alert("Operator sudah ditetapkan");
  }

  if (calculationOperator === "") {
    prevNumber = currentNumber;
  }

  calculationOperator = operator;
  currentNumber = "";
};

const clearAll = () => {
  prevNumber = "";
  calculationOperator = "";
  currentNumber = "0";
  updateHistory();
};

// Click Button Number

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    inputNumber(event.target.value);
    updateScreen(currentNumber);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    inputOperator(event.target.value);
  });
});

const calculate = () => {
  let result = "";
  switch (calculationOperator) {
    case "+":
      result = parseFloat(prevNumber) + parseFloat(currentNumber);
      break;
    case "-":
      result = parseFloat(prevNumber) - parseFloat(currentNumber);
      break;
    case "x":
      result = parseFloat(prevNumber) * parseFloat(currentNumber);
      break;
    case "/":
      result = parseFloat(prevNumber) / parseFloat(currentNumber);
      break;
    case "%":
      result = parseFloat(prevNumber) % parseFloat(currentNumber);
      break;
    default:
      return;
  }

  calculationHistory.unshift({
    prevNumber: prevNumber,
    operator: calculationOperator,
    currentNumber: currentNumber,
    result: result,
  });

  currentNumber = result;
  calculationOperator = "";
};

equalSign.addEventListener("click", () => {
  if (!calculationOperator) {
    alert("Operator belum ditetapkan");
  }
  calculate();
  updateScreen(currentNumber);
  updateHistory();
});

clearBtn.addEventListener("click", () => {
  clearAll();
  updateScreen(currentNumber);
});

decimalBtn.addEventListener("click", (event) => {
  inputDecimal(event.target.value);
  updateScreen(currentNumber);
});
