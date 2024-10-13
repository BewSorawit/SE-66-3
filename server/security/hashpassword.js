const reverseAlphabetMap = {
  a: "h",
  b: "g",
  c: "f",
  d: "e",
  e: "d",
  f: "c",
  g: "b",
  h: "a",
  i: "r",
  j: "p",
  k: "q",
  l: "n",
  m: "o",
  n: "l",
  o: "m",
  p: "j",
  q: "k",
  r: "i",
  s: "z",
  t: "y",
  u: "x",
  v: "w",
  w: "v",
  x: "u",
  y: "t",
  z: "s",
};

const reverseNumberMap = {
  0: "7",
  1: "6",
  2: "4",
  3: "0",
  4: "2",
  5: "8",
  6: "5",
  7: "6",
  8: "9",
  9: "1",
};

const SECRET_KEY = "?w[q/;h.<pHC0ZC.:mR$Y9/'7Hh)$5";

const mapChar = (char, index) => {
  const keyChar = SECRET_KEY[index % SECRET_KEY.length];
  // console.log(keyChar);

  let shiftValue = 0;
  if (/[a-z]/i.test(keyChar)) {
    // console.log(keyChar.toLowerCase().charCodeAt(0));
    shiftValue = keyChar.toLowerCase().charCodeAt(0) - 97; // a=0
    // console.log(shiftValue);
  } else if (/[0-9]/.test(keyChar)) {
    shiftValue = parseInt(keyChar, 10);
  }
  // console.log(shiftValue);

  if (/[a-z]/i.test(char)) {
    const mappedChar =
      reverseAlphabetMap[char.toLowerCase()] || char.toLowerCase();
    // console.log(mappedChar);

    let shiftedCharCode =
      ((mappedChar.charCodeAt(0) - 97 + shiftValue) % 26) + 97; // a-z
    let shiftedChar = String.fromCharCode(shiftedCharCode);
    // console.log(shiftedChar);

    return shiftedChar;
  } else if (/[0-9]/.test(char)) {
    let mappedDigit = reverseNumberMap[char] || char;
    let numericValue = parseInt(mappedDigit, 10);
    numericValue = (numericValue + shiftValue) % 9;
    numericValue = numericValue === 0 ? 9 : numericValue;

    return numericValue.toString();
  } else {
    return "";
  }
};

const passwordHashing = (password) => {
  let hash = "";

  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    const hashedChar = mapChar(char, i);
    // console.log(hashedChar);
    hash += hashedChar;
  }

  hash = hash.split("").reverse().join("") + "x";

  return hash;
};
module.exports = { passwordHashing };
