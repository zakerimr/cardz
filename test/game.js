import { shuffleArray } from "./util.js";
import { getActions, doAction } from "./action.js";
import * as readline from "node:readline";

(() => {
  const TOWER_BASE = "AS";
  const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, "A", "K", "Q", "J", "T"];
  const SUITS = ["C", "D", "H", "S"];

  let deck = [];

  for (const RANK of RANKS) {
    for (const SUIT of SUITS) {
      let rs = `${RANK}${SUIT}`;
      if (rs === TOWER_BASE) {
        continue;
      }
      deck.push(rs);
    }
  }

  let shuffledDeck = shuffleArray(deck);

  // Default state
  const gameState = {
    playerDeck: shuffledDeck.splice(0, 25),
    playerHand: shuffledDeck.splice(0, 5),
    enemyCard: shuffledDeck.shift(),
    enemyDeck: shuffledDeck,
    tower: [TOWER_BASE],
  };

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const logGameState = (stateObj) => {
    console.log(`
=================================
Hand: ${stateObj.playerHand}
Enemy Card: ${stateObj.enemyCard}
Tower: ${stateObj.tower}
Player Deck Cards: ${stateObj.playerDeck.length}
Enemy Deck Cards:  ${stateObj.enemyDeck.length}
Bonus: ${Math.floor(stateObj.tower.length / 2)}
Actions: ${[...getActions(stateObj)].map((arr) => arr[0])}
    `);
  };

  const playGame = () => {
    logGameState(gameState);

    const actionSet = getActions(gameState);
    if (actionSet.size <= 0) {
      console.log("GAME OVER! You lost.");
      return rl.close();
    }

    rl.question("Perform which action? ", (input) => {
      if (input === "exit") {
        console.log("Closing game...");
        return rl.close();
      }

      let [action, card] = input.split(" ");

      let isCardValid;
      if (action === "DRAW" || action === "NUKE") {
        isCardValid = true;
      } else {
        isCardValid =
          gameState.playerHand.includes(card) ||
          gameState.tower[gameState.tower.length - 1] === card;
      }

      let isActionValid = [...actionSet]
        .map((arr) => arr[0])
        .includes(action.toUpperCase());

      if (!isCardValid || !isActionValid) {
        console.log("Invalid input!");
      } else {
        doAction(action, card, gameState);
      }
      playGame();
    });
  };

  playGame();
})();
