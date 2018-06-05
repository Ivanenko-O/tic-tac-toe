let origBoard;
const aiPlayer = "0";
const huPlayer = "X";
let curPlayer = huPlayer;
const cModeBtn = document.getElementById('computer');
const hModeBtn = document.getElementById('human');

let vsComp = false;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

const cells = document.querySelectorAll(".cell");

startGame = () => {
  document.querySelector(".endGame").style.display = "none";

  origBoard = Array.from(Array(9).keys());
//   origBoard = new Array(9);

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = ""; 
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
};
startGame();

function switchMode(e) {
    if (e.id == hModeBtn.id){
        cModeBtn.checked = false;
    } else {
        hModeBtn.checked = false;
    }
}

function switchPlayer() {
  if (curPlayer == huPlayer) {
    curPlayer = aiPlayer;
  } else {
    curPlayer = huPlayer;
  }
}

function turnClick(event) {

    if (turn(event.target.id, curPlayer) && hModeBtn.checked) {
        switchPlayer();
    } else if(!checkTie()) {
            turn(bestSpot(), aiPlayer);
    }
}

function declareWinner(who) {
    document.querySelector('.endGame').style.display = 'block';
    document.querySelector('.endGame .text').innerText = who + ' is Win';
}

function emptySpot() {
    return origBoard.filter(function(i){
        return typeof i == 'number';
    })
}

function bestSpot() {
    console.log(emptySpot);
    
    return emptySpot()[0];
}

function checkTie() {
    if (emptySpot().length === 0) {
        for( let i=0; i<cells.length; i++) {
            cells[i].style.backgroundColor = 'forestgreen';
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner('Tie');
        return true;
    }
    return false;
}

function turn(squareId, player) {
    if (typeof origBoard[squareId] == 'number') {
        origBoard[squareId] = player;
        document.getElementById(squareId).innerText = player;
        // document.getElementById(squareId).classList.add('no');

        let gameWon = checkWin(origBoard, player);
    
        if (gameWon) gameOver(gameWon);
        return true;
    }
    return false;
}

function checkWin(board, player) {
    let gameWon = null;

    let plays = board.reduce((a, e, i) => {
        return e === player ? a.concat(i) : a;
    }, []);

    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = { index: index, player: player };
        break;
        }
    }
    
    return gameWon;
}

function checkWin2(board, player) {
    var gameWon = null;

    winCombos.forEach((comb, ind) => {
        var finish = true;
        comb.forEach(i => {
            if (board[i] != player) {
                finish = false;
            }
        });

        if (finish) {
            gameWon = {index:ind, player: player};
            let res = document.querySelector('.endGame');
            res.style.display = 'block';
            res.innerText = 'player ' + gameWon.player + ' is win';        
        }
        // if (comb.every(i => board[i] == player)) {
            // gameWon = {index:ind, player: player};
        // }
        
    })
    return gameWon;
}

function gameOver(gameWon) {    
    declareWinner(gameWon.player);

    for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = "red";
    }

    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", turnClick, false);
    }
}




