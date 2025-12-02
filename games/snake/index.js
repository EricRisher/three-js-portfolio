const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

let highScore = 0;
const highScoreText = initHighScoreUI();

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "#fff1b7";
const snakeColor = "#3f8b34";
const snakeBorder = "#fff1b7";
const foodColor = "#ff4d4d";

const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let nextDirection = null;
let queuedDirection = null;
let foodX;
let foodY;
let score = 0;
var timeout = setTimeout;

let snake = [
  {
    x: unitSize * 4,
    y: 0,
  },
  {
    x: unitSize * 3,
    y: 0,
  },
  {
    x: unitSize * 2,
    y: 0,
  },
  {
    x: unitSize,
    y: 0,
  },
  {
    x: 0,
    y: 0,
  },
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  loadHighScore();
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if (running) {
    timeout = setTimeout(() => {
      clearBoard();
      drawFood();
      if (nextDirection) {
        xVelocity = nextDirection.x;
        yVelocity = nextDirection.y;
        nextDirection = queuedDirection;
        queuedDirection = null;
      }
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100);
  } else {
    displayGameOver();
  }
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
  // Build a list of all grid-aligned positions, then filter out any occupied by
  // the snake. This guarantees we never spawn food on the snake body.
  const positions = [];
  for (let x = 0; x < gameWidth; x += unitSize) {
    for (let y = 0; y < gameHeight; y += unitSize) {
      positions.push({ x, y });
    }
  }

  const freePositions = positions.filter(
    (pos) => !snake.some((part) => part.x === pos.x && part.y === pos.y)
  );

  if (freePositions.length === 0) {
    // No free space: stop the game (optional: you could instead display a win)
    running = false;
    return;
  }

  const idx = Math.floor(Math.random() * freePositions.length);
  foodX = freePositions[idx].x;
  foodY = freePositions[idx].y;
}

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);

  // Did snake eat food?
  if (snake[0].x === foodX && snake[0].y === foodY) {
    score += 1;
    scoreText.textContent = score;
    // Update high score live
    if (score > highScore) {
      highScore = score;
      saveHighScore();
    }
    createFood();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;

  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  // WASD keys
  const A = 65; // left
  const W = 87; // up
  const D = 68; // right
  const S = 83; // down

  const goingUp = yVelocity === -unitSize;
  const goingDown = yVelocity === unitSize;
  const goingRight = xVelocity === unitSize;
  const goingLeft = xVelocity === -unitSize;

  // Compute the requested direction velocities for this key press.
  let requestedX = xVelocity;
  let requestedY = yVelocity;

  switch (true) {
    case keyPressed === LEFT || keyPressed === A:
      requestedX = -unitSize;
      requestedY = 0;
      break;
    case keyPressed === UP || keyPressed === W:
      requestedX = 0;
      requestedY = -unitSize;
      break;
    case keyPressed === RIGHT || keyPressed === D:
      requestedX = unitSize;
      requestedY = 0;
      break;
    case keyPressed === DOWN || keyPressed === S:
      requestedX = 0;
      requestedY = unitSize;
      break;
    default:
      return; // not an arrow/WASD key
  }

  const refX = nextDirection ? nextDirection.x : xVelocity;
  const refY = nextDirection ? nextDirection.y : yVelocity;

  if (requestedX === -refX && requestedY === -refY) return;

  if (!nextDirection) {
    nextDirection = { x: requestedX, y: requestedY };
  } else {
    queuedDirection = { x: requestedX, y: requestedY };
  }
}

function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }

  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      running = false;
    }
  }
}

function displayGameOver() {
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
  running = false;
}

function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  nextDirection = null;
  queuedDirection = null;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  clearTimeout(timeout);
  gameStart();
}

function initHighScoreUI() {
  let el = document.querySelector("#highScoreText");
  if (!el) {
    el = document.createElement("div");
    el.id = "highScoreText";
    el.style.marginTop = "8px";
    const container = document.querySelector("#gameContainer") || document.body;
    if (resetBtn && resetBtn.parentNode) {
      resetBtn.parentNode.insertBefore(el, resetBtn.nextSibling);
    } else {
      container.appendChild(el);
    }
  }
  return el;
}

function loadHighScore() {
  try {
    const stored = localStorage.getItem("snakeHighScore");
    highScore = stored ? parseInt(stored, 10) : 0;
  } catch (e) {
    highScore = 0;
  }
  highScoreText.textContent = `High: ${highScore}`;
}

function saveHighScore() {
  try {
    localStorage.setItem("snakeHighScore", String(highScore));
  } catch (e) {
    // ignore storage errors
  }
  highScoreText.textContent = `High: ${highScore}`;
}
