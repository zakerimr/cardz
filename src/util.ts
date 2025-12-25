import type { Rank } from "./types";

export const getValue = (r: Rank): number => {
  let value = 0;
  switch (r) {
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
      value = r;
  }
  return value;
};
