// import React, { useRef, useState } from "react";
// import { Canvas } from "./Canvas/Canvas";
// import classes from "./Snake.module.css";
// import { useGameLogic, Direction } from "./GameLogic";
// import { draw } from "./Draw/Draw";

// interface GameProps {}

// export enum GameState {
//   RUNNING,
//   GAME_OVER,
//   PAUSE,
// }

// export const Snake: React.FC<GameProps> = ({}) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [gameState, setGameState] = useState<GameState>(GameState.RUNNING);
//   const [touchStart, setTouchStart] = useState<{ x: number; y: number } | undefined>();
//   const [direction, setDirection] = useState<Direction | undefined>();

//   const onGameOver = () => setGameState(GameState.GAME_OVER);

//   const { snakeBody, onKeyDownHandler, foodPosition, resetGameState } =
//     useGameLogic({
//       canvasHeight: 150,
//       canvasWidth: 300,
//       onGameOver,
//       gameState,
//     });
//   const drawGame = (ctx: CanvasRenderingContext2D) => {
//     draw({ ctx, snakeBody, foodPosition });
//   };

//   const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
//     // Get the initial touch position
//     const touch = event.touches[0];
//     setTouchStart({ x: touch.clientX, y: touch.clientY });
//   };

//   const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
//     // Check if touchStart is defined
//     if (!touchStart) {
//       return;
//     }

//     // Get the final touch position
//     const touch = event.changedTouches[0];
//     const touchEnd = { x: touch.clientX, y: touch.clientY };

//     // Calculate the swipe direction
//     const deltaX = touchEnd.x - touchStart.x;
//     const deltaY = touchEnd.y - touchStart.y;

//     if (Math.abs(deltaX) > Math.abs(deltaY)) {
//       // Horizontal swipe
//       if (deltaX > 0) {
//         setDirection(Direction.RIGHT);
//       } else {
//         setDirection(Direction.LEFT);
//       }
//     } else {
//       // Vertical swipe
//       if (deltaY > 0) {
//         setDirection(Direction.DOWN);
//       } else {
//         setDirection(Direction.UP);
//       }
//     }
//   };


  



//   return (
//     <div className={classes.snakeContainer}>
//       <div className={classes.snakeTitle}>Snake it</div>
//       <h2>{`Your score: ${(snakeBody.length - 1) * 10}`}</h2>
//       {gameState === GameState.GAME_OVER && (
//         <div className={classes.congratsMessage}>
//           Game over! You finished the game with {(snakeBody.length - 1) * 10}{" "}
//           turns!
//         </div>
//       )}
//        <div
//       className={classes.Snake}
//       onKeyDown={onKeyDownHandler}
//       onTouchStart={onTouchStart}
//       onTouchEnd={onTouchEnd}
//       tabIndex={0}
//     >
//         <Canvas ref={canvasRef} draw={drawGame} />
//         <p>
//           <strong>Pro tip</strong>: use <kbd>w,s,a,d</kbd> keys to move
//         </p>
//         {gameState === GameState.GAME_OVER ? (
//           <button
//             onClick={() => {
//               setGameState(GameState.RUNNING);
//               resetGameState();
//             }}
//           >
//             Play Again!
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               setGameState(
//                 gameState === GameState.RUNNING
//                   ? GameState.PAUSE
//                   : GameState.RUNNING
//               );
//             }}
//           >
//             {gameState === GameState.RUNNING ? "Pause" : "Play"}{" "}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };


import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "./Canvas/Canvas";
import classes from "./Snake.module.css";
import { useGameLogic, Direction } from "./GameLogic";
import { draw } from "./Draw/Draw";

interface GameProps {}

export enum GameState {
  RUNNING,
  GAME_OVER,
  PAUSE,
}

export const Snake: React.FC<GameProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // New ref for invisible input
  const [gameState, setGameState] = useState<GameState>(GameState.RUNNING);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | undefined>();
  const [direction, setDirection] = useState<Direction | undefined>();

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

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    // Check if the touch event has at least one target touch
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const rect = canvasRef.current?.getBoundingClientRect();
  
      // Check if the touch event is inside the canvas
      if (
        rect &&
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        // Set the initial touch position
        setTouchStart({ x: touch.clientX, y: touch.clientY });
      }

      // Focus the invisible input to trigger on-screen keyboard
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    // Check if touchStart is defined
    if (!touchStart) {
      return;
    }

    // Get the final touch position
    const touch = event.changedTouches[0];
    const touchEnd = { x: touch.clientX, y: touch.clientY };

    // Calculate the swipe direction
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        setDirection(Direction.RIGHT);
      } else {
        setDirection(Direction.LEFT);
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        setDirection(Direction.DOWN);
      } else {
        setDirection(Direction.UP);
      }
    }
  };

  useEffect(() => {
    // Handle key events globally
    const handleKeyDown = (event: KeyboardEvent) => {
      onKeyDownHandler(event as any as React.KeyboardEvent<HTMLDivElement>); // Cast the event type
    };
  
    document.body.addEventListener('keydown', handleKeyDown);
  
    return () => {
      // Cleanup event listener on component unmount
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyDownHandler]);
  

  return (
    <div className={classes.snakeContainer}>
      <div className={classes.snakeTitle}>Snake it</div>
      <h2>{`Your score: ${(snakeBody.length - 1) * 10}`}</h2>
      {gameState === GameState.GAME_OVER && (
        <div className={classes.congratsMessage}>
          Game over! You finished the game with {(snakeBody.length - 1) * 10} turns!
        </div>
      )}
      <div
        className={classes.Snake}
        onKeyDown={onKeyDownHandler}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        tabIndex={0}
      >
        <Canvas ref={canvasRef} draw={drawGame} />
        {/* Invisible input for triggering on-screen keyboard */}
        <input
          ref={inputRef}
          type="text"
          style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: 0, height: 0 }}
        />
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
};
