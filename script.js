const gameContainer = document.getElementById('game-container');
const frog = document.getElementById('frog');
const scoreBoard = document.getElementById('score-board');
const eatSound = document.getElementById('eat-sound');

let score = 0;

// Başlangıçta ortala
let frogPosition = gameContainer.offsetWidth / 2 - frog.offsetWidth / 2;
frog.style.left = frogPosition + 'px';

// Fare ile kontrol
document.addEventListener('mousemove', (event) => {
  const rect = gameContainer.getBoundingClientRect();
  let newPos = event.clientX - rect.left - frog.offsetWidth / 2;

  if (newPos < 0) newPos = 0;
  if (newPos + frog.offsetWidth > rect.width) {
    newPos = rect.width - frog.offsetWidth;
  }

  frog.style.left = newPos + 'px';
});

// Skoru güncelle
function updateScore() {
  score += 2;
  scoreBoard.innerText = 'Skor: ' + score;
}

// Sinek üret
function createFly() {
  const fly = document.createElement('div');
  fly.classList.add('falling-object');
  fly.style.left = Math.random() * (gameContainer.offsetWidth - 26) + 'px';
  gameContainer.appendChild(fly);

  let fallingInterval = setInterval(() => {
    let topPosition = parseInt(getComputedStyle(fly).top || '0', 10);

    if (topPosition >= gameContainer.offsetHeight - frog.offsetHeight - 25) {
      const frogRect = frog.getBoundingClientRect();
      const flyRect = fly.getBoundingClientRect();

      const hit =
        flyRect.left < frogRect.right &&
        flyRect.right > frogRect.left &&
        flyRect.bottom >= frogRect.top &&
        flyRect.top <= frogRect.bottom;

      if (hit) {
        updateScore();
        eatSound.currentTime = 0;
        eatSound.play();
      }

      clearInterval(fallingInterval);
      gameContainer.removeChild(fly);
    } else {
      fly.style.top = topPosition + 5 + 'px';
    }
  }, 50);
}

setInterval(createFly, 900);
