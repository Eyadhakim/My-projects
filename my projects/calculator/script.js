const numbers = document.querySelectorAll(".number");
const screen = document.querySelector(".screen");
const clearBtn = document.getElementById('C')
const decimal = document.getElementById('decimal')
const functions = document.getElementsByClassName('function')

for (let index = 0; index < numbers.length; index++) {
    numbers[index].addEventListener("click", function clickBtn() {
        if (screen.innerText === '0' || screen.innerText == 'Undefined') {
            if (numbers[index].innerText === '0') {
                screen.innerText = '0'
            } else {
                screen.innerText = numbers[index].innerText
                screen.style.color = 'black'
            }
        } else {
            screen.innerText += numbers[index].innerText
        }
    });
    
}

clearBtn.onclick = function clear(){
    screen.innerText = '0'
    screen.style.color = 'black'
}

decimal.onclick = function point(){
    if (screen.innerText.split('.').length == 1 && screen.innerText != 'Undefined'){
        if (screen.innerText.endsWith('/') || screen.innerText.endsWith('*') || screen.innerText.endsWith('+') || screen.innerText.endsWith('-')){
        screen.innerText += "0."
        } else {
            screen.innerText += '.'
        }
    } else {
        screen.innerText += ''
    }
}

for (let sorting = 0; sorting < functions.length; sorting++) {
    functions[sorting].onclick = function functionsBtnclick(){
        switch(sorting){
            case 0:
                if (screen.innerText.length == 1 || screen.innerText == 'Undefined') {
                    screen.innerText = '0'
                    screen.style.color = 'black'
                } else {
                    screen.innerText = screen.innerText.substring(0, screen.innerText.length - 1)
                }
                break;
            
            case 1:
            case 2:
            case 3:
            case 4:
                if (screen.innerText.endsWith('*') || screen.innerText.endsWith('/') || screen.innerText.endsWith('+') || screen.innerText.endsWith('−')){
                    screen.innerText += ''
                } else {
                    if (screen.innerText != 'Undefined'){
                        if (functions[sorting].innerText == '×'){
                            screen.innerText += '*'
                        } else if (functions[sorting].innerText == '÷') {
                            screen.innerText += '/'
                        } else if (functions[sorting].innerText == '−') {
                            screen.innerText += '-'
                        } else {
                            screen.innerText += '+'
                        }
                    }
                }
                break;
            
            case 5:
                if (eval(screen.innerText) === Infinity || isNaN(eval(screen.innerText)) || eval(screen.innerText) === -Infinity) {
                    screen.innerText = 'Undefined'
                    screen.style.color = 'red'
                } else {
                    screen.innerText = eval(screen.innerText)
                }
        }
    
    }
}