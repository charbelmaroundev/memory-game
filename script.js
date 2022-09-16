///////////////////
// ELEMENTS
///////////////////

const tableEl = document.getElementById('table');
const timerEl = document.querySelector('.timer');
const movesEl = document.querySelector('.moves');
const restartBtn = document.querySelector('.restart');
const levelEl = document.querySelector('.level');
const resultEl = document.querySelector('.result')
let firstSelection, secondSelection, selections, moves;
let second, interval, interval1;
let delay = 1000;

///////////////////
// CARDS
///////////////////

const cards = [{
    name: "javascript",
    image: "assets/javascript.svg",
},
{
    name: "php",
    image: "assets/php.svg",
},
{
    name: "sql",
    image: "assets/sql.svg",
}];

///////////////////
// SHUFFLE CARDS
///////////////////

const shuffle = () => {
    let cardSlice = cards.slice(0, 3);
    let fullSet = cardSlice.concat(cardSlice).sort(() => {
        return 0.5 - Math.random();
    });

    fullSet.forEach(item => {
        const name = item.name;
        const image = item.image;

        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = name;

        const retro = document.createElement('div');
        retro.classList.add('retro');

        const front = document.createElement('div');
        front.classList.add('front');
        front.style.backgroundImage = 'url(' + image + ')';

        tableEl.appendChild(card);
        card.appendChild(front);
        card.appendChild(retro);
    });
}

///////////////////
// START THE GAME
///////////////////

const startGame = () => {
    interval = setInterval(() => {
        resultEl.innerHTML = ""
    }, 5000);
    firstSelection = '';
    secondSelection = '';
    selections = 0;
    moves = 0;
    second = 0;
    movesEl.textContent = 0;
    timerEl.textContent = " 0 secs";
    shuffle();
}
startGame();

///////////////////
// ON CLICK LISTENER
///////////////////

tableEl.addEventListener('click', event => {
    let clicked = event.target;

    if (clicked.parentNode.classList.contains('card') &&
        !(clicked.parentNode.classList.contains('selected')) &&
        !(clicked.parentNode.classList.contains('match'))) {
        if (selections < 2) {
            movesCounter();
            selections++;
            if (selections === 1) {
                firstSelection = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            } else {
                secondSelection = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            }
            if (firstSelection && secondSelection) {
                if (firstSelection === secondSelection) {
                    setTimeout(match, delay);
                }
                setTimeout(resetSelections, delay);
            }
        }
    }
});

///////////////////
// MOVES
///////////////////


const movesCounter = () => {
    moves++;
    movesEl.textContent = moves;
    if (moves === 1) {
        timerEl.textContent = '0 secs';
        startTimer();
    }
}

///////////////////
// TIMER
///////////////////

const startTimer = () => {
    interval = setInterval(() => {
        timerEl.innerHTML = second + ' secs';
        second++;
    }, 1000);
}

///////////////////
// COMPARE THE CARDS
///////////////////

let level = 0;
const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
        card.remove()
        const cardEl = document.querySelectorAll(".card")
        if (cardEl.length === 0 && moves <= 10 && second <= 10) {
            resultEl.innerHTML = "YOU WIN"
            resultEl.style.color = "green"
            level++;
            levelEl.innerHTML = `level ${level}`
            clearInterval(interval);
            cleanTable();
            startGame();
        }
    });
};

///////////////////
// CHECK IF THE TIME AND NUMBER OF MOVES
///////////////////

interval1 = setInterval(() => {
    if (second >= 11 || moves >= 11) {
        resultEl.innerHTML = "YOU LOOSE"
        resultEl.style.color = "red"
        clearInterval(interval);
        cleanTable();
        startGame();
    }
}, 1000);


const resetSelections = () => {
    firstSelection = '';
    secondSelection = '';
    selections = 0;
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

///////////////////
// RESET BUTTON
///////////////////

restartBtn.addEventListener('click', () => {
    clearInterval(interval);
    cleanTable();
    startGame();
});

const cleanTable = () => {
    while (tableEl.firstChild) {
        tableEl.removeChild(tableEl.firstChild);
    }
}