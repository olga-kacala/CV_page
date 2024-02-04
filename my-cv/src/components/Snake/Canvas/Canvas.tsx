import React, { forwardRef, useEffect } from "react";
import classes from "./Canvas.module.css";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  draw: (context: CanvasRenderingContext2D) => void;
};

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ draw, ...props }, canvasRef) => {
    useEffect(() => {
      if (!canvasRef) {
        return;
      }
      const canvas = (canvasRef as React.RefObject<HTMLCanvasElement>).current;
      if (!canvas) {
        return;
      }
      const context = canvas.getContext('2d');
      if(!context){
        return;
      }
      draw(context);
      return ()=>context.clearRect(0,0, window.innerWidth, 400)
    }, [draw, canvasRef]);
    if (!canvasRef) {
      return null;
    }
    return (
        <canvas className={classes.Canvas} ref={canvasRef as any} {...props} 
        width={400}
        height={150}/>
   
    );
  }
);
