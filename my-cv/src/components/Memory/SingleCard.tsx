import classes from "./SingleCard.module.css";
import { Card } from "./Memory";

type Props = {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
};

export const SingleCard = ({
  card,
  handleChoice,
  flipped,
  disabled,
}: Props): JSX.Element => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className={classes.card}>
      <div className={flipped ? classes.flipped : classes[""]}>
        <img className={classes.front} alt="Card Front" src={card.src} />
        <img
          className={classes.back}
          alt="Card back"
          src={process.env.PUBLIC_URL + "/Img/cover.png"}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
