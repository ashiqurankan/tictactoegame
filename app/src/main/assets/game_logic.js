let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if (!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }

        if (isDraw()) {
            playerText.innerHTML = 'It\'s a draw!'
            return
        }

        // Switch to computer's turn if current player is X
        if (currentPlayer === X_TEXT) {
            currentPlayer = O_TEXT
            computerMove();
        } else {
            currentPlayer = X_TEXT; // Switch back to player
        }
    }
}

function computerMove() {
    // Check if computer can win
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        if (spaces[a] === O_TEXT && spaces[b] === O_TEXT && spaces[c] === null) {
            makeMove(c);
            return;
        }
        if (spaces[a] === O_TEXT && spaces[c] === O_TEXT && spaces[b] === null) {
            makeMove(b);
            return;
        }
        if (spaces[b] === O_TEXT && spaces[c] === O_TEXT && spaces[a] === null) {
            makeMove(a);
            return;
        }
    }

    // Check if player can win and block
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        if (spaces[a] === X_TEXT && spaces[b] === X_TEXT && spaces[c] === null) {
            makeMove(c);
            return;
        }
        if (spaces[a] === X_TEXT && spaces[c] === X_TEXT && spaces[b] === null) {
            makeMove(b);
            return;
        }
        if (spaces[b] === X_TEXT && spaces[c] === X_TEXT && spaces[a] === null) {
            makeMove(a);
            return;
        }
    }

    // If no winning or blocking move, pick a random available space
    let availableSpaces = spaces.map((space, index) => space === null ? index : null).filter(val => val !== null);
    if (availableSpaces.length > 0) {
        let randomIndex = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
        makeMove(randomIndex);
    }
}

function makeMove(index) {
    spaces[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;

    if (playerHasWon() !== false) {
        playerText.innerHTML = `${currentPlayer} has won!`
        let winning_blocks = playerHasWon()
        winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
        return
    }

    if (isDraw()) {
        playerText.innerHTML = 'It\'s a draw!'
        return
    }

    currentPlayer = X_TEXT; // Switch back to player
}

function isDraw() {
    return spaces.every((space) => space !== null) && !playerHasWon()
}

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText.innerHTML = 'Tic Tac Toe'
    currentPlayer = X_TEXT
}

startGame()
