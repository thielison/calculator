const currentOperation = document.getElementById("current-operation");
const currentDisplayValue = document.getElementById("display-value");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const dotButton = document.querySelector(".dot");

const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

let operand1 = 0;
let operator = "";
let operand2 = 0;
let clearOnNextNumber = false;
let previousOperationResult = 0;
let result = 0;
let dot = "";

function operate(num1, num2, operator) {
    switch (true) {
        case operator === "+":
            result = add(num1, num2);
            break;
        case operator === "-":
            result = subtract(num1, num2);
            break;
        case operator === "x":
            result = multiply(num1, num2);
            break;
        case operator === "/":
            if (num2 === 0) {
                return "Error: Infinity!";
            }
            result = divide(num1, num2);
    }

    if (result.toString().length > 14) {
        if (Number.isInteger(result)) {
            return "Too complex!";
        } else {
            return result.toFixed(12);
        }
    } else {
        return result;
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

function clearCalculator() {
    currentOperation.textContent = "";
    currentDisplayValue.textContent = "";
    operand1 = 0;
    operator = "";
    operand2 = 0;
    clearOnNextNumber = false;
    previousOperationResult = 0;
    result = 0;
}

function deleteLastInput() {
    if (currentDisplayValue.textContent.length === 0) {
        return;
    }

    currentDisplayValue.textContent = currentDisplayValue.textContent.slice(0, -1);

    if (operand1 && !operand2) {
        operand1 = Number(currentDisplayValue.textContent);
    }

    if (operand1 && operand2) {
        currentOperation.textContent = `${operand1} ${operator}`;
        operand2 = Number(currentDisplayValue.textContent);
    }
}

numberButtons.forEach((button) => {
    button.addEventListener("click", populateDisplay);
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", handleOperatorClick);
});

equalsButton.addEventListener("click", () => {
    if (!operand1 || !operand2) {
        return;
    }
    currentOperation.textContent = `${operand1} ${operator} ${operand2} =`;
    previousOperationResult = operate(operand1, operand2, operator);
    currentDisplayValue.textContent = previousOperationResult;
});

dotButton.addEventListener("click", () => {
    if (currentDisplayValue.textContent.toString().includes(".")) {
        dotButton.disabled = true;
    } else {
        currentDisplayValue.textContent += ".";
    }
    dotButton.disabled = false;
});

clearButton.addEventListener("click", clearCalculator);

deleteButton.addEventListener("click", deleteLastInput);
