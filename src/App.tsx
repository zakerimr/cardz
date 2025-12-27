import "./App.css";
import Card from "./Card";
import type { Rank, Suit, CardSet, Area } from "./types";
import { useRef } from "react";
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/dist/Flip";
import setup from "./setup";

function App() {
  gsap.registerPlugin(Flip);

  const enemyRef = useRef<HTMLDivElement>(null);

  const changePos = (card: EventTarget | null, destination: Area): void => {
    const el = enemyRef.current;
    if (!el) return console.log("enemyRef is falsy!", enemyRef.current);

    if (destination === "enemy") {
      const c = card as HTMLImageElement;
      const state = Flip.getState(c);

      el.style.position = "absolute";
      el.appendChild(c);

      // Flip.from(state, { duration: 2, ease: "none" });
    }
  };

  const renderCardSet = (cardSet: CardSet): React.ReactNode[] =>
    cardSet.cards.map((c) => (
      <Card
        key={`${cardSet.area}-${c}`}
        area={cardSet.area}
        rank={c[0] as Rank}
        suit={c[1] as Suit}
        changePos={changePos}
        ref={useRef(null)}
      />
    ));

  const sets = setup();

  const handCards = renderCardSet(sets.hand);
  const enemyCards = renderCardSet(sets.enemy);
  const pdeckCards = renderCardSet(sets.pdeck);
  const edeckCards = renderCardSet(sets.edeck);

  return (
    <>
      <h1 className="text-4xl mb-20">Card Game</h1>

      <div className="flex gap-6 bg-green-500">
        {/* Enemy upcard */}
        <div id="enemy" ref={enemyRef} className="relative">
          {enemyCards}
        </div>

        <div id="edeck">{edeckCards[0]}</div>
      </div>

      <div
        id="hand"
        className="flex fixed bottom-4 left-0 w-screen justify-center gap-3 bg-sky-500"
      >
        {handCards}
        {pdeckCards[0]}
      </div>

      <div
        id="tower"
        className="fixed flex flex-col justify-end bottom-4 right-4 h-screen bg-red-500"
      >
        <Card
          key={"base"}
          area="tower"
          rank="A"
          suit="S"
          changePos={changePos}
          ref={useRef(null)}
        />
      </div>
    </>
  );
}

export default App;
