// Elements Selectors
var generateBtn = document.querySelector("#generate");
var pwdDisplay = document.querySelector("#password");
var passwordLength = document.querySelector("#pwdLength");
var lowercaseBox = document.querySelector("#includeLowercase");
var uppercaseBox = document.querySelector("#includeUppercase");
var numericBox = document.querySelector("#includeNumeric");
var specCharBox = document.querySelector("#includeSpecChar");

// Array of special characters
var specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];
// Array of numeric characters
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters
var lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Array of uppercase characters
var upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Get random index from specialCharacters array
function getRandomSpecChar() {
  var index = Math.floor(Math.random() * specialCharacters.length);
  var randomCharacter = specialCharacters[index];
  return randomCharacter;
}

// Get random index from numericCharacters array
function getRandomNumChar() {
  var index = Math.floor(Math.random() * numericCharacters.length);
  var randomCharacter = numericCharacters[index];
  return randomCharacter;
}

// Get random index from lowerCasedCharacters array
function getRandomLowercase() {
  var index = Math.floor(Math.random() * lowerCasedCharacters.length);
  var randomCharacter = lowerCasedCharacters[index];
  return randomCharacter;
}

// Get random index from upperCasedCharacters array
function getRandomUppercase() {
  var index = Math.floor(Math.random() * upperCasedCharacters.length);
  var randomCharacter = upperCasedCharacters[index];
  return randomCharacter;
}

// console.log(getRandomUppercase());

// Object that store all getRandom functions
var pwdGenFunc = {
  lowerCase: getRandomLowercase,
  upperCase: getRandomUppercase,
  numeric: getRandomNumChar,
  specChar: getRandomSpecChar,
};

// Password Generator event listner
generateBtn.addEventListener("click", () => {
  event.preventDefault();
  var pwdLength = passwordLength.value;
  var includeLowercase = lowercaseBox.checked;
  var includeUppercase = uppercaseBox.checked;
  var includeNumeric = numericBox.checked;
  var includeSpecChar = specCharBox.checked;

  pwdDisplay.innerText = writePassword(
    includeLowercase,
    includeUppercase,
    includeNumeric,
    includeSpecChar,
    pwdLength
  );
  // console.log(pwdLength);
});

// main function
function writePassword(lowerCase, upperCase, numeric, specChar, pwdLength) {
  var genPassword = "";
  var countTypes = lowerCase + upperCase + numeric + specChar;
  var typesArray = [
    { lowerCase },
    { upperCase },
    { numeric },
    { specChar },
    // Left out uncheck box
  ].filter((item) => Object.values(item)[0]);

  // At least one option to be tick, if not display empty string
  if (countTypes === 0) {
    return "";
  }
  // Call writePassword function for each type within the length and return the generated pwd
  for (var i = 0; i < pwdLength; i += countTypes) {
    typesArray.forEach((type) => {
      var funcName = Object.keys(type)[0];
      genPassword += pwdGenFunc[funcName]();
    });
  }
  return genPassword;
}
