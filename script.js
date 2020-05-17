const cells = document.querySelectorAll('.cell');


var flippedCell, color;
var count = 0;
var r = 8;
var timeout = 500;

function flipCell() {

    this.classList.toggle('flip');

    flippedCell = this;
    color = flippedCell.dataset.color;

    // flippedCell color is red
    if (color === 'Red') {
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

function disableCells() {
    cells.forEach(cell => cell.removeEventListener('click', flipCell))
}

function reloadGame(answer) {
    // if OK
    if (answer) {
        location.reload();
    }
    // if cancel
    else {
        alert('Thank you for playing!')
    }
}

(function shuffle() {
  cells.forEach(cell => {
    let randomPos = Math.floor(Math.random() * cells.length);
    cell.style.order = randomPos;
  });
})();

// Set timer to show the color of the cells for 0.5 seconds. After that ,flip to white.
setTimeout(function() { cells.forEach(cell => cell.classList.toggle('flip')); }, timeout);

cells.forEach(cell => cell.addEventListener('click', flipCell));





