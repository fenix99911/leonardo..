let emojis = ['🐶', '🐱', '🦊', '🐻', '🐼', '🐸', '🐵', '🦁'];
let cards = [];
let gameBoard = document.getElementById('gameBoard');
let timerInterval = null;

const timeDisplay = document.getElementById('time');
const attemptsDisplay = document.getElementById('attempts');
const resetBtn = document.getElementById('resetBtn');

function stopTimer() {
  clearInterval(timerInterval);
}

function resetGame() {
  attempts = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  timeDisplay.textContent = "";
  attemptsDisplay.textContent = "";
  gameBoard.innerHTML = "";
  cards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
  createBoard();
}

function createBoard() {
  cards.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="front">❓</div>
      <div class="back">${emoji}</div>
    `;

    card.addEventListener('click', () => {
      if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

      card.classList.add('flipped');

      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        lockBoard = true;
        attempts++;
        attemptsDisplay.textContent = attempts;

        const firstEmoji = firstCard.querySelector('.back').textContent;
        const secondEmoji = secondCard.querySelector('.back').textContent;

        if (firstEmoji === secondEmoji) {
          firstCard.classList.add('matched');
          secondCard.classList.add('matched');
          resetTurn();
        } else {
          setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetTurn();
          }, 1000);
        }
      }
    });

    gameBoard.appendChild(card);
  });
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

resetBtn.addEventListener('click', resetGame);

// Inicia el juego al cargar la página
resetGame();
