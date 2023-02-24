// Model
let secret = "secret";
const keys = [[]];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["None"] = 3] = "None";
})(Color || (Color = {}));
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
    document.addEventListener("keydown", render);
}
// View
const ENTRYNUMBER = 6;
const WORDLENGTH = secret.length;
let editingIndex = 0;
let gameStatus = false;
function render(event) {
    const key = event.key;
    // console.log(key);
    if (isLetter(key)) {
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
                endInfo.textContent = `You lose.`;
            }
        }
    }
}
