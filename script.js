let origBoard;
const aiPlayer = 'x';
const huPlayer = '0';

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];

const cells = document.querySelectorAll(".cell");


 startGame = () => {
    document.querySelector('.endGame').style.display = 'none';
    
    origBoard = Array.from(Array(9).keys());

    for(let i=0; i<cells.length; i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }    
    console.log('start');
}
startGame();


function turnClick(event) {
    turn(event.target.id, huPlayer); 
}

function turn(squareId, player) {
    origBoard[squareId, player];
    document.getElementById(squareId).innerText = player;


    let gameWon = checkWin(origBoard, player);
    if()
}



