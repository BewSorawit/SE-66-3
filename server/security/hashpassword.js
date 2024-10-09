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

const mapChar = (char, count) => {
  if (char.match(/[a-z]/)) {
    const newChar = reverseAlphabetMap[char.toLowerCase()];
    return String.fromCharCode(newChar.charCodeAt(0) + count);
  } else if (char.match(/[0-9]/)) {
    return reverseNumberMap[char];
  } else {
    return char;
  }
};

const caesarCipher = (str) => {
  let transformedStr = "";

  let group1 = "",
    group2 = "",
    group3 = "";

  let count = 0;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    count++;

    if (i % 3 === 0) {
      group1 += mapChar(char, count);
    } else if (i % 3 === 1) {
      group2 += mapChar(char, count);
    } else {
      group3 += mapChar(char, count);
    }
  }

  transformedStr = group1 + group2 + group3;

  return transformedStr;
};

module.exports = { caesarCipher };
