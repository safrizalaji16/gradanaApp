export function capitalizeFirstLetter(str: string) {
  let words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    let firstLetter = words[i].charAt(0).toUpperCase();
    words[i] = firstLetter + words[i].slice(1);
  }

  return words.join(" ");
}
