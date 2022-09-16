const tableEl = document.getElementById('table');
const timer = document.querySelector('.timer');
const movesEl = document.querySelector('.moves');
const restartBtn = document.querySelector('.restart');
let firstSelection, secondSelection, selections, moves;
let second;

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

const startGame = () => {
    firstSelection = '';
    secondSelection = '';
    selections = 0;
    moves = 0;
    second = 0;
    moves.textContent = 0;
    timer.textContent = " 0 secs";
    shuffle();
}
startGame();

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
        }
    }
});

const movesCounter = () => {
    moves++;
    if (moves === 1) {
        timer.textContent = '0 secs';
    }
}