import { type CardSet, ranks, suits } from "./types";
import { shuffleArray } from "./shuffle";

interface output {
  hand: CardSet;
  enemy: CardSet;
  pdeck: CardSet;
  edeck: CardSet;
}

const setup = (): output => {
  const deck: string[] = [];

  for (const rank of ranks) {
    for (const suit of suits) {
      let rs = `${rank}${suit}`;
      if (rs === "AS") {
        continue;
      }
      deck.push(`${rank}${suit}`);
    }
  }
  let shuffled_deck: string[] = shuffleArray(deck);

  const hand: CardSet = {
    area: "hand",
    cards: shuffled_deck.splice(0, 5),
  };

  const enemy: CardSet = {
    area: "enemy",
    cards: shuffled_deck.splice(0, 1),
  };

  const pdeck: CardSet = {
    area: "pdeck",
    cards: shuffled_deck.splice(0, 22),
  };

  const edeck: CardSet = {
    area: "edeck",
    cards: shuffled_deck,
  };

  return {
    hand: hand,
    enemy: enemy,
    pdeck: pdeck,
    edeck: edeck,
  };
};

export default setup;
