import { type RefObject } from "react";
import type { Area, Rank, Suit } from "./types";
// import { getValue } from "./util";

interface CardProps {
  ref: RefObject<HTMLImageElement> | RefObject<null>;
  area: Area;
  rank: Rank;
  suit: Suit;
  changePos: (card: EventTarget | null, destination: Area) => void;
}

const Card = ({ ref, area, rank, suit, changePos }: CardProps) => {
  let imgUrl;
  if (area === "pdeck" || area === "edeck") {
    imgUrl = "/Back.svg";
  } else {
    const filename = `${rank}${suit}`;
    imgUrl = `/faces/${filename}.svg`;
  }

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    // console.log("Card value: ", getValue(rank));
    if (area === "hand") {
      changePos(event.target, "enemy");
    }
  };

  return (
    <img
      src={imgUrl}
      ref={ref}
      className="cursor-pointer rounded-xl transition-transform hover:-translate-y-2 CARDREF"
      onClick={handleClick}
      width={125}
    ></img>
  );
};

export default Card;
