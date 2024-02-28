const words = ['makeup','moisterizer','rose','sunflower','lotus','marygold','hibiscus','jasmine','daisy','tulip','lavender','bridal makeup','highlighter','fixer','cheektint','liptint','lipstick','eyeliner','eyeshadow','foundation','compact','mascara','blush','primer','strobe cream'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let remainingAttempts = 7;
let guessedWord = '';

const wordContainer = document.getElementById('word-container');
const attemptsDisplay = document.getElementById('attempts');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-btn');
const messageDisplay = document.getElementById('message');

// Initialize the game
function init() {
  guessedWord = '_'.repeat(selectedWord.length);
  wordContainer.textContent = guessedWord.split('').join(' ');
  attemptsDisplay.textContent = remainingAttempts;
}

// Check if the guessed letter is in the word
function checkLetter(letter) {
  let found = false;
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      guessedWord = guessedWord.substr(0, i) + letter + guessedWord.substr(i + 1);
      found = true;
    }
  }
  return found;
}

// Update the game state after each guess
function updateGame() {
  wordContainer.textContent = guessedWord.split('').join(' ');
  if (guessedWord === selectedWord) {
    messageDisplay.textContent = 'Congratulations! You guessed the word!';
    guessButton.disabled = true;
  } else if (remainingAttempts === 0) {
    messageDisplay.textContent = "Game over! The word was $ {selectedWord}." ;
    guessButton.disabled = true;
  }
}

// Event listener for the guess button
guessButton.addEventListener('click', function() {
  const letter = letterInput.value.toLowerCase();
  if (letter.match(/[a-z]/) && letter.length === 1) {
    if (!checkLetter(letter)) {
      remainingAttempts--;
      attemptsDisplay.textContent = remainingAttempts;
    }
    updateGame();
  } else {
    alert('Please enter a valid letter.');
  }
  letterInput.value = '';
});

// Initialize the game when the page loads
window.addEventListener('load', init);