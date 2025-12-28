import { getValue, getColor } from "./util.js";

const removeFromHand = (card, stateObj) => {
  const index = stateObj.playerHand.indexOf(card);

  if (index <= -1) {
    throw new Error("Failed to remove card " + card + " from hand!");
  }
  stateObj.playerHand.splice(index, 1);

  // replace card if possible
  if (stateObj.playerDeck.length > 0) {
    stateObj.playerHand.push(stateObj.playerDeck.pop());
  }
};

const replaceEnemyCard = (stateObj) => {
  if (stateObj.enemyDeck.length > 0) {
    stateObj.enemyCard = stateObj.enemyDeck.pop();
  }
};

export const doAction = (action, card, stateObj) => {
  switch (action) {
    case "BUILD":
      if (
        getValue(card) <= getValue(stateObj.tower[stateObj.tower.length - 1])
      ) {
        console.log("Cannot build - tower must be ascending!");
      } else {
        console.log("Built card ", card);
        removeFromHand(card, stateObj);
        stateObj.tower.push(card);
      }

      break;

    case "SWAP":
      console.log("Swapped card ", card);
      removeFromHand(card, stateObj);
      stateObj.enemyDeck.push(card);
      break;

    case "KILL":
      let eligibleCards;

      for (const a of [...getActions(stateObj)]) {
        if (a[0] === "KILL") {
          eligibleCards = a[1];
          break;
        }
      }

      if (!eligibleCards || !eligibleCards.includes(card)) {
        console.log(
          "Could not kill enemy " + stateObj.enemyCard + " with card " + card,
        );
      } else {
        console.log("Killed enemy " + stateObj.enemyCard + " with card ", card);
        removeFromHand(card, stateObj);
        replaceEnemyCard(stateObj);
      }

      break;

    case "DRAW":
      const newCard = stateObj.playerDeck.pop();

      console.log(`Drew a card (${newCard})`);

      const bonus = Math.floor(stateObj.tower.length / 2);

      if (
        getValue(newCard) + bonus >= getValue(stateObj.enemyCard) &&
        getColor(newCard) === getColor(stateObj.enemyCard)
      ) {
        replaceEnemyCard(stateObj);
        console.log("SUCCESS! Beat enemy card");
      } else {
        if (stateObj.tower.length > 1) {
          const removedCard = stateObj.tower.pop();
          console.log("Removed top card from tower! ", removedCard);
        }
        console.log("FAILURE! New draw discarded");
      }
      break;

    case "NUKE":
      if (stateObj.tower.length <= 0) {
        throw new Error("Attempted nuke, but no tower found!");
      }
      stateObj.tower = [];
      replaceEnemyCard(stateObj);
      console.log("Nuked the tower!");
      break;

    default:
      throw new Error("Invalid action specified! " + action);
  }
};

export const getActions = (stateObj) => {
  let actions = new Set();

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

  if (stateObj.playerDeck.length > 0) {
    actions.add(["SWAP"]);
  }

  // If actions is an empty set, game is over
  return actions;
};
