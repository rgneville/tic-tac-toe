const ctr = document.querySelector('#container');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const scorebox = document.querySelector('#scorebox');
const player1Element = document.querySelector('#player-1-name');
const player2Element = document.querySelector('#player-2-name');

let boardArray = ["", "", "", "", "", "", "", "", ""];
let winCondition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

let firstPlayer = {};
let secondPlayer = {};
let firstPlayerName = "";
let secondPlayerName = "";
let gameOverBool = false;

startButton.addEventListener('click', () => {
    gameHandlerModule.runGame();
});
resetButton.addEventListener('click', () => {
    gameHandlerModule.resetGame();
});

const gameboardModule = (function() {
    let roundCounter = 0;
    
    function checkWin () {
        let win = winCondition;
        let board = boardArray;
        let emptyElements = board.filter(element => element === "");
        win.forEach(element => {
            let checker = "";
            for (let i = 0; i < 3; i++) {
                checker += board[element[i]];
            }
            if (checker === "XXX") {
                console.log("X wins!");
                scorebox.style.fontSize = "20px";
                scorebox.innerHTML = `Winner winner chicken dinner! <b>${firstPlayerName}</b> is the champion`;
                resetButton.style.display = "initial";
                gameOverBool = true;
                return
            } else if (checker === "OOO") {
                console.log("O wins!");
                scorebox.style.fontSize = "20px";
                scorebox.innerHTML = `Winner winner chicken dinner! <b>${secondPlayerName}</b> is the champion`;
                resetButton.style.display = "initial";
                gameOverBool = true;
                return
            } else if (emptyElements.length === 0) {
                console.log("It's a draw!")
                scorebox.style.fontSize = "20px";
                scorebox.innerHTML = "Nobody wins this time...";
                resetButton.style.display = "initial";
                gameOverBool = true;
                return
            }
            return
        })
    }

    //e.stopPropagation isn't working for some reason? Only bug left to stop overclicking boxes and stop the game after someone wins

    function generateGrid () {
        for (let i = 0; i < boardArray.length; i++) {
            const markerBox = document.createElement('div');
            markerBox.classList.add('gridbox');
            scorebox.innerHTML = `${firstPlayerName} up first!`;
            markerBox.addEventListener('click', (e) => {
                if (boardArray[i] != "") {
                    e.stopPropagation();
                };
                if (gameOverBool === true) {
                    e.stopPropagation();
                };
                if (roundCounter % 2 === 0) {
                    markerBox.innerHTML = "X";
                    boardArray[i] = "X"
                    roundCounter ++;
                    scorebox.innerHTML = `${secondPlayerName} up next! (O marker)`;
                } else if (roundCounter % 2 === 1) {
                    markerBox.innerHTML = "O";
                    boardArray[i] = "O"
                    roundCounter ++;
                    scorebox.innerHTML = `${firstPlayerName} up next! (X marker)`;
                }
                checkWin();
            });
            ctr.appendChild(markerBox);
        }
    }

    return {
        generateGrid: generateGrid
    };

})();

const playerFactory = (name, marker) => {
    return { name, marker };
};

const gameHandlerModule = (function () {

    function createPlayers () {
        firstPlayer = playerFactory(firstPlayerName, "X");
        secondPlayer = playerFactory(secondPlayerName, "O");
    } 
    
    function runGame () {
        firstPlayerName = player1Element.value;
        secondPlayerName = player2Element.value;
        createPlayers();
        gameboardModule.generateGrid();
        startButton.style.display = "none";
    }

    function resetGame () {
        ctr.innerHTML = "";
        boardArray = ["", "", "", "", "", "", "", "", ""];
        firstPlayer = {};
        secondPlayer = {};
        startButton.style.display = "initial";
        resetButton.style.display = "none";
        scorebox.innerHTML = "";
        gameOverBool = false;
    }

    return {
        runGame: runGame,
        resetGame: resetGame
    }

})();