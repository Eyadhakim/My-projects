const countLabel = document.querySelector("#countLabel")
const decreaseBTN = document.querySelector("#decreaseBTN")
const resetBTN = document.querySelector("#resetBTN")
const increaseBTN = document.querySelector("#increaseBTN")
let count = 0

function dec(){
    count--
    countLabel.textContent = count
}

function reset(){
    count = 0
    countLabel.textContent = count
}

function inc(){
    count++
    countLabel.textContent = count
}


decreaseBTN.onclick = dec
resetBTN.onclick = reset
increaseBTN.onclick = inc