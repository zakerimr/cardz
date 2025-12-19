import React from "react";

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
    <div>
      <img className="border-2" src={imgUrl} width={250}></img>
      <span>
        Card ({area}, {suit}, {rank})
      </span>
    </div>
  );
};

export default Card;
