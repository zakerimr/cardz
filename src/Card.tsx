import React from "react";
import type { Area, Suit, Rank } from './types'

interface CardProps {
  area: Area,
  suit: Suit,
  rank: Rank
}

const Card = ({ area, rank, suit }: CardProps) => {
  if (typeof rank === "number" && (rank > 10 || rank < 2)) {
    throw new RangeError("Invalid card!");
  }
  const filename = (rank + suit).toUpperCase()
  const imgUrl = `/public/faces/${filename}.svg`

  return (
    <div>
      <img className="border-2" src={imgUrl}></img>
      <span>Card ({area}, {suit}, {rank})</span>
    </div>
    )
};

export default Card;
