'use strict';

// Selecting elements
const score0Element = document.querySelector('#score--0');
// below works the same as above
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');

// SCORING
const scores = [0, 0];

// starting score
let currentScore = 0;
let activePlayer = 0;

score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

// ROLL THE DICE
btnRoll.addEventListener('click', function () {
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
        // switch player
        // use a ternary operation
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
    }

});