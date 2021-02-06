'use strict';

// Seleting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const Current0El = document.getElementById('current--0');
const Current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document;
  // Buttons
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  diceEl.classList.remove('hidden');
  // Score Inititalizing with 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  Current0El.textContent = 0;
  Current1El.textContent = 0;

  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  currentScore = 0;
  scores[0] = scores[1] = 0;
  playing = true;
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    // console.log(dice);
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1; if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch next player
      switchPlayer();
    }
  }
});

// Hold Button
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add Current Score to active players score
    scores[activePlayer] += currentScore;
    //   document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      btnHold.classList.toggle('hidden');
      btnRoll.classList.toggle('hidden');
    } else {
      // Switch to the next player.
      switchPlayer();
    }
  }
  if (!playing) diceEl.classList.add('hidden');
  // Finish Game
});

// New Game
btnNew.addEventListener('click', function () {
  // code here
  init();
});
