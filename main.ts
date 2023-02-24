
// Process Word List
// declare function require(name: string);
// let fs = require('fs');
// const fileName = "answerlist.txt";
// const fileContent = fs.readFileSync(fileName, "utf-8");
// const wordList = fileContent.split("\n");
// console.log(wordList);
// let obj = {
//     words: wordList
// }
// let json = JSON.stringify(obj);
// fs.writeFileSync("data.json", json);
// let data = JSON.parse()

// Model
let secret = wordList[Math.floor(Math.random() * wordList.length)];


const keys: string[][] = [[]];

enum Color {
    Red,
    Yellow,
    Green,
    None,
}



function guess(word: string): number[] {
    let result: number[] = [];

    for (let i = 0; i < (secret.length - word.length); i++) {
        word += "*";
    }
    Array.from(secret).forEach((s, i) => {
        if (word[i] === s) {
            result.push(Color.Green);
        } else if (secret.includes(word[i])) {
            result.push(Color.Yellow);
        } else if (word[i] == "*") {
            result.push(Color.None);
        } else {
            result.push(Color.Red);
        }
    })

    return result;
}

function keysToWords(keys: string[][]): string[] {
    let result: string[] = [];
    for (let row of keys) {
        result.push(row.join(""));
    }

    return result;
}

function isLetter(str: string): boolean {
    return str.length === 1 && str.toLowerCase() !== str.toUpperCase();
}

// Controller

function startGame() {
    const table = document.getElementById("table")!;
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

// document.addEventListener("click", startGame);


// View
const ENTRYNUMBER = 8;
const WORDLENGTH = secret.length;

let editingIndex = 0;
let gameStatus = false;

function render(event: KeyboardEvent) {
    let key = event.key;
    // console.log(key);

    if (isLetter(key)) {
        key = key.toLowerCase();
        if (keys[editingIndex].length < WORDLENGTH) {
            keys[editingIndex].push(key);
        }
    } else if (key == "Backspace") {
        keys[editingIndex].pop();
    } else if (key == "Enter") {

        if (keys[editingIndex].length === WORDLENGTH) {
            keys.push([]);
            editingIndex += 1;
        }

    }

    const guesses = keysToWords(keys);
    const results = guesses.map((word) => guess(word));
    // console.log(guesses, results);

    const table = document.getElementById("table")!;
    table.innerHTML = "";
    for (let i = 0; i < ENTRYNUMBER; i++) {
        const entry = document.createElement("div");
        entry.className = "entry";

        let guess: string | null = null;
        let colors: number[] | null = null;
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

        const endInfo = document.getElementById("end-info")!;
        if (key === "Enter") {
            if (gameStatus) {
                endInfo.className = "info-win";
                endInfo.textContent = `Congradulations! The secret word is "${secret}"`;
            } else if (editingIndex === ENTRYNUMBER) {
                endInfo.className = "info-lose";
                endInfo.textContent = `You lose. The secret word is "${secret}"`;
            }
        }
    }
}
