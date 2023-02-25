let fs = require('fs');
const fileName = "toefl.txt";
const fileContent = fs.readFileSync(fileName, "utf-8");
const wordList = fileContent.split(" ");
while (wordList.indexOf("") != -1) {
    wordList.splice(wordList.indexOf(""), 1);
}
console.log(wordList);
let json = JSON.stringify(wordList);
fs.writeFileSync("toefl.js", json);
