import { Position } from "../GameLogic";

interface DrawArgs {
  ctx: CanvasRenderingContext2D;
  snakeBody: Position[];
  foodPosition?: Position;
}

export const SEGMENT_SIZE = 5;

export const draw = ({ ctx, snakeBody, foodPosition }: DrawArgs) => { 
if(foodPosition) {
  ctx.fillStyle = 'green';
  ctx.fillRect(foodPosition?.x, foodPosition?.y, SEGMENT_SIZE, SEGMENT_SIZE);
}

  ctx.fillStyle = 'red';
  snakeBody.forEach((segment) =>
    ctx.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
  );
};
