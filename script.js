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