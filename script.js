let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let vsComputer = false;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.setAttribute("data-index", index);
        cellElement.innerText = cell;
        cellElement.addEventListener("click", () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    createBoard();

    if (checkWinner()) {
        statusElement.innerText = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusElement.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.innerText = `Player ${currentPlayer}'s Turn`;

    if (vsComputer && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let available = board
        .map((val, idx) => (val === "" ? idx : null))
        .filter(val => val !== null);

    let randomIndex = available[Math.floor(Math.random() * available.length)];
    handleCellClick(randomIndex);
}

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,5,6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

document.getElementById("reset").addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusElement.innerText = `Player ${currentPlayer}'s Turn`;
    createBoard();
});

document.getElementById("playerMode").addEventListener("click", () => {
    vsComputer = false;
    startGame();
});

document.getElementById("computerMode").addEventListener("click", () => {
    vsComputer = true;
    startGame();
});

function startGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusElement.innerText = `Player ${currentPlayer}'s Turn`;
    createBoard();
}

createBoard();
