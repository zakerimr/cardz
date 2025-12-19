import "./App.css";
import Card from "./Card";
import type { Rank, Suit } from "./types";
import { ranks, suits } from "./types";
import { shuffleArray } from "./shuffle";

function App() {
  console.log("ranks", ranks);

  const deck: string[] = [];

  for (const rank of ranks) {
    for (const suit of suits) {
      deck.push(`${rank}${suit}`);
    }
  }

  const shuffled_deck: string[] = shuffleArray(deck);

  const cards = shuffled_deck.map((c) => (
    <Card key={c} area="upcard" rank={c[0] as Rank} suit={c[1] as Suit} />
  ));

  return (
    <>
      <h1>Cardz</h1>
      <div className="container flex flex-row">
        {cards[0]}
        {cards[1]}
      </div>
    </>
  );
}

export default App;
