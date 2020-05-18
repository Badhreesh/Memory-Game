// Get all the cells in the grid
const cells = document.querySelectorAll('.cell');

var count = 0;
var r = 8;
var timeout = 1000;

/** Flips the currently clicked cell. */
function flipCell() {
    // Run flip from style.css for the clicked cell (this)
    this.classList.toggle('flip');

    flippedCell = this;
    cellColor = flippedCell.dataset.color;
    outcome(cellColor);
}

/**
 * Determines the game progression given a certain color.
 * @param {string} cellColor - The color of the flipped cell
 */
function outcome(cellColor) {
    // flippedCell color is red
    if (cellColor === 'Red') {
        // Increase count by 1
        count++;
        // Remove the EventListener for the flippedCell
        flippedCell.removeEventListener('click', flipCell)
        // If you have correctly guessed all red squares
        if (count === r) {
            // disable all cells
            disableCells();
            // Popup saying you won and asking if you want to play again
            setTimeout(function() {
                var answer = confirm('You won! Play again?');
                reloadGame(answer);
            }, 500);
        }
    }
    // flippedCell color is blue
    else {
        // disable all cells
        disableCells();
        // Popup saying you lost and asking if you want to try again
        setTimeout(function() {
            var answer = confirm('You lost! Try again?');
            reloadGame(answer);
        }, 500);
    }
}

/** Removes the event listener from all cells */
function disableCells() {
    cells.forEach(cell => cell.removeEventListener('click', flipCell))
}

/**
 * Reloads the game if the player chooses to play again.
 * @param {bool} answer - True if user clicked OK, and False otherwise.
 */
function reloadGame(answer) {
    // if "OK"
    if (answer) {
        location.reload();
    }
    // if "Cancel"
    else {
        alert('Thank you for playing!')
    }
}

/** Shuffles the red squares everytime the page reloads. */
(function shuffle() {
  cells.forEach(cell => {
    let randomPos = Math.floor(Math.random() * cells.length);
    cell.style.order = randomPos;
  });
})();

// Set timer to show the color of the cells for 0.5 seconds. After that ,flip to white.
setTimeout(function() { cells.forEach(cell => cell.classList.toggle('flip')); }, timeout);

// Add an event listener to every cell. If a click event occurs, execute flipcell()
cells.forEach(cell => cell.addEventListener('click', flipCell));
