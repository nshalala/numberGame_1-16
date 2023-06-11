let seconds = document.getElementById("seconds");
let opening = document.getElementById("opening");
let table = document.getElementById("gameBoard");

let numbers;
let lastClicked;
let wrongChoice;
let chances;
let time;
let timer;

start();

function start() {
    numbers = [];

    for (let i = 0; i < 16; i++) {
        numbers.push(i + 1);
    }

    clearTimeout(wrongChoice);
    time = 30;
    lastClicked = 0;
    chances = 3;
    opening.style.display = "flex";
    table.style.display = "none";
    seconds.innerHTML = time;
    displayOpening();
}

function displayOpening() {
    let count = 3;
    opening.innerHTML = count;
    let timer = setInterval(() => {
        if (count > 0) {
            count--;
            opening.innerHTML = count;
        } else {
            clearInterval(timer);
            opening.style.display = "none";
            table.style.display = "block";
            displayTable();
        }
    }, 1000);
}

function displayTable() {
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += `<tr>`;
        for (let j = 0; j < 4; j++) {
            let index = rndm(0, numbers.length);
            code += `<td onclick="check(this)">${numbers[index]}</td>`;
            numbers.splice(index, 1);
        }
        code += `</tr>`;
    }
    table.innerHTML = code;
    timer = setInterval(() => {
        tikTak();
    }, 1000);
}

function check(td) {
    clearTimeout(wrongChoice);
    if (td.innerHTML == lastClicked + 1) {
        td.classList.add("right");
        lastClicked++;
        if (lastClicked == 16) {
            gameOver("You won");
        }
    } else {
        if (chances > 1) {
            td.classList.add("wrong");
            wrongChoice = setTimeout(() => {
                td.classList.remove("wrong");
                alert(`Oops, wrong one! You have ${chances} chances left`);
            }, 200);
        } else {
            gameOver("You lost");
        }
        chances--;
    }
}

function tikTak() {
    if (time > 0) {
        time--;
        seconds.innerHTML = time > 9 ? time : "0"+time;
    } else {
        gameOver("Time is up");
        clearInterval(timer);
    }
}

function gameOver(state) {
    let again = confirm(`${state}! Would you like to start again?`);
    if (again) start();
    else alert("See you soon!");
}

function rndm(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}