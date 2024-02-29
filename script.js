
document.addEventListener('DOMContentLoaded', () => {
    const rows = 6;
    const cols = 7;
    const model = Array(rows).fill().map(() => Array(cols).fill(0));
    const gameBoard = document.getElementById('gameBoard');

    function drawBoard() {
        gameBoard.innerHTML = '';
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.addEventListener('click', () => placeToken(col));
                gameBoard.appendChild(cell);
                if (model[row][col] === 1) {
                    cell.classList.add('player1');
                } else if (model[row][col] === 2) {
                    cell.classList.add('player2');
                }
            }
        }
    }

    function placeToken(col) {
        for (let row = rows - 1; row >= 0; row--) {
            if (model[row][col] === 0) {
                model[row][col] = 1; 
                checkWinner();
                computerMove();
                drawBoard();
                return;
            }
        }
    }

    function computerMove() {
        let placed = false;
        while (!placed) {
            const col = Math.floor(Math.random() * cols);
            for (let row = rows - 1; row >= 0; row--) {
                if (model[row][col] === 0) {
                    model[row][col] = 2;
                    placed = true;
                    break;
                }
            }
        }
    }

    function checkWinner() {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (model[row][col] !== 0) {
                    if (checkDirection(row, col, 0, 1) || // Horisontal
                        checkDirection(row, col, 1, 0) || // Lodret
                        checkDirection(row, col, 1, 1) || // Diagonal ned til højre
                        checkDirection(row, col, 1, -1)) { // Diagonal ned til venstre
                        alert(`Spiller ${model[row][col]} vandt!`);
                        return;
                    }
                }
            }
        }
    }

    function checkDirection(row, col, dRow, dCol) {
        let count = 1;
        let token = model[row][col];
        let i = 1;
        // Tjek i den ene retning
        while (row + i * dRow >= 0 && row + i * dRow < rows && col + i * dCol >= 0 && col + i * dCol < cols && model[row + i * dRow][col + i * dCol] === token) {
            count++;
            i++;
        }
        i = 1;
        // Tjek i den modsatte retning
        while (row - i * dRow >= 0 && row - i * dRow < rows && col - i * dCol >= 0 && col - i * dCol < cols && model[row - i * dRow][col - i * dCol] === token) {
            count++;
            i++;
        }
        return count >= 4;
    }

    document.getElementById('restartGame').addEventListener('click', () => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                model[row][col] = 0;
            }
        }
        drawBoard();
    });

    drawBoard();
});
