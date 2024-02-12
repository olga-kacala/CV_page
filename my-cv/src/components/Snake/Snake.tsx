import React, { useRef, useState } from "react";
import { Canvas } from "./Canvas/Canvas";
import classes from "./Snake.module.css";
import { useGameLogic } from "./GameLogic";
import { draw } from "./Draw/Draw";

interface GameProps {}

export enum GameState {
  RUNNING,
  GAME_OVER,
  PAUSE,
}

export const Snake: React.FC<GameProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.RUNNING);

  const onGameOver = () => setGameState(GameState.GAME_OVER);

  const { snakeBody, onKeyDownHandler, foodPosition, resetGameState } =
    useGameLogic({
      canvasHeight: 150,
      canvasWidth: 300,
      onGameOver,
      gameState,
    });
  const drawGame = (ctx: CanvasRenderingContext2D) => {
    draw({ ctx, snakeBody, foodPosition });
  };
  return (
    <div className={classes.snakeContainer}>
      <div className={classes.snakeTitle}>Snake it</div>
      <h2>{`Your score: ${(snakeBody.length - 1) * 10}`}</h2>
      {gameState === GameState.GAME_OVER && (
        <div className={classes.congratsMessage}>
          Game over! You finished the game with {(snakeBody.length - 1) * 10}{" "}
          turns!
        </div>
      )}
      <div className={classes.Snake} onKeyDown={onKeyDownHandler} tabIndex={0}>
        <Canvas ref={canvasRef} draw={drawGame} />
        <p>
          <strong>Pro tip</strong>: use <kbd>w,s,a,d</kbd> keys to move
        </p>
        {gameState === GameState.GAME_OVER ? (
          <button
            onClick={() => {
              setGameState(GameState.RUNNING);
              resetGameState();
            }}
          >
            Play Again!
          </button>
        ) : (
          <button
            onClick={() => {
              setGameState(
                gameState === GameState.RUNNING
                  ? GameState.PAUSE
                  : GameState.RUNNING
              );
            }}
          >
            {gameState === GameState.RUNNING ? "Pause" : "Play"}{" "}
          </button>
        )}
      </div>
    </div>
  );
}