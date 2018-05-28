class NumberStore {
  constructor() {
    this.current = null
  }
}

class OperationStore {
  constructor() {
    this.current = null
    this.operated = false
  }
}

const numberStore = new NumberStore();
const operatorStore = new OperationStore();
const observer = new MutationObserver(changeClearButton);

function changeClearButton() {
  let clearButton = document.querySelector('.clear')

  if (display().textContent == "0") {
    clearButton.textContent = "AC"
  } else {
    clearButton.textContent = "C"
  }
}

function display() {
  return document.querySelector('.display__output')
}

function displayNumber(number) {
  if(alreadyHasDecimal(number)) return
  if(isZero(number)) return

  if(operatorStore.operated){
    operatorStore.operated = false;
    display().innerHTML = ""
  }

  display().textContent += number.target.textContent
  if(removeLeadingZero(number)) display().textContent = display().textContent.replace(/^0+/, '')
}

function removeLeadingZero(number) {
  return !display().textContent.includes('.') && number.target.textContent != "0"
}

function isZero(number) {
  return number.target.textContent === "0" && display().textContent === "0";
}

function alreadyHasDecimal(number) {
  return number.target.textContent == "." && display().textContent.includes(".")
}

function clearDisplay() {
  numberStore.current = 0;
  operatorStore.current = null;
  display().innerHTML = "0";
}

function storeOperator(operator) {

  if (numberStore.current) {
    applyOperation()
  }

  if (getDisplayNumber() != 0) {
    operatorStore.current = operator.target.textContent
    operatorStore.operated = true;
    numberStore.current = getDisplayNumber()
  }
}

function getDisplayNumber() {
  return parseFloat(display().textContent)
}

function setDisplayNumber(number) {
  display().textContent = Math.round(number * 100) / 100;
}

function applyOperation() {
  const operation = operatorStore.current
  const firstNumber = numberStore.current
  const secondNumber = getDisplayNumber()

  switch(operation) {
    case '+':
      numberStore.current = add(firstNumber, secondNumber)
      break;
    case '-':
      numberStore.current = subtract(firstNumber, secondNumber)
      break;
    case 'x':
      numberStore.current = multiply(firstNumber, secondNumber)
      break;
    case "\u00f7":
      numberStore.current = divide(firstNumber, secondNumber)
      break;
    default:
      numberStore.current = secondNumber
  }

  console.log('first number', firstNumber)
  console.log('second number', getDisplayNumber())
  console.log('current operation', operatorStore.current)

  operatorStore.operated = true;
  setDisplayNumber(numberStore.current)
}


function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  if(secondNumber == 0) return "tsk!"

  return firstNumber / secondNumber;
}

function convertPosNeg(event) {
  let currentNumber = getDisplayNumber()

  if (currentNumber > 0) {
    setDisplayNumber(-Math.abs(currentNumber))
  } else {
    setDisplayNumber(Math.abs(currentNumber))
  }
}

function convertToPercent(event) {
  let currentNumber = getDisplayNumber()

  if (currentNumber > 0) {
    setDisplayNumber(currentNumber / 100)
  }
}

document.querySelectorAll('.number').forEach(function(number){
  number.addEventListener('click', displayNumber, number)
});

document.querySelectorAll('.operator').forEach(function(operator){
  operator.addEventListener('click', storeOperator)
})

document.querySelector('.equals').addEventListener('click', applyOperation)
document.querySelector('.clear').addEventListener('click', clearDisplay)
document.querySelector('.pos-neg').addEventListener('click', convertPosNeg)
document.querySelector('.percent').addEventListener('click', convertToPercent)
observer.observe(display(), { childList: true })
