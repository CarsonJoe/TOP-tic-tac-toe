
const cells = document.getElementsByClassName('cell');
const button = document.getElementById('button');


const gameBoard = (function () {
    let gameBoard = ['', '', '', '', '', '', '', '', '']

    function updateBoard(gameboard) {
        gameboard.forEach((element, index) => {
            cell = cells[index]
            cell.innerHTML = element
            element ? cell.classList.remove('select') : cell.classList.add('select')
        });
    }

    return {
        setTile: function (pos, val) {
            gameBoard[pos] = val;
            console.log(`updated gameBoard: ${gameBoard}`);
            updateBoard(gameBoard);
        },
        getGameboard: function () {
            return gameBoard;
        },
        resetGameboard: function () {
            gameBoard = ['', '', '', '', '', '', '', '', '']
            updateBoard(gameBoard);
        },
        checkWin: function (round) {
            let testBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            testBoard = concatenateArrays(testBoard, gameBoard)

            if (round < 5) {
                return false
            }
            for (let i = 0; i < 3; i++) {
                if (testBoard[i] === testBoard[i + 3] && testBoard[i] === testBoard[i + 6]) {
                    console.log('|')
                    return true
                }
                if (testBoard[i * 3] === testBoard[i * 3 + 1] && testBoard[i * 3] === testBoard[i * 3 + 2]) {
                    console.log('_')
                    return true
                }
            }
            if (testBoard[0] === testBoard[4] && testBoard[0] === testBoard[8]) {

                console.log('l')
                return true
            }
            if (testBoard[2] === testBoard[4] && testBoard[2] === testBoard[6]) {
                console.log('/')
                return true

            }
            return false
        }
    }
})() // IIFE - cannot be reused

gameBoard.setTile(4, '');


function createPlayer(name, isX = true) {
    let ame = name;
    let X = this.isX; // bool -> true: x | false: o
    let wins = 0;

    function incrementWins() {
        wins++;
    }
    function getWins() {
        return wins;
    }

    return {
        incrementWins, getWins
    }
}

function createGame() {
    let player1 = createPlayer('Car');
    let player2 = createPlayer('Son', false);
    let round = 0;

    for (let i = 0; i < 9; i++) {
        cells[i].addEventListener('click', function (e) {
            cellIndex = indexOfCell(this)
            
            if (!gameBoard.getGameboard()[cellIndex]) { //checks if call is empty
                round % 2 ? gameBoard.setTile(cellIndex, "O") : gameBoard.setTile(cellIndex, "X")
                round++
                if(gameBoard.checkWin(round)){
                    round % 2 ? showWin('X') : showWin('O')
                }
            }
        })
    }

    button.addEventListener('click', function () {
        //if !win ->
        document.getElementsByClassName('winScreen')[0].classList.add('showWin')
        console.log('reset')
        gameBoard.resetGameboard();
        round = 0;
    })

    function indexOfCell(cell) {
        for (let i = 0; i < 9; i++) {
            if (cells[i] === cell) {
                return i
            }
        }
    }

    function showWin(player){
        console.log(`${player} wins`)
        document.getElementsByClassName('winScreen')[0].classList.remove('showWin')
        document.getElementsByClassName('winMessage')[0].innerText = `${player} wins`

    }




}

createGame()

function concatenateArrays(arr1, arr2) {
    // Check if both arrays have the same length
    if (arr1.length !== arr2.length) {
        return "Arrays must have the same length";
    }

    let result = "";

    // Iterate through the arrays
    for (let i = 0; i < arr1.length; i++) {
        // If the value in arr2 is not empty, use it; otherwise, use the value in arr1
        const value = arr2[i] ? arr2[i] : arr1[i];
        result += value;
    }

    return result;
}