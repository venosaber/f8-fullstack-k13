// buttons
const numElements = Array.from(document.getElementsByClassName("num-btn"));
const opElements = Array.from(document.getElementsByClassName("op-btn"));
const delElement = document.getElementById('del-btn');
const acElement = document.getElementById('ac-btn');
const calcElement = document.getElementById('calc-btn');

// display lines
const expressionLine = document.getElementById("expressionLine");
const resultLine = document.getElementById("resultLine");

// to check if the calc-btn ('=') has just been used and display a valid result or not
let isCalculated = false;

// the expression to display on the expressionLine
let displayText = "";

// the result to display on the resultLine
let result = "";

// expression contains all the numbers and operators as its elements
let expression = [];

const digits = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', 'x', '/'];
/*

                                                                         display = 8 , isCalculated = false
                                                                               ▲
                                                                               │
                                                                               │true
                                                                               │
                                                                                        false
                                    ┌──────────────────────────────────► isCalculated ───────────► display += 8
                                    │
                                    │      ┌───────────────────────────► if(display)  display.slice(0,-1)
                                    │      │
              ┌─────────────────────┼──────┼──────────────────────┐
              │                     │   ┌──┼───┐ ┌──────┐         │
              │                     │   │  │   │ │      │         │
              │                     │   │ DEL  │ │  AC ─┼─────────┼────► display = "" ,   result = ""
              │                     │   └──────┘ └──────┘         │
              │       ┌──────┐ ┌────┼─┐ ┌──────┐ ┌──────┐         │
              │       │      │ │    │ │ │      │ │      │         │                       false
              │       │  7   │ │   8  │ │   9  │ │  / ──┼─────────┼────► isCalculated  ────────────► display += "/"
              │       └──────┘ └──────┘ └──────┘ └──────┘         │
              │       ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │           │
              │       │      │ │      │ │      │ │      │         │           │true
              │       │  4   │ │   5  │ │   6  │ │  x   │         │           │
              │       └──────┘ └──────┘ └──────┘ └──────┘         │           ▼
              │       ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │
              │       │      │ │      │ │      │ │      │         │    display = result + "/"
              │       │  1   │ │   2  │ │   3  │ │  -   │         │
              │       └──────┘ └──────┘ └──────┘ └──────┘         │     isCalculated = false
              │       ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │
              │       │      │ │      │ │      │ │      │         │
              │       │  0   │ │   .  │ │  = │ │ │  +   │         │
              │       └──────┘ └──────┘ └────┼─┘ └──────┘         │
              └──────────────────────────────┼────────────────────┘
                                             │
                                             │
                                             └───►  isCalculated = true

                                                    calculate() ────► display the result


                                                                   ┌─────────────────────────────────────────────────────────┐
                                                                   │                                                         │
                                                                   │    build up the expression ────────► perform operations │
                                                                   │              │                              │           │
                                                                   └──────────────┼──────────────────────────────┼───────────┘
                                                                                  │                              │
            expression = []                                                       │                              │
                                                                                  │                              │
  ┌───────for j = 0 to expressText.length-1                                       │                              ▼
  │                                                                               │
  │                                                                               │               ┌── while(expression.length > 1)
  │                                                                               ▼               │
  │   ┌────────────────────────────────────────────────────────────────────────────────────┐      │   ┌─────────────────────────────────────────────────────┐
  │   │                                                                                    │      │   │                                                     │
  │   │                                   let char=expressText[j]                          │      │   │   find smallest index of 'x' & '/'                  │
  │   │                                                                                    │      │   │                                                     │
  │   │                       true                             true                        │      └──►│                     │                               │
  └──►│     char is digit ? ──────────► lastElement is number ────────► lastElement += char│          │                     │                               │
      │                                                                                    │          │                     ▼                               │
      │            │                            │                                          │          │   perform multiplication / division operations   ◄──┼────────────┐
      │            │                            │                                          │          │                                                     │            │
      │            │                            │ false                                    │          │                     │                               │            │
      │            │                            │                                          │          │                     │                               │            │
      │            │false                       ▼                                          │          │                     ▼                               │            │
      │            │                                                                       │          │   perform other operations at index = 1  ◄──────────┼────────────┤
      │            │                    lastElement is operator                            │          │                                                     │            │
      │            │                                                                       │          └─────────────────────┬───────────────────────────────┘            │
      │            │                            │                                          │                                │                                            │
      │            ▼                            │                                          │                                │                                            │
      │                                         │                                          │                                ▼                                            │
      │     expression.push(char) ◄─────────────┘                                          │                                                                             │
      │                                                                                    │                   return result or return "Error"                           │
      └────────────────────────────────────────────────────────────────────────────────────┘                                                                             │
                                                                                                                         │                                               │
                                                                                                                         │                                               │
                                                                                                        expression[0] ◄──┘                                               │
                                                                                                                                                                         │
                                                                                                                                                                         │
                      ┌────────────────────────────────────────────────────────────────────────┐                                                                         │
                      │                  calculateAndReplace(index)                            │                                                                         │
                      │                                                                        │                                                                         │
                      │                                                                        │                                                                         │
                      │       exp[index-1]     exp[index]     exp[index+1]                     │                                                                         │
                      │           │                 │            │                             ├─────────────────────────────────────────────────────────────────────────┘
                      │  ─────┐   │                 │            │      ┌────────              │
                      │       │   ▼                 ▼            ▼      │                      │
                      │       │ num1            operator       num2     │                      │
                      │       │                                         │                      │
                      │       └───────────────────┬─────────────────────┘                      │
                      │                           │                                            │
                      │                           │ replace                                    │
                      │                           ▼                                            │
                      │                                                                        │
                      │                       result  ───────►  exp.splice(index-1,3,result)   │
                      │                                                                        │
                      └────────────────────────────────────────────────────────────────────────┘

 */

/* Clicking buttons except for calc-btn will lead to changes on the expressionLine*/
for (const numElement of numElements) {
    numElement.onclick = () => {
        if (isCalculated) {
            // clear the old expression on the expressionLine and start with new input
            displayText = numElement.innerText;
            isCalculated = false;
        } else {
            // concat the number to the current expressionLine
            displayText += numElement.innerText;
        }
        displayExpression();
    }
}

delElement.onclick = () => {
    if (displayText) {
        // remove the last character on the expressionLine
        displayText = displayText.slice(0, -1);
        isCalculated = false;
        displayExpression();
    }
}

acElement.onclick = () => {
    // all clear the expressionLine and resultLine
    displayText = "";
    result = "";
    displayExpression();
    resultLine.innerText = result;
}

for (const opElement of opElements) {
    opElement.onclick = () => {
        if (isCalculated) {
            // concatenate the result of last calculation with the operator
            displayText = result + opElement.innerText;
            isCalculated = false;
        } else {
            // concat the operator to the current expressionLine
            displayText += opElement.innerText;
        }
        displayExpression();
    }
}

function displayExpression() {
    expressionLine.innerText = displayText;
}

/* Clicking the calc-btn will lead to changes on the resultLine*/
calcElement.onclick = () => {
    if (displayText) {
        result = calculate();

        if (isNaN(Number(result))) {
            resultLine.innerText = "Error";
        } else {
            // if the result is valid,
            resultLine.innerText = result;
            isCalculated = true;
        }
    }
}

function calculate() {
    if (displayText[0] === 'x' || displayText[0] === '/') return "Error";
    // convert the text to expression to calculate
    buildExpression(displayText);

    while (expression.length > 1) {
        let multiplyIndex = expression.indexOf('x');
        let divideIndex = expression.indexOf('/');

        let opIndex;
        // order of operations: multiplication & division first
        if (multiplyIndex !== -1 && divideIndex !== -1) {
            opIndex = (multiplyIndex < divideIndex) ? multiplyIndex : divideIndex;
        } else if (multiplyIndex !== -1) {
            opIndex = multiplyIndex;
        } else if (divideIndex !== -1) {
            opIndex = divideIndex;
        }
        /* there should only be addition & subtraction operations left
         * perform from left to right, can always find the operator at index 1 until there are no operators left
         */
        else {
            opIndex = 1;
        }
        /* perform the calculation and check
         * if the result of calculation is NaN => error
         * if the result is a number, perform replacement
         */
        if (!calculateAndReplace(opIndex)) return "Error";
    }

    return expression[0];
}

// convert the text to expression to calculate
function buildExpression(expressText) {
    // Each element of expression is either a number or an operator
    expression = [];
    for (let j = 0; j < expressText.length; j++) {
        let char = expressText[j];

        if (digits.includes(char)) {
            let lastElement = expression[expression.length - 1];
            let beforeLastElement = expression[expression.length - 2];

            // if lastElement is also number, concatenate the digits
            if (!isNaN(Number(lastElement))) {
                expression[expression.length - 1] += char;
            }
            /* if lastElement is '+' or '-' and beforeLastElement is an operator (like x-5)
             * or lastElement is '+' or '-' and beforeLastElement is nothing (like +3)
             * concatenate the '+' or '-' with char
             */
            else if ((lastElement === '+' || lastElement === '-')
                && ((!beforeLastElement) || operators.includes(beforeLastElement))) {
                expression[expression.length - 1] += char;
            }
            /* if char is '.' and lastElement is either nothing or an operator
             * make it 0. to avoid error
             */
            else if (char === '.' && (!lastElement || isNaN(Number(lastElement)))) {
                expression.push('0.');
            }
            // lastElement should be an operator, and char is a digit
            else {
                expression.push(char);
            }

        } // char is an operator
        else {
            expression.push(char);
        }
    }
}

// return false if the result of calculation is NaN, otherwise perform replacement and return true
function calculateAndReplace(index) {
    const num1 = Number(expression[index - 1]);
    const operator = expression[index];
    const num2 = Number(expression[index + 1]);
    let result = calc(num1, num2, operator)
    if (isNaN(result)) return false;

    // replace 3 (num1, operator, num2) with 1 (result)
    expression.splice(index - 1, 3, result);
    return true;
}

function calc(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            return num1 / num2;
    }
}