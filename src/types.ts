export const suits = ["C", "D", "H", "S"] as const;
export const ranks = [
  ...Array.from({ length: 8 }, (_, i) => i + 2),
  "A",
  "K",
  "Q",
  "J",
  "T",
] as const;

export type Suit = (typeof suits)[number];
export type Rank = (typeof ranks)[number];
export type Area = "tower" | "pdeck" | "edeck" | "hand" | "enemy";
export interface CardSet {
  area: Area;
  cards: string[];
}
