interface RandomPositionOnGridArgs {
  gridSize?: number;
  treshold: number;
}

export const randomPositionOnGrid = ({
  gridSize = 5,
  treshold,
}: RandomPositionOnGridArgs) => 
  Math.floor(Math.random() * (treshold / gridSize)) * gridSize;
