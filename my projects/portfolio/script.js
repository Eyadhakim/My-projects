const main = document.querySelector(".main");
const Light = document.querySelector(".Light");
const Dark = document.querySelector(".Dark");
const Descreption = document.querySelector(".main h3");
const text = document.querySelector(".main h2");
const twitter = document.querySelector("#twtr");
const instagram = document.querySelector("#inst");
const behance = document.querySelector("#bhnc");
const facebook = document.querySelector("#face");
const header = document.querySelector("header");
const mainBtn = document.querySelector(".main-btn");

function white(){
    main.style.background="#ffffff"
    text.style.color="#000"
    Descreption.style.color="#000"
    twitter.style.color="#000"
    instagram.style.color="#000"
    behance.style.color="#000"
    facebook.style.color="#000"
    header.style.backgroundColor="#000"
}
function black(){
    main.style.background="#000"
    text.style.color="#ffffff"
    Descreption.style.color="#ffffff"
    twitter.style.color="#ffffff"
    instagram.style.color="#ffffff"
    behance.style.color="#ffffff"
    facebook.style.color="#ffffff"
    header.style.backgroundColor="#ffffff"
}

Light.onclick = white;
Dark.onclick = black;