const gameboardModule = (function() {
    let _boardArray = ["", "", "", "", "", "", "", "", ""];

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

    function generateGrid () {
        for (let i = 0; i < _boardArray.length; i++) {
            const container = document.querySelector('#container');
            const gridBox = document.createElement('div');
        //set container to grid, add a CSS class for each gridBox element, gridBox.innerHTML = relevant aappend to container, add i as id, add event listener, 
        //event listener should add currentplayer.marker to array and check for win, change player if no win
        }
    }

    return {
        checkWin: checkWin,
        generateGrid: generateGrid
    };

})();

const playerFactory = (name, marker) => {
    const printMarker = () => console.log(marker);
    return { name, marker, printMarker };
};

const gameHandlerModule = (function () {
    let currentPlayer = firstPlayer.name;

    function createPlayers () {
        const firstPlayer = playerFactory("Steve", "X")
        const secondPlayer = playerFactory("Alice", "X")
    }

    function changePlayer () {
        if (currentPlayer === firstPlayer.name) {
            currentPlayer = secondPlayer.name;
        } else if (currentPlayer === secondPlayer.name) {
            currentPlayer = firstPlayer.name;
        }
    }    
    
    function runGame () {
        //runGame on clicking start button
        createPlayers();
        generateGrid();
    }

    return {
        runGame: runGame,
        changePlayer: changePlayer
    }

})();