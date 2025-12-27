import { getValue, getColor, shuffleArray } from "./util.js";
import { getActions, doAction } from "./action.js";
import * as readline from "node:readline";

(() => {
  const TOWER_BASE = "AS";

  const gameState = {
    playerDeck: [],
    playerHand: [],
    enemyCard: null,
    enemyDeck: [],
    tower: [TOWER_BASE],
  };

  const ranks = [2, 3, 4, 5, 6, 7, 8, 9, "A", "K", "Q", "J", "T"];
  const suits = ["C", "D", "H", "S"];

  const deck = [];

  for (const rank of ranks) {
    for (const suit of suits) {
      let rs = `${rank}${suit}`;
      if (rs === TOWER_BASE) {
        continue;
      }
      deck.push(`${rank}${suit}`);
    }
  }

  let shuffledDeck = shuffleArray(deck);

  gameState.playerDeck = shuffledDeck.splice(0, 25);
  gameState.playerHand = shuffledDeck.splice(0, 5);
  gameState.enemyCard = shuffledDeck.shift();
  gameState.enemyDeck = shuffledDeck; // 20 cards

  const logGameState = (stateObj) => {
    console.log("=================================");
    console.log("Hand: ", ...stateObj.playerHand);
    console.log("Enemy Card: ", stateObj.enemyCard);
    console.log("Tower: ", ...stateObj.tower);
    console.log(
      "Actions: ",
      [...getActions(gameState)].map((arr) => arr[0]),
    );
  };

  logGameState(gameState);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const playGame = () => {
    rl.question("Perform which action? ", (input) => {
      if (input === "exit") {
        console.log("Closing game...");
        return rl.close();
      }
      logGameState(gameState);
      let [action, card] = input.split(" ");

      let isCardValid;
      if (action === "DRAW" || action === "NUKE") {
        isCardValid = true;
      } else {
        isCardValid =
          gameState.playerHand.includes(card) ||
          gameState.tower[gameState.tower.length - 1] === card;
      }

      let isActionValid = [...getActions(gameState)]
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
