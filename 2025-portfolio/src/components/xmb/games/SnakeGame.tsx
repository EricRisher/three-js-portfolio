"use client";
import { useEffect, useRef, useState } from "react";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // React state for UI
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // show modal/start button before the user starts the game
  const [hasStarted, setHasStarted] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);

  // Internal refs used by the game loop (stable across renders)
  const scoreRef = useRef(0);
  const highScoreRef = useRef(0);
  const runningRef = useRef(false); // start paused until user starts
  const lastTimeRef = useRef(0);
  const accRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const loopRef = useRef<((time: number) => void) | null>(null);

  const unitSize = 30;
  const gameWidth = 630;
  const gameHeight = 630;
  const moveDelay = 100; // ms per move

  const snakeColor = "#3f8b34";
  const snakeBorder = "#fff1b7";
  const boardBackground = "#fff1b7";
  const foodColor = "#ff4d4d";

  const snakeRef = useRef<{ x: number; y: number }[]>([
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ]);

  const velocityRef = useRef({ x: unitSize, y: 0 });
  const nextDirectionRef = useRef<{ x: number; y: number } | null>(null);
  const queuedDirectionRef = useRef<{ x: number; y: number } | null>(null);
  const foodRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // --- Helpers
  const spawnFood = (snakeBody: { x: number; y: number }[]) => {
    const positions: { x: number; y: number }[] = [];
    for (let x = 0; x < gameWidth; x += unitSize) {
      for (let y = 0; y < gameHeight; y += unitSize) {
        positions.push({ x, y });
      }
    }
    const free = positions.filter(
      (pos) => !snakeBody.some((s) => s.x === pos.x && s.y === pos.y)
    );
    if (free.length === 0) {
      foodRef.current = { x: 0, y: 0 };
      return;
    }
    const idx = Math.floor(Math.random() * free.length);
    foodRef.current = free[idx];
  };

  const checkCollision = (snakeBody: { x: number; y: number }[]) => {
    const head = snakeBody[0];
    if (head.x < 0 || head.x >= gameWidth || head.y < 0 || head.y >= gameHeight)
      return true;
    for (let i = 1; i < snakeBody.length; i++) {
      if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) return true;
    }
    return false;
  };

  const gameOver = (ctx: CanvasRenderingContext2D) => {
    runningRef.current = false;
    // cancel any pending frame so resetGame can reliably restart the loop
    if (animationFrameRef.current != null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    ctx.font = "50px MV Boli, sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
    // show start modal so user can re-enter via Start
    setHasStarted(false);
    setShowStartModal(true);
  };

  const resetGame = () => {
    scoreRef.current = 0;
    setScore(0);
    velocityRef.current = { x: unitSize, y: 0 };
    nextDirectionRef.current = null;
    queuedDirectionRef.current = null;
    snakeRef.current = [
      { x: unitSize * 4, y: 0 },
      { x: unitSize * 3, y: 0 },
      { x: unitSize * 2, y: 0 },
      { x: unitSize, y: 0 },
      { x: 0, y: 0 },
    ];
    spawnFood(snakeRef.current);
    runningRef.current = true;
    // restart loop timestamps
    lastTimeRef.current = performance.now();
    accRef.current = 0;
    // always start a fresh RAF using the stored loopRef
    if (loopRef.current) {
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      animationFrameRef.current = requestAnimationFrame(loopRef.current);
    }
  };

  // --- Keyboard Input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Enter opens start modal when not started
      if (e.key === "Enter" && !hasStarted) {
        setShowStartModal(true);
        return;
      }

      const LEFT = ["ArrowLeft", "a", "A"];
      const UP = ["ArrowUp", "w", "W"];
      const RIGHT = ["ArrowRight", "d", "D"];
      const DOWN = ["ArrowDown", "s", "S"];

      const refX = nextDirectionRef.current
        ? nextDirectionRef.current.x
        : velocityRef.current.x;
      const refY = nextDirectionRef.current
        ? nextDirectionRef.current.y
        : velocityRef.current.y;

      let requestedX = refX;
      let requestedY = refY;

      if (LEFT.includes(e.key)) {
        requestedX = -unitSize;
        requestedY = 0;
      } else if (UP.includes(e.key)) {
        requestedX = 0;
        requestedY = -unitSize;
      } else if (RIGHT.includes(e.key)) {
        requestedX = unitSize;
        requestedY = 0;
      } else if (DOWN.includes(e.key)) {
        requestedX = 0;
        requestedY = unitSize;
      } else return;

      // Prevent 180 degree turn
      if (requestedX === -refX && requestedY === -refY) return;

      if (!nextDirectionRef.current) {
        nextDirectionRef.current = { x: requestedX, y: requestedY };
      } else {
        queuedDirectionRef.current = { x: requestedX, y: requestedY };
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasStarted]);

  // --- Initialize high score and spawn initial food
  useEffect(() => {
    const stored = localStorage.getItem("snakeHighScore");
    const parsed = stored ? parseInt(stored, 10) || 0 : 0;
    highScoreRef.current = parsed;
    setHighScore(parsed);

    spawnFood(snakeRef.current);
    // no deps -> run once
  }, []);

  // --- Game loop (single effect)
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const loopFn = (time: number) => {
      if (!runningRef.current) {
        animationFrameRef.current = null;
        return;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      accRef.current += delta;

      if (accRef.current >= moveDelay) {
        accRef.current = 0;

        const snake = [...snakeRef.current];
        let nextVelocity = velocityRef.current;

        if (nextDirectionRef.current) {
          nextVelocity = nextDirectionRef.current;
          velocityRef.current = nextDirectionRef.current;
          nextDirectionRef.current = queuedDirectionRef.current;
          queuedDirectionRef.current = null;
        }

        const head = {
          x: snake[0].x + nextVelocity.x,
          y: snake[0].y + nextVelocity.y,
        };
        snake.unshift(head);

        // Eating food
        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
          scoreRef.current += 1;
          setScore(scoreRef.current);
          if (scoreRef.current > highScoreRef.current) {
            highScoreRef.current = scoreRef.current;
            setHighScore(highScoreRef.current);
            localStorage.setItem(
              "snakeHighScore",
              highScoreRef.current.toString()
            );
          }
          spawnFood(snake);
        } else {
          snake.pop();
        }

        if (checkCollision(snake)) {
          gameOver(ctx);
          return;
        }

        snakeRef.current = snake;

        // Draw board
        ctx.fillStyle = boardBackground;
        ctx.fillRect(0, 0, gameWidth, gameHeight);

        // Draw food
        ctx.fillStyle = foodColor;
        ctx.fillRect(foodRef.current.x, foodRef.current.y, unitSize, unitSize);

        // Draw snake
        ctx.fillStyle = snakeColor;
        ctx.strokeStyle = snakeBorder;
        snake.forEach((part) => {
          ctx.fillRect(part.x, part.y, unitSize, unitSize);
          ctx.strokeRect(part.x, part.y, unitSize, unitSize);
        });
      }

      animationFrameRef.current = requestAnimationFrame(loopFn);
    };
    // expose loopFn so resetGame can restart the animation
    loopRef.current = loopFn;

    // start loop (keeps loopRef available). actual movement guarded by runningRef.
    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(loopFn);

    // cleanup
    return () => {
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
    // empty deps so it runs once
  }, []);

  // Start handler used by Start button
  const handleStart = () => {
    setHasStarted(true);
    setShowStartModal(false);
    // reset and start game loop
    resetGame();
  };

  return (
    <div className="flex flex-col items-center text-center">
      <canvas
        ref={canvasRef}
        width={gameWidth}
        height={gameHeight}
      />

      {/* Score / High Score row - centered vertically */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <div className="flex flex-col items-center">
          <div className="text-sm text-black">SCORE</div>
          <div className="text-3xl font-bold">{score}</div>
        </div>
        <div className="w-px h-8 bg-black/20" />
        <div className="flex flex-col items-center">
          <div className="text-sm text-black">HIGH SCORE</div>
          <div className="text-xl">{highScore}</div>
        </div>
      </div>

      {/* Start modal/overlay */}
      {showStartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <button
            onClick={handleStart}
            className="bg-[#69603b] hover:bg-[#1e40af] text-white font-bold py-2 px-6 rounded-lg"
          >
            START
          </button>
        </div>
      )}
    </div>
  );
}
