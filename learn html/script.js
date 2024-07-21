let temp = document.getElementById('template')
let clon = temp.content.cloneNode(true)
let demo = document.getElementById('demo')
let textarea = document.getElementById('codearea')
let output = document.querySelector('.output')

document.querySelector('button').onclick = function (){
    demo.appendChild(clon)
}

textarea.onkeyup = function () {
    output.innerHTML = textarea.value
}