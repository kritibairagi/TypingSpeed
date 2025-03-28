document.getElementById("mode").addEventListener("change", function() {
    if (this.value === "standard") {
        window.location.href = "index.html"; // Redirect to index.html
    }
});

const words = 'in one good real one not school set they state number word about after much need open change also'.split(' ');
const wordsCount = words.length;
let timer = 30;
let interval;
let correctChars = 0;
let totalCharsTyped = 0;
let gameStarted = false;

function addClass(el, name) {
    if (el) el.classList.add(name);
}
function removeClass(el, name) {
    if (el) el.classList.remove(name);
}

function randomWord() {
    return words[Math.floor(Math.random() * wordsCount)];
}

function formatWord(word) {
    return `<div class="word">${word.split('').map(letter => `<span class="letter">${letter}</span>`).join('')}</div>`;
}

function newGame() {
    document.getElementById('words').innerHTML = '';
    for (let i = 0; i < 200; i++) {
        document.getElementById('words').innerHTML += formatWord(randomWord());
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
    document.getElementById('timer').textContent = timer;
    document.getElementById('result').style.display = 'none';
    document.getElementById('test').focus();
    timer = 30;
    correctChars = 0;
    totalCharsTyped = 0;
    clearInterval(interval);
    gameStarted = false;

    document.getElementById('test').addEventListener('keydown', startTimer, { once: true });
}

function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        interval = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    if (timer > 0) {
        timer--;
        document.getElementById('timer').textContent = timer;
    } else {
        clearInterval(interval);
        endGame();
    }
}

function endGame() {
    document.getElementById('test').blur();
    document.getElementById('result').style.display = 'block';

    let wpm = (correctChars / 5) * (60 / 30);
    let accuracy = totalCharsTyped > 0 ? (correctChars / totalCharsTyped) * 100 : 0;

    document.getElementById('wpm').textContent = Math.round(wpm);
    document.getElementById('accuracy').textContent = Math.round(accuracy);
}

document.getElementById('test').addEventListener('keydown', ev => {
    if (timer <= 0) return;

    const key = ev.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackspace = key === 'Backspace';

    if (isSpace) {
        ev.preventDefault(); // ✅ Fix Space Bar Scrolling

        if (expected !== ' ') {
            document.querySelectorAll('.word.current .letter:not(.correct)').forEach(letter => {
                addClass(letter, 'incorrect');
            });
        }
        removeClass(currentWord, 'current');
        if (currentWord.nextElementSibling) {
            addClass(currentWord.nextElementSibling, 'current');
            addClass(currentWord.nextElementSibling.firstChild, 'current');
        }
    }

    if (isBackspace) {
        ev.preventDefault(); // ✅ Fix Backspace Scrolling

        if (currentLetter?.previousElementSibling) {
            removeClass(currentLetter, 'current');
            removeClass(currentLetter.previousElementSibling, 'correct');
            removeClass(currentLetter.previousElementSibling, 'incorrect');
            addClass(currentLetter.previousElementSibling, 'current');
        } else if (currentWord.previousElementSibling) {
            removeClass(currentWord, 'current');
            addClass(currentWord.previousElementSibling, 'current');
            let lastLetter = currentWord.previousElementSibling.querySelector('.letter:last-child');
            if (lastLetter) {
                addClass(lastLetter, 'current');
                removeClass(lastLetter, 'correct');
                removeClass(lastLetter, 'incorrect');
            }
        }
    }

    if (isLetter) {
        totalCharsTyped++;
        if (currentLetter) {
            if (key === expected) correctChars++;
            addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
            removeClass(currentLetter, 'current');
            if (currentLetter.nextElementSibling) {
                addClass(currentLetter.nextElementSibling, 'current');
            }
        } else {
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerHTML = key;
            incorrectLetter.className = 'letter incorrect extra';
            currentWord.appendChild(incorrectLetter);
        }
    }
});

newGame();
