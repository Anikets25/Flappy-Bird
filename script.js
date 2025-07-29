const bird = document.getElementById("bird");
const pipeTop = document.getElementById("pipe-top");
const pipeBottom = document.getElementById("pipe-bottom");
const scoreDisplay = document.getElementById("score");

let birdTop = 200;
let gravity = 2;
let isJumping = false;
let pipeLeft = 400;
let pipeGap = 150;
let score = 0;

function jump() {
  if (!isJumping) {
    isJumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
      if (jumpHeight > 15) {
        clearInterval(jumpInterval);
        isJumping = false;
      }
      birdTop -= 5;
      jumpHeight++;
      bird.style.top = birdTop + "px";
    }, 10);
  }
}

document.addEventListener("keydown", jump);

function gameLoop() {
  birdTop += gravity;
  bird.style.top = birdTop + "px";

  pipeLeft -= 2;
  if (pipeLeft < -60) {
    pipeLeft = 400;
    let pipeHeight = Math.floor(Math.random() * 200) + 50;
    pipeTop.style.height = pipeHeight + "px";
    pipeBottom.style.height = 500 - pipeHeight - pipeGap + "px";
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
  }

  pipeTop.style.left = pipeLeft + "px";
  pipeBottom.style.left = pipeLeft + "px";

  // Collision detection
  if (
    birdTop < 0 ||
    birdTop > 470 ||
    (pipeLeft < 80 && pipeLeft > 20 &&
     (birdTop < pipeTop.offsetHeight || birdTop > 500 - pipeBottom.offsetHeight))
  ) {
    alert("Game Over! Your Score: " + score);
    location.reload();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
