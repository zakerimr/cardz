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
      <h1 className="text-4xl mb-20">Card Game</h1>

      <div className="flex container gap-10">
        {cards[0]}
        <img
          src="/Back.svg"
          className="max-h-[250px] w-auto cursor-pointer transition-shadow duration-200 hover:shadow-lg"
        />
      </div>

      <div className="flex fixed bottom-4 left-0 w-screen justify-center gap-3">
        {...cards.slice(-5)}
      </div>
    </>
  );
}

export default App;
