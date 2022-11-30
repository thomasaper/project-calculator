// references to dom elements
const displayTop = document.querySelector('.displayTop');
const displaySub = document.querySelector('.displaySub');
const displayLeft = document.querySelector('.displayLeft');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const clearAllButton = document.querySelector('.clearAll');
const clearLastButton = document.querySelector('.clearLastEntity');
const equalButton = document.querySelector('.equal');

// variable elements
let displayTopNumber = '';
let displaySubNumber = '';
let displayLeftNumber = null;
let lastOperation = '';
let haveDot = false;

// functionality for numbers
numberButtons.forEach(number => {
    number.addEventListener('click', (e) => {
        if(e.target.innerText === '.' && !haveDot) {
        haveDot = true;
        } else if (e.target.innerText === '.' && haveDot){
            return;
        }
        displaySubNumber += e.target.innerText;
        displaySub.innerText = displaySubNumber;
    })
});

// functionality for operations
operationButtons.forEach(operation => {
    operation.addEventListener('click', (e) => {
        if(!displaySubNumber) return;
        haveDot = false;
        const operationName = e.target.innerText; 
        if (displaySubNumber && displayTopNumber) {
            mathOperation();
        } else {
            displayLeftNumber = parseFloat(displaySubNumber)
        }
        changeVar(operationName);
        lastOperation = operationName;
    })
});

// changing displays and clearing variables
function changeVar(name = '') {
    displayTopNumber += displaySubNumber + ' ' + name + ' ';
    displayTop.innerText = displayTopNumber;
    displaySub.innerText = '';
    displaySubNumber = '';
    displayLeft.innerText = displayLeftNumber;
};

// functionality for math operations
function mathOperation() {
    if (lastOperation === 'x') {
        displayLeftNumber =  parseFloat(displayLeftNumber) * parseFloat(displaySubNumber);
    } else if (lastOperation === '-') {
        displayLeftNumber =  parseFloat(displayLeftNumber) - parseFloat(displaySubNumber);
    } else if (lastOperation === '+') {
        displayLeftNumber =  parseFloat(displayLeftNumber) + parseFloat(displaySubNumber);
    } else if (lastOperation === '%') {
        displayLeftNumber =  parseFloat(displayLeftNumber) % parseFloat(displaySubNumber);
    } else if (lastOperation === '÷') {
        displayLeftNumber =  parseFloat(displayLeftNumber) / parseFloat(displaySubNumber);
    } 
};

// equal functionality
equalButton.addEventListener('click', () => {
    if (!displayTopNumber || !displaySubNumber) return;
    haveDot = false;
    mathOperation();
    changeVar();
    displaySubNumber = displayLeftNumber;
    displaySub.innerText = displayLeftNumber;
    displayLeft.innerText = '';
    displayTopNumber = '';
});

// clear all functionality
clearAllButton.addEventListener('click', () => {
    displayTopNumber = '';
    displayTop.innerText = 0;
    displaySubNumber = '';
    displaySub.innerText = 0;
    displayLeftNumber = null;
    displayLeft.innerText = 0;
    lastOperation = '';
    haveDot = false;
});

// clear last entity functionality
clearLastButton.addEventListener('click', () => {
    displaySubNumber = '';
    displaySub.innerText = '';
});

