// Process Word List
// declare function require(name: string);
// let data = JSON.parse()
// Model
wordList = wordList.filter((word) => {
    return word.length > 3 && word.length < 7;
});
console.log(wordList.length);
let secret = wordList[Math.floor(Math.random() * wordList.length)];
let keys = [[]];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["None"] = 3] = "None";
})(Color || (Color = {}));
function init() {
    secret = wordList[Math.floor(Math.random() * wordList.length)];
    keys = [[]];
    editingIndex = 0;
}
function guess(word) {
    let result = [];
    for (let i = 0; i < (secret.length - word.length); i++) {
        word += "*";
    }
    Array.from(secret).forEach((s, i) => {
        if (word[i] === s) {
            result.push(Color.Green);
        }
        else if (secret.includes(word[i])) {
            result.push(Color.Yellow);
        }
        else if (word[i] == "*") {
            result.push(Color.None);
        }
        else {
            result.push(Color.Red);
        }
    });
    return result;
}
function keysToWords(keys) {
    let result = [];
    for (let row of keys) {
        result.push(row.join(""));
    }
    return result;
}
function isLetter(str) {
    return str.length === 1 && str.toLowerCase() !== str.toUpperCase();
}
// Controller
function startGame() {
    const table = document.getElementById("table");
    table.innerHTML = "";
    for (let i = 0; i < ENTRYNUMBER; i++) {
        const entry = document.createElement("div");
        entry.className = "entry";
        for (let j = 0; j < WORDLENGTH; j++) {
            const block = document.createElement("p");
            block.className = "block";
            entry.appendChild(block);
        }
        table.appendChild(entry);
    }
    // const restartBtn = document.createElement("button");
    // const restartDiv = document.getElementById("restart-div")!;
    // const endInfo = document.getElementById("end-info")!;
    // restartBtn.id = "restart-btn";
    // restartBtn.addEventListener("click", function () {
    //     restartDiv.innerHTML = "";
    //     endInfo.innerHTML = "";
    //     endInfo.className = "info";
    //     gameStatus = false;
    //     init();
    //     startGame();
    // })
    // restartBtn.textContent = "Restart";
    // restartDiv.appendChild(restartBtn);
    document.addEventListener("keydown", render);
}
// document.addEventListener("click", startGame);
// View
const WORDLENGTH = secret.length;
const ENTRYNUMBER = WORDLENGTH + 3;
let editingIndex = 0;
let gameStatus = false;
function render(event) {
    let key = event.key;
    // console.log(key);
    if (isLetter(key)) {
        key = key.toLowerCase();
        if (keys[editingIndex].length < WORDLENGTH) {
            keys[editingIndex].push(key);
        }
    }
    else if (key == "Backspace") {
        keys[editingIndex].pop();
    }
    else if (key == "Enter") {
        if (keys[editingIndex].length === WORDLENGTH) {
            keys.push([]);
            editingIndex += 1;
        }
    }
    const guesses = keysToWords(keys);
    const results = guesses.map((word) => guess(word));
    // console.log(guesses, results);
    const table = document.getElementById("table");
    table.innerHTML = "";
    for (let i = 0; i < ENTRYNUMBER; i++) {
        const entry = document.createElement("div");
        entry.className = "entry";
        let guess = null;
        let colors = null;
        if (i < guesses.length) {
            guess = guesses[i];
            colors = results[i];
            if (JSON.stringify(colors) === JSON.stringify(Array(WORDLENGTH).fill(Color.Green))) {
                gameStatus = true;
            }
        }
        for (let j = 0; j < WORDLENGTH; j++) {
            const block = document.createElement("p");
            block.className = "block";
            if (guess !== null && colors !== null) {
                let letter = guess[j];
                let color = colors[j];
                block.textContent = letter;
                if (i < editingIndex) {
                    switch (color) {
                        case Color.Green:
                            block.className = "block-green";
                            break;
                        case Color.Yellow:
                            block.className = "block-yellow";
                            break;
                        case Color.Red:
                            block.className = "block-red";
                            break;
                    }
                }
            }
            entry.appendChild(block);
        }
        table.appendChild(entry);
        const endInfo = document.getElementById("end-info");
        if (key === "Enter") {
            if (gameStatus) {
                endInfo.className = "info-win";
                endInfo.textContent = `Congradulations! The secret word is "${secret}"`;
            }
            else if (editingIndex === ENTRYNUMBER) {
                endInfo.className = "info-lose";
                endInfo.textContent = `You lose. The secret word is "${secret}"`;
            }
        }
    }
}
