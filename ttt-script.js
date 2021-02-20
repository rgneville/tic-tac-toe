const ctr = document.querySelector('#container');
const startButton = document.querySelector('#start');
const scorebox = document.querySelector('#scorebox');
const player1Element = document.querySelector('#player-1-name');
const player2Element = document.querySelector('#player-2-name');

startButton.addEventListener('click', () => {
    gameHandlerModule.runGame();
});

//current issues: checkWin not working, checkWinTest not working, can't get currentPlayer object into generateGrid event listener so the right marker goes into the grid.

const gameboardModule = (function() {
    let _boardArray = ["X", "", "", "X", "", "", "X", "", ""];

    function _checkWin () {
        //checking all 8 possible winning combinations in _boardArray
        if (_boardArray[0] === _boardArray[3] === _boardArray[6]
            || _boardArray[1] === _boardArray[4] === _boardArray[7]
            || _boardArray[2] === _boardArray[5] === _boardArray[8]
            || _boardArray[0] === _boardArray[1] === _boardArray[2]
            || _boardArray[3] === _boardArray[4] === _boardArray[5]
            || _boardArray[6] === _boardArray[7] === _boardArray[8]
            || _boardArray[0] === _boardArray[4] === _boardArray[8]
            || _boardArray[2] === _boardArray[4] === _boardArray[6]) {
                return true
            } else {
                return false
            }
    }

    function checkWin () {
        _checkWin();
    }

    //test function
    function checkWinTest () {
        if (_boardArray[0] === _boardArray[3] === _boardArray[6]) {
                return true
            } else {
                return false
            }
    }

    function generateGrid () {
        for (let i = 0; i < _boardArray.length; i++) {
            const markerBox = document.createElement('div');
            markerBox.classList.add('gridbox');
            markerBox.id = `${i}`;
            scorebox.innerHTML = "Game started";
            markerBox.addEventListener('click', (e) => {
                if (_boardArray[i] != "") {
                    e.stopPropagation();
                };
                markerBox.innerHTML = "x";
                const winbool = checkWin();
                if (winbool === false) {
                    gameHandlerModule.changePlayer();
                } else if (winbool === true) {
                    scorebox.innerHTML = "Winner winner chicken dinner!";
                };
            });
            ctr.appendChild(markerBox);
        //set container to grid, add a CSS class for each gridBox element, append to container, add i as id, add event listener, 
        //event listener should add currentplayer.marker to array and check for win, change player if no win
        }
    }

    return {
        generateGrid: generateGrid,
        checkWin: checkWin,
        checkWinTest: checkWinTest
    };

})();

const playerFactory = (name, marker) => {
    const printMarker = () => marker;
    return { name, marker, printMarker };
};

const gameHandlerModule = (function () {
    let firstPlayer = {};
    let secondPlayer = {};
    let currentPlayer = {};

    function createPlayers () {
        let firstPlayerName = player1Element.value;
        let secondPlayerName = player2Element.value;
        firstPlayer = playerFactory(firstPlayerName, "X");
        secondPlayer = playerFactory(secondPlayerName, "O");
        currentPlayer = firstPlayer;
    }

    function changePlayer () {
        if (currentPlayer === firstPlayer) {
            currentPlayer = secondPlayer;
        } else if (currentPlayer === secondPlayer) {
            currentPlayer = firstPlayer;
        }
    }    
    
    function runGame () {
        createPlayers();
        gameboardModule.generateGrid();
    }

    return {
        runGame: runGame,
        changePlayer: changePlayer
    }

})();

let winTest = checkWinTest();
console.log(winTest);