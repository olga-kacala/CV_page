import { useState, useEffect } from "react";
import classes from "./Memory.module.css";
import { SingleCard } from "./SingleCard";

export type Card = {
  id: number;
  src: string;
  matched: boolean;
};

const cardImages = [
  { src: process.env.PUBLIC_URL + "/Img/Pola.png", matched: false },
  { src: process.env.PUBLIC_URL + "/Img/cactus.png", matched: false },
  { src: process.env.PUBLIC_URL + "/Img/banana.png", matched: false },
  { src: process.env.PUBLIC_URL + "/Img/noisyPola.png", matched: false },
  { src: process.env.PUBLIC_URL + "/Img/cat.png", matched: false },
  { src: process.env.PUBLIC_URL + "/Img/catInGlasses.png", matched: false },
];

export const Memory = (): JSX.Element => {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className={classes.memory}>
      <h1>Memory Match</h1>
      <h2>Turns:{turns}</h2>
      <div className={classes.cardGrid}>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
};
