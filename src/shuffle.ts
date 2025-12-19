export function shuffleArray<T>(arr: T[]): T[] {
  let new_arr: T[] = arr;

  for (let i = 0; i < arr.length; i++) {
    let shuffle = Math.floor(Math.random() * arr.length);

    //swap the cards without using a temp variable
    [new_arr[i], new_arr[shuffle]] = [new_arr[shuffle], new_arr[i]];
  }
  return new_arr;
}
