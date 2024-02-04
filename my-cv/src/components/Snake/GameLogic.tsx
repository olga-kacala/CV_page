import { useState, useEffect } from "react";
import { SEGMENT_SIZE } from "./Draw/Draw";
import { UseInterval } from "./Utils/UseInterval";
import { createSnakeMovement } from "./Movement";
import { randomPositionOnGrid } from "./RandomPositionOnGrid";
import { willSnakeHitTheFood } from "./Movement";
import { hasSnakeEatenItself } from "./Movement";
import { GameState } from "./Snake";

export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}
const movementSpeed = 100;

interface UseGameLogicArgs {
  canvasWidth?: number;
  canvasHeight?: number;
  onGameOver: () => void;
  gameState: GameState;
}

export const useGameLogic = ({
  canvasWidth,
  canvasHeight,
  onGameOver,
  gameState,
}: UseGameLogicArgs) => {
  const [direction, setDirection] = useState<Direction | undefined>();
  const [snakeBody, setSnakeBody] = useState<Position[]>([
    {
      x: 0,
      y: 0,
    },
  ]);

  const resetGameState = () => {
    setDirection(undefined);
    setFoodPosition({
      x: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        treshold: canvasWidth!,
      }),
      y: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        treshold: canvasHeight!,
      }),
    });
    setSnakeBody([
      {
        x: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          treshold: canvasWidth!,
        }),
        y: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          treshold: canvasHeight!,
        }),
      },
    ]);
  };

  const [foodPosition, setFoodPosition] = useState<Position | undefined>();
  const snakeHeadPosition = snakeBody[snakeBody.length - 1];
  const { moveDown, moveUp, moveLeft, moveRight } = createSnakeMovement();

  useEffect(() => {
    if (!canvasHeight || !canvasWidth) {
      return;
    }
    setFoodPosition({
      x: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        treshold: canvasWidth,
      }),
      y: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        treshold: canvasHeight,
      }),
    });
    setSnakeBody([
      {
        x: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          treshold: canvasWidth,
        }),
        y: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          treshold: canvasHeight,
        }),
      },
    ]);
  }, [canvasHeight, canvasWidth]);

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "KeyS":
        if (direction !== Direction.UP) {
          setDirection(Direction.DOWN);
        }
        break;

      case "KeyW":
        if (direction !== Direction.DOWN) {
          setDirection(Direction.UP);
        }
        break;

      case "KeyD":
        if (direction !== Direction.LEFT) {
          setDirection(Direction.RIGHT);
        }
        break;

      case "KeyA":
        if (direction !== Direction.RIGHT) {
          setDirection(Direction.LEFT);
        }
        break;
    }
  };

  const moveSnake = () => {
    let snakeBodyAfterMovement: Position[] | undefined;
    switch (direction) {
      case Direction.UP:
        if (snakeHeadPosition.y > 0) {
          snakeBodyAfterMovement = moveUp(snakeBody);
        } else if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) {
          setDirection(Direction.LEFT);
        } else {
          setDirection(Direction.RIGHT);
        }
        break;
      case Direction.DOWN:
        if (canvasHeight && snakeHeadPosition.y < canvasHeight - SEGMENT_SIZE) {
          snakeBodyAfterMovement = moveDown(snakeBody);
        } else if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) {
          setDirection(Direction.LEFT);
        } else {
          setDirection(Direction.RIGHT);
        }

        break;
      case Direction.LEFT:
        if (snakeHeadPosition.x > 0) {
          snakeBodyAfterMovement = moveLeft(snakeBody);
        } else if (canvasHeight && snakeHeadPosition.y < canvasHeight / 2) {
          setDirection(Direction.DOWN);
        } else {
          setDirection(Direction.UP);
        }
        break;
      case Direction.RIGHT:
        if (canvasWidth && snakeHeadPosition.x < canvasWidth - SEGMENT_SIZE) {
          snakeBodyAfterMovement = moveRight(snakeBody);
        } else if (canvasHeight && snakeHeadPosition.y < canvasHeight / 2) {
          setDirection(Direction.DOWN);
        } else {
          setDirection(Direction.UP);
        }
        break;
    }

    if (snakeBodyAfterMovement) {
      const isGameOver = hasSnakeEatenItself(snakeBodyAfterMovement);
      if (isGameOver) {
        onGameOver();
      }
    }

    if (
      direction !== undefined &&
      foodPosition &&
      willSnakeHitTheFood({
        foodPosition,
        snakeHeadPosition,
        direction,
      })
    ) {
      setSnakeBody([
        ...snakeBodyAfterMovement!,
        { x: foodPosition.x, y: foodPosition.y },
      ]);
      setFoodPosition({
        x: randomPositionOnGrid({ treshold: canvasWidth! }),
        y: randomPositionOnGrid({ treshold: canvasHeight! }),
      });
    } else if (snakeBodyAfterMovement) {
      setSnakeBody(snakeBodyAfterMovement);
    }
  };

  UseInterval(
    moveSnake,
    gameState === GameState.RUNNING ? movementSpeed : null
  );

  return {
    snakeBody,
    onKeyDownHandler,
    foodPosition,
    resetGameState,
  };
};
