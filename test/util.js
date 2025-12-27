export const getValue = (cardString) => {
  const rank = cardString[0];

  let value = 0;
  switch (rank) {
    case "K":
      value = 13;
      break;
    case "Q":
      value = 12;
      break;
    case "J":
      value = 11;
      break;
    case "T":
      value = 10;
      break;
    case "A":
      value = 1;
      break;
    default:
      value = Number(rank);
  }
  return value;
};

export const getColor = (cardString) => {
  const suit = cardString[1];

  if (suit === "C" || suit === "S") {
    return "BLACK";
  } else if (suit === "D" || suit === "H") {
    return "RED";
  } else {
    throw new Error(
      "Could not get card color - invalid cardString! " + cardString,
    );
  }
};

export const shuffleArray = (arr) => {
  let new_arr = arr;
  for (let i = 0; i < arr.length; i++) {
    let shuffle = Math.floor(Math.random() * arr.length);
    [new_arr[i], new_arr[shuffle]] = [new_arr[shuffle], new_arr[i]];
  }
  return new_arr;
};
