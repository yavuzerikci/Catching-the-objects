const gameContainer = document.getElementById('game-container');
const frog = document.getElementById('frog');
const scoreBoard = document.getElementById('score-board');

let score = 0;

// Kurbağayı başlangıçta ortala
let frogPosition = gameContainer.offsetWidth / 2 - frog.offsetWidth / 2;
frog.style.left = frogPosition + 'px';

// Kurbağayı fare ile sola–sağa hareket ettir
document.addEventListener('mousemove', (event) => {
  const rect = gameContainer.getBoundingClientRect();
  let newPos = event.clientX - rect.left - frog.offsetWidth / 2;

  if (newPos < 0) newPos = 0;
  if (newPos + frog.offsetWidth > rect.width) {
    newPos = rect.width - frog.offsetWidth;
  }

  frog.style.left = newPos + 'px';
});

// Skoru güncelle, renklere ufak efekt ver
function updateScore(points) {
  score += points;
  scoreBoard.innerText = 'Skor: ' + score;

  if (score < 10) {
    scoreBoard.style.color = '#ffeb3b';
  } else if (score < 20) {
    scoreBoard.style.color = '#ff9800';
  } else {
    scoreBoard.style.color = '#ff5722';
  }
}

// Sinek oluştur
function createFly() {
  const fly = document.createElement('div');
  fly.classList.add('falling-object');

  fly.style.left =
    Math.random() * (gameContainer.offsetWidth - 24) + 'px';

  gameContainer.appendChild(fly);

  let fallingInterval = setInterval(() => {
    let topPosition = parseInt(
      window.getComputedStyle(fly).getPropertyValue('top') || '0',
      10
    );

    if (topPosition >= gameContainer.offsetHeight - frog.offsetHeight - 30) {
      const frogRect = frog.getBoundingClientRect();
      const flyRect = fly.getBoundingClientRect();

      const isColliding =
        flyRect.left < frogRect.right &&
        flyRect.right > frogRect.left &&
        flyRect.bottom >= frogRect.top &&
        flyRect.top <= frogRect.bottom;

      if (isColliding) {
        updateScore(2); // her sinek 2 puan
      }

      clearInterval(fallingInterval);
      gameContainer.removeChild(fly);
    } else {
      fly.style.top = topPosition + 5 + 'px';
    }
  }, 50);
}

// Düzenli aralıklarla sinek düşür
setInterval(createFly, 900);
