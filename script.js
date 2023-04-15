const currentOperation = document.getElementById("current-operation");
const currentDisplayValue = document.getElementById("display-value");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

let operand1 = null;
let operator = "";
let operand2 = null;
let clearOnNextNumber = false;
let previousOperationResult = null;

function operate(num1, num2, operator) {
    // switch case
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "x") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    } else {
        return "Not a valid operator!";
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function populateDisplay(e) {
    if (!operator) {
        clearOnNextNumber = true;
        currentDisplayValue.textContent += e.target.textContent;
        operand1 = Number(currentDisplayValue.textContent);
    } else {
        if (clearOnNextNumber) {
            clearOnNextNumber = false;
            currentDisplayValue.textContent = "";
        }

        currentDisplayValue.textContent += e.target.textContent;
        operand2 = Number(currentDisplayValue.textContent);
    }
}

function handleOperatorClick(e) {
    if (operator !== "" && operand2 !== null) {
        previousOperationResult = operate(operand1, operand2, operator);
        operand1 = previousOperationResult;
        operand2 = null;
        operator = e.target.id;
        currentDisplayValue.textContent = operand1;
        currentOperation.textContent = `${operand1} ${operator}`;
    } else {
        currentOperation.textContent = `${operand1} ${e.target.textContent}`;
    }
    operator = e.target.id;
    clearOnNextNumber = true;
}

numberButtons.forEach((button) => {
    button.addEventListener("click", populateDisplay);
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", handleOperatorClick);
});

equalsButton.addEventListener("click", () => {
    currentOperation.textContent = `${operand1} ${operator} ${operand2} =`;
    previousOperationResult = operate(operand1, operand2, operator);
    currentDisplayValue.textContent = previousOperationResult;
});
