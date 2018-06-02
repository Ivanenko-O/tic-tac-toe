let origBoard;
const aiPlayer = "0";
const huPlayer = "X";
let curPlayer = huPlayer;

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

//   origBoard = Array.from(Array(9).keys());
  origBoard = new Array(9);

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
  console.log("start");
};
startGame();

function switchPlayer() {
  if (curPlayer == huPlayer) {
    curPlayer = aiPlayer;
  } else {
    curPlayer = huPlayer;
  }
}

function turnClick(event) {
  // console.log(event);

  // let player;

  //     if(player == huPlayer) {
  //         turn(event.target.id, huPlayer);
  //         player = aiPlayer;
  //         console.log(player);

  //     }
  //     else {
  //          turn(event.target.id, aiPlayer);
  //          player = huPlayer;
  // }
  console.log(curPlayer);
  turn(event.target.id, curPlayer);
  switchPlayer();
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;

  var gameWon = checkWin2(origBoard, player);


  if (gameWon) {
      gameOver(gameWon);
    // winCombos[gameWon.index].forEach(e => {
        // document.getElementById(e).style.backgroundColor = "#f00";
    // });
  }
  
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => {
    return e === player ? a.concat(i) : a;
  }, []);

  let gameWon = null;

  console.log(plays);

  for (let [index, win] of winCombos.entries()) {
    // console.log({index,win});

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
        }
        // if (comb.every(i => board[i] == player)) {
            // gameWon = {index:ind, player: player};
        // }
        
    })
    return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = "red";
  }

  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
}
