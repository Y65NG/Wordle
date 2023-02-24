// Model
let secret = "secre";
const guesses = [];
const results = [];
const keys = [];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
function guess(word) {
    if (secret.length !== word.length) {
        return false;
    }
    guesses.push(word);
    let result = [];
    Array.from(secret).forEach((s, i) => {
        if (word[i] === s) {
            result.push(Color.Green);
        }
        else if (secret.includes(word[i])) {
            result.push(Color.Yellow);
        }
        else {
            result.push(Color.Red);
        }
    });
    results.push(result);
    return true;
}
// Controller
/* enter the word from textbox */
function enterWord() {
    const textbox = document.getElementById("textbox");
    const word = textbox.value;
    const textboxDiv = document.getElementById("textbox-div");
    if (guess(word)) {
        textbox.value = "";
        if (document.getElementById("fail-to-enter-err") !== null) {
            textboxDiv.removeChild(document.getElementById("fail-to-enter-err"));
        }
    }
    else {
        if (document.getElementById("fail-to-enter-err") === null) {
            textboxDiv.innerHTML += `<p id="fail-to-enter-err">Fail to enter the word!</p>`;
        }
    }
    render();
}
// View
const ENTRYNUMBER = 6;
const WORDLENGTH = 5;
function render() {
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
        }
        for (let j = 0; j < WORDLENGTH; j++) {
            const block = document.createElement("p");
            block.className = "block";
            console.log(j);
            if (guess !== null && colors !== null) {
                let letter = guess[j];
                let color = colors[j];
                console.log(letter);
                block.textContent = letter;
                switch (color) {
                    case Color.Green:
                        block.className = "block-green";
                        break;
                    case Color.Yellow:
                        block.className = "block-yellow";
                        break;
                    default:
                        block.className = "block-red";
                        break;
                }
            }
            entry.appendChild(block);
        }
        table.appendChild(entry);
    }
}
render();