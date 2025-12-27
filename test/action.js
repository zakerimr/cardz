import { getValue, getColor } from "./util.js";

const removeFromHand = (card, stateObj) => {
  const index = stateObj.playerHand.indexOf(card);
  if (index > -1) {
    stateObj.playerHand.splice(index);
  }
  // replace card if possible
  if (stateObj.playerDeck.length > 0) {
    stateObj.playerHand.push(stateObj.playerDeck.pop());
  }
};

const replaceEnemyCard = (stateObj) => {
  stateObj.enemyCard = stateObj.enemyDeck.pop();
};

export const doAction = (action, card, stateObj) => {
  switch (action) {
    case "BUILD":
      console.log("Built card ", card);
      removeFromHand(card, stateObj);
      stateObj.tower.push(card);
      break;

    case "SWAP":
      console.log("Swapped card ", card);
      removeFromHand(card, stateObj);
      stateObj.enemyDeck.push(card);
      break;

    case "KILL":
      console.log("Killed with card ", card);
      removeFromHand(card, stateObj);
      replaceEnemyCard(stateObj);
      break;

    case "DRAW":
      const newCard = stateObj.playerDeck.pop();

      console.log(`Drew a card (${newCard})`);
      if (getValue(newCard) > getValue(stateObj.enemyCard)) {
        replaceEnemyCard(stateObj);
        console.log("SUCCESS! Beat enemy card");
      } else {
        if (stateObj.tower.length < 1) {
          stateObj.tower.pop();
        }
        console.log("FAILURE! New draw discarded");
      }
      break;

    case "NUKE":
      console.log("Nuked the tower!");
      break;

    default:
      throw new Error("Invalid action specified! " + action);
  }
};

export const getActions = (stateObj) => {
  let actions = new Set();

  if (stateObj.playerHand.length > 0) {
    actions.add(["SWAP"]);
  }

  if (stateObj.playerDeck.length > 0) {
    actions.add(["DRAW"]);
  }

  const towerSize = stateObj.tower.length;
  const bonus = Math.floor(towerSize / 2);
  // console.log("Bonus: ", bonus);

  if (towerSize > 0) {
    const buildableCards = stateObj.playerHand.filter(
      (card) =>
        getValue(card) + bonus > getValue(stateObj.tower[towerSize - 1]),
    );

    if (buildableCards.length > 0) {
      actions.add(["BUILD", buildableCards]);
    }
  }

  const enemyColor = getColor(stateObj.enemyCard);
  const enemyValue = getValue(stateObj.enemyCard);

  const eligibleCards = stateObj.playerHand.filter(
    (card) =>
      getColor(card) === enemyColor && getValue(card) + bonus >= enemyValue,
  );

  if (eligibleCards.length > 0) {
    actions.add(["KILL", eligibleCards]);
  }

  if (towerSize > 0) {
    actions.add(["NUKE"]);
  }

  // If actions is an empty set, game is over
  return actions;
};
