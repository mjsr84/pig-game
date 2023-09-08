'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
// line below works the same as line above
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;


// FUNCTION VARIABLES
const init = function () {
    // SCORING
    scores = [0, 0];

    // starting score
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore0Element.textContent = 0;
    currentScore1Element.textContent = 0;
    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');

};

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // switch player
    // use a ternary operation
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    // the following works because you only want it to be active on one player at a time
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};

// ON PAGE LOAD
init();

// ROLL THE DICE
btnRoll.addEventListener('click', function () {
    if (playing) {

        // generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // display dice
        diceElement.classList.remove('hidden');
        // the following will call the right png file to display according to the random number generated
        diceElement.src = `dice-${dice}.png`;
        // check for rolled 1
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice; // same as currentScore = currentScore + 1;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. add current score to score of active player
        scores[activePlayer] += currentScore;
        // the above works like: scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. check score is >= 100
        if (scores[activePlayer] >= 100) {
            // FINISH THE GAME
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        }
        // or switch player
        else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    init();
});