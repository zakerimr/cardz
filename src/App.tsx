import "./App.css";
import Card from "./Card";
import type { Rank, Suit } from "./types";
import { ranks, suits } from "./types";
import type { Area } from "./types";
import { shuffleArray } from "./shuffle";

function App() {
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

  // deck = 51
  //        -5 = 46  (hand)
  //        -1 = 45  (upcard)
  //        -1 = 44  (ace of spades)

  let shuffled_deck: string[] = shuffleArray(deck);

  interface CardSet {
    area: Area;
    cards: string[];
  }

  const hand: CardSet = {
    area: "hand",
    cards: shuffled_deck.splice(0, 5),
  };

  const upcard: CardSet = {
    area: "upcard",
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

  console.log("==================================================");

  const renderCardSet = (cardSet: CardSet): React.ReactNode[] =>
    cardSet.cards.map((c) => (
      <Card
        key={`${cardSet.area}-${c}`}
        area={cardSet.area}
        rank={c[0] as Rank}
        suit={c[1] as Suit}
      />
    ));

  const handCards = renderCardSet(hand);
  const upcardCard = renderCardSet(upcard);
  const pdeckCards = renderCardSet(pdeck);
  const edeckCards = renderCardSet(edeck);

  return (
    <>
      <h1 className="text-4xl mb-20">Card Game</h1>
      {/* 
      <div id="upcard" className="relative">
        {upcardCard}
      </div>

      <div id="edeck" className="relative">
        {edeckCards}
      </div>

      <div id="tower" className="relative flex container gap-10">
        {<Card key={"AS"} area="tower" rank="A" suit="S" />}
      </div>

      <div id="pdeck" className="relative">
        {pdeckCards}
      </div> */}

      <div className="w-[250] bg-sky-300">
        dfasdfas sdfasd sfda sdfasddf asd
      </div>

      <div
        id="hand"
        className="flex fixed bottom-4 left-0 w-screen justify-center gap-3"
      >
        {handCards}
        {pdeckCards[0]}
        {pdeckCards.length}
      </div>
    </>
  );
}

export default App;
