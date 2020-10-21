let anyKeyPressed = false;
let started = false;
let gameOver = true;
let computerChoices = [];
let humanChoices = [];
let btns = document.querySelectorAll(".btn");
let level = 0;


//play sound
function playSound(color) {
    let audio = new Audio(`public/sounds/${color}.mp3`)
    audio.play();
}

//add event listeners only once..if we include these in a function,
//then the callback is executed as many times as the function is called.

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (!gameOver) {
            let selectedBtnClasses = btn.classList;
            selectedBtnClasses.add("active");
            playSound(selectedBtnClasses[1]);
            setTimeout(() => {
                selectedBtnClasses.remove("active");
            }, 100);
            humanChoices.push(selectedBtnClasses[1]);
            validate(humanChoices.length - 1);
        }
    });
});

//reset everything after gameOver

function reset() {
    humanChoices = [];
    computerChoices = [];
    level = 0;
    gameOver = false;
}


//get the pattern from computer

function getComputerChoice() {
    humanChoices = [];
    computerChoice = Math.floor(Math.random() * 4);
    let selectedBtnClasses = btns[computerChoice].classList;
    selectedBtnClasses.add("computerPress");
    playSound(selectedBtnClasses[1]);
    setTimeout(() => {
        selectedBtnClasses.remove("computerPress");
    }, 100);
    computerChoices.push(selectedBtnClasses[1]);
}


// logic of the game

function logic() {
    document.querySelector("h1").textContent = `Level ${++level}`;
    getComputerChoice();
}

// validate userClick with computer pattern

function validate(level) {
    if (humanChoices[level] === computerChoices[level]) {
        if (humanChoices.length === computerChoices.length) {
            setTimeout(() => {
                logic();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.querySelector("h1").textContent = `Game Over! Press any key to play again.`;
        let body = document.querySelector("body");
        body.classList.add("wrong");
        setTimeout(() => {
            body.classList.remove("wrong");
        }, 300);
        gameOver = true;
        started = false;
        playBtn.disabled = false;

    }
}

// start after keypress

document.addEventListener("keydown", () => {
    if (!started) {
        started = true;
        reset();
        logic();
    }
});

//for mobile devices
let playBtn = document.querySelector(".playBtn");
playBtn.addEventListener("click", () => {
    if (!started) {
        started = true;
        playBtn.disabled = true;
        reset();
        logic();
    }
});