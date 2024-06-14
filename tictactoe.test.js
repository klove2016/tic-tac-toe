describe("Tic-Tac-Toe Game", () => {
    let cells;
    let player_name;
    let winner_announcement;
    let winner_name;
    let board;
  
    // Before each test, set up the DOM with the game HTML structure
    beforeEach(() => {
      document.body.innerHTML = `
        <header id="header">
            <h1>Tic Tac Toe</h1>
        </header>
        <main id="game">
            <section id="winner_announcement" class="hidden">
                <div id="content">
                    <div id="winner_name"></div>
                    <button class="reset-button">Reset</button>
                </div>
            </section>
            <section id="board">
                <table>
                    <thead>
                        <tr>
                            <td colspan="3" id="player_name">Player 1's Turn</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="cell" id="1"></td>
                            <td class="cell" id="2"></td>
                            <td class="cell" id="3"></td>
                        </tr>
                        <tr>
                            <td class="cell" id="4"></td>
                            <td class="cell" id="5"></td>
                            <td class="cell" id="6"></td>
                        </tr>
                        <tr>
                            <td class="cell" id="7"></td>
                            <td class="cell" id="8"></td>
                            <td class="cell" id="9"></td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <div class="reset">
                <button class="reset-button">Reset</button>
            </div>
        </main>
      `;
  
      // Gather elements to test
      cells = document.querySelectorAll('.cell');
      player_name = document.getElementById("player_name");
      winner_announcement = document.getElementById("winner_announcement");
      winner_name = document.getElementById("winner_name");
      board = document.getElementById("board");
  
      // Debugging for failing test
      console.log("Player Name Element: ", player_name);
      console.log("Initial Player Name Text: ", player_name ? player_name.innerText : "player_name is null");
  
      // Initialize game variables -user window for global scope access
      window.counter = 0;
      window.moves = { 'Player 1': [], 'Player 2': [] };
      window.winner_combos = [
        ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],
        ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"],
        ["1", "5", "9"], ["3", "5", "7"]
      ];
  
      // Function to check if the current player has won
      window.checkWinner = player => window.winner_combos.some(combo => combo.every(id => window.moves[player].includes(id)));
  
      // Function to announce the winner
      window.announceWinner = winner => {
        board.classList.add("disabled");
        winner_announcement.classList.remove("hidden");
        winner_name.innerHTML = `<h2>${winner} Wins!</h2>`;
      };
  
      // Function to handle cell click events
      window.handleClick = cell => {
        if (cell.innerHTML || board.classList.contains("disabled")) return; 
        const currentPlayer = window.counter % 2 ? 'Player 2' : 'Player 1'; 
        cell.innerHTML = currentPlayer === 'Player 1' ? "X" : "O"; 
        window.moves[currentPlayer].push(cell.id); 
        player_name.innerText = `Player ${window.counter % 2 ? 1 : 2}'s Turn`; 
        if (window.checkWinner(currentPlayer)) {
          window.announceWinner(currentPlayer); 
        } else {
          window.counter++; 
        }
      };
  
     
      window.resetGame = () => {
        cells.forEach(cell => cell.innerHTML = "");
        board.classList.remove("disabled"); 
        window.counter = 0; 
        window.moves['Player 1'] = []; 
        window.moves['Player 2'] = []; 
        winner_announcement.classList.add("hidden"); 
        player_name.innerText = "Player 1's Turn"; 
      };
  
    
      cells.forEach(cell => cell.addEventListener('click', () => window.handleClick(cell)));
      document.querySelectorAll('.reset-button').forEach(button => button.addEventListener('click', window.resetGame));
    });
  
    // Test case to check if the game initializes correctly --FAILING
    it("should initialize correctly", () => {
      console.log("Testing initialization...");
      expect(player_name.innerText).toBe("Player 1's Turn"); 
      cells.forEach(cell => expect(cell.innerHTML).toBe("")); 
    });
  
    // Test case to check if the board updates correctly when a cell is clicked
    it("should update the board on click", () => {
      cells[0].click(); 
      expect(cells[0].innerHTML).toBe("X"); 
      expect(player_name.innerText).toBe("Player 2's Turn"); 
    });
  
    // Test case to check if the game correctly detects a winner
    it("should detect a winner", () => {
      cells[0].click(); // X
      cells[3].click(); // O
      cells[1].click(); // X
      cells[4].click(); // O
      cells[2].click(); // X - Player 1 wins
  
      expect(winner_announcement.classList.contains("hidden")).toBe(false); 
      expect(winner_name.innerHTML).toContain("Player 1 Wins!"); 
    });
  
    it("should reset the game", () => {
      document.querySelector('.reset-button').click(); 
      expect(cells[0].innerHTML).toBe(""); 
      expect(player_name.innerText).toBe("Player 1's Turn"); 
      expect(winner_announcement.classList.contains("hidden")).toBe(true); 
    });
  });
  