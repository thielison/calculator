const currentOperation = document.getElementById("current-operation");
const numberInput = document.getElementById("display-value");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

let operand1 = null;
let operator = "";
let operand2 = null;
// let currentDisplayValue = null;
let clearOnNextNumber = false;

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
        numberInput.textContent += e.target.textContent;
        operand1 = Number(numberInput.textContent);

        console.log("OPERAND 1 = " + operand1);
    } else {
        if (clearOnNextNumber) {
            clearOnNextNumber = false;
            numberInput.textContent = "";
        }

        numberInput.textContent += e.target.textContent;
        operand2 = Number(numberInput.textContent);

        console.log("OPERAND 2 = " + operand2);
    }
}

function initializeOperation(e) {
    operator = e.target.id;
    currentOperation.textContent = `${operand1} ${operator}`;
}

numberButtons.forEach((button) => {
    button.addEventListener("click", populateDisplay);
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", initializeOperation);
});

equalsButton.addEventListener("click", () => {
    currentOperation.textContent = `${operand1} ${operator} ${operand2} =`;
    numberInput.textContent = operate(operand1, operand2, operator);
});
