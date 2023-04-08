const numberButtons = document.querySelectorAll(".number");
const calculatorDisplay = document.getElementById("display-value");

// let num1 = prompt("First number:");
// let operator = prompt("Operator:");
// let num2 = prompt("Second number:");
let displayValue = 0;

function operate(num1, num2, operator) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
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
    calculatorDisplay.textContent += e.target.textContent;
    displayValue = calculatorDisplay.textContent;
}

numberButtons.forEach((button) => {
    button.addEventListener("click", populateDisplay);
});
