const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const firstOperandTextElement = document.querySelector("[data-small-screen]");
const secondOperandTextElement = document.querySelector("[data-big-screen]");

class Calculator {
  constructor(firstOperandTextElement, secondOperandTextElement) {
    this.firstOperandTextElement = firstOperandTextElement;
    this.secondOperandTextElement = secondOperandTextElement;
    this.clear();
  }

  clear() {
    this.firstOperand = "";
    this.secondOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.secondOperand = this.secondOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.secondOperand.includes(".")) return;
    this.secondOperand = this.secondOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.secondOperand === "") return;
    if (this.firstOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.firstOperand = this.secondOperand;
    this.secondOperand = "";
  }

  compute() {
    let computation;
    let first = parseFloat(this.firstOperand);
    let second = parseFloat(this.secondOperand);
    if (isNaN(first) || isNaN(second)) return;
    switch (this.operation) {
      case "+":
        computation = first + second;
        break;
      case "-":
        computation = first - second;
        break;
      case "*":
        computation = first * second;
        break;
      case "÷":
        computation = first / second;
        break;
      default:
        return;
    }
    this.secondOperand = computation;
    this.operation = undefined;
    this.firstOperand = "";
  }

  updateDisplay() {
    this.secondOperandTextElement.innerText = this.secondOperand;
    if (this.operation !== null) {
      console.log(this.operation);
      this.firstOperandTextElement.innerText = `${this.firstOperand} ${this.operation}`;
    }
    //    else {
    //   this.firstOperandTextElement.innerText = this.firstOperand;
    // }

    this.firstOperandTextElement.innerText = this.firstOperand;
  }
}

const calculator = new Calculator(
  firstOperandTextElement,
  secondOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
