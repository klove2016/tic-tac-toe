// Counter to track turns
let counter = 0;

// To track the moves of each player
const moves = { 'Player 1': [], 'Player 2': [] };

// Array of winning combinations
const winner_combos = [
  ["1", "2", "3"], // Top row
  ["4", "5", "6"], // Middle row
  ["7", "8", "9"], // Bottom row
  ["1", "4", "7"], // Left column
  ["2", "5", "8"], // Middle column
  ["3", "6", "9"], // Right column
  ["1", "5", "9"], // Diagonal from top-left to bottom-right
  ["3", "5", "7"]  // Diagonal from top-right to bottom-left
];

const cells = document.querySelectorAll('.cell');
const player_name = document.getElementById("player_name");
const winner_announcement = document.getElementById("winner_announcement");
const winner_name = document.getElementById("winner_name");
const board = document.getElementById("board");

// Check if the current player has won
const checkWinner = player => 
  winner_combos.some(combo => combo.every(id => moves[player].includes(id)));

// Handle cell click events
const handleClick = cell => {
  if (cell.innerHTML || board.classList.contains("disabled")) return;

  const currentPlayer = counter % 2 ? 'Player 2' : 'Player 1';

   // Check if the current player has more than 3 pieces
   if (moves[currentPlayer].length >= 3) {
    const removedId = moves[currentPlayer].shift();
    const removedCell = document.getElementById(removedId);
    removedCell.innerHTML = '';
  }


  cell.innerHTML = currentPlayer === 'Player 1' ? "X" : "O";
  moves[currentPlayer].push(cell.id);


  player_name.innerText = `Player ${counter % 2 ? 1 : 2}'s Turn`;

  if (checkWinner(currentPlayer)) {
    announceWinner(currentPlayer);
  } else {
    counter++;
  }
};

// Reset the game 
const resetGame = () => {
  cells.forEach(cell => cell.innerHTML = "");
  board.classList.remove("disabled");
  counter = 0;
  moves['Player 1'] = [];
  moves['Player 2'] = [];
  winner_announcement.classList.add("hidden");
  player_name.innerText = "Player 1's Turn";
};

// Announce the winner
const announceWinner = winner => {
  board.classList.add("disabled");
  winner_announcement.classList.remove("hidden");
  winner_name.innerHTML = `<h2>${winner} Wins!</h2>`;
};

// Attach event listeners to cells and reset buttons
cells.forEach(cell => cell.addEventListener('click', () => handleClick(cell)));
document.querySelectorAll('.reset-button').forEach(button => button.addEventListener('click', resetGame));