const board = document.getElementById("board");
const message = document.getElementById("message");
let playerPosition = 1;

// Snakes move the player down, ladders move them up
const snakes = { 17: 7, 54: 34, 62: 19, 98: 79 };
const ladders = { 3: 22, 8: 26, 28: 84, 58: 77 };

// Create the game board
function createBoard() {
    for (let i = 100; i >= 1; i--) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}`;
        cell.textContent = i;
        board.appendChild(cell);
    }
    updatePlayer();
}

// Simulates rolling a dice
function rollDice() {
    const dice = Math.floor(Math.random() * 6) + 1;
    message.textContent = `You rolled: ${dice}`;
    movePlayer(dice);
}

// Moves the player based on dice roll
function movePlayer(dice) {
    let newPosition = playerPosition + dice;
    if (newPosition > 100) return;

    // Check for snakes or ladders
    if (snakes[newPosition]) {
        newPosition = snakes[newPosition];
        message.textContent += " - Oh no, a snake!";
    } else if (ladders[newPosition]) {
        newPosition = ladders[newPosition];
        message.textContent += " - Yay, a ladder!";
    }

    playerPosition = newPosition;
    updatePlayer();

    if (playerPosition === 100) {
        message.textContent = "🎉 Congratulations! You reached 100 and won the game! 🎉";
    }
}

// Updates the player's position on the board
function updatePlayer() {
    document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("player"));
    document.getElementById(`cell-${playerPosition}`).classList.add("player");
}

// Initialize the board
createBoard();
