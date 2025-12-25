import { useState } from "react";
import type { Area, Rank, Suit } from "./types";
import { getValue } from "./util";

interface CardProps {
  area: Area;
  rank: Rank;
  suit: Suit;
}

const Card = ({ area, rank, suit }: CardProps) => {
  const [location, setLocation] = useState(area);

  let imgUrl;
  if (area === "pdeck" || area === "edeck") {
    imgUrl = "/Back.svg";
  } else {
    const filename = `${rank}${suit}`;
    imgUrl = `/faces/${filename}.svg`;
  }

  const handleClick = (e: any) => {
    // console.log("Clicked", e);
    if (location === "hand") {
      let v = getValue(rank);
      if (v < 6) {
        console.log("card too low! value: ", v);
      }
    }
  };

  return (
    <img
      src={imgUrl}
      className="top-2 left-2 cursor-pointer transition-shadow duration-200 hover:shadow-lg rounded-xl"
      onClick={handleClick}
      width={125}
    ></img>
  );
};

export default Card;
