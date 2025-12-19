import type { Area, Rank, Suit } from "./types";

interface CardProps {
  area: Area;
  rank: Rank;
  suit: Suit;
}

const Card = ({ area, rank, suit }: CardProps) => {
  let imgUrl;
  if (area === "deck") {
    imgUrl = "/Back.svg";
  } else {
    const filename = `${rank}${suit}`;
    imgUrl = `/faces/${filename}.svg`;
  }

  return (
    <img
      src={imgUrl}
      className="cursor-pointer transition-shadow duration-200 hover:shadow-lg"
    ></img>
  );
};

export default Card;
