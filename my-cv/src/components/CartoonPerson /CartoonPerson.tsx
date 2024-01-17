import React, { useState } from "react";
import classes from "./CartoonPerson.module.css";

export function CartoonPerson() {
  const [isBored, setIsBored] = useState<boolean>(false);

  const handleClick = () => {
    setIsBored(!isBored);
  };

  return (
    <div
      className={`${classes.cartoon} ${isBored ? classes.boredCartoon : ""}`}
      onClick={handleClick}
    >
      <div className={classes.head}></div>
      <div className={classes.body}></div>
    </div>
  );
}
