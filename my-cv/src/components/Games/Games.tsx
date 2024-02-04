import classes from "./Games.module.css";
import { useNavigate } from "react-router-dom";

export function Games() {
  const navigate = useNavigate();

  return (
    <div className={classes.gameContainer}>
      <div className={classes.inviteBox}>
        <div className={classes.hello}>Hello</div>
        <h2>So, you want to play a little game?</h2>
      </div>
      <div className={classes.imageContainer}>
        <img
          title="Let's play memory"
          alt="Card back"
          src={process.env.PUBLIC_URL + "/Img/cover.png"}
          onClick={() => navigate("/Memory")}
        />

        <img
          title="Let's play snake"
          alt="Snake"
          src={process.env.PUBLIC_URL + "/Img/snake.jpeg"}
          onClick={() => navigate("/Snake")}
        />
      </div>
    </div>
  );
}
