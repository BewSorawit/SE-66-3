const caesarCipher = (str, odd_shift, even_shift) => {
  let transformedStr = "";

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    let shift;

    if (i % 2 === 0) {
      shift = even_shift;
    } else {
      shift = odd_shift;
    }

    if (char.match(/[a-z]/i)) {
      let code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        transformedStr += String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        transformedStr += String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    } else {
      transformedStr += char;
    }
  }

  return transformedStr;
};

module.exports = { caesarCipher };
