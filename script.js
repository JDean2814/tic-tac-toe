const gameMess = document.querySelector('.game_message');
const gameResult = document.querySelector('#game_result');
const restartBtn = document.getElementById('restart_game_btn');
const boardSpaces = document.querySelectorAll('.board_spaces');
const charBtns = document.querySelectorAll('.char_btn');

let boardArr = ['','','','','','','','',''];
const WINNER_ARRAY = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let character = 'x';
let charSelectTrue = false;


charBtns.forEach(element => {
    element.addEventListener('click', (e) => {
        if (!charSelectTrue) {
            character = e.target.innerHTML;
            charSelectTrue = true;
        } else {
            return;
        }
        
    });
});


function charSwap() {
    character === 'x' ? character = 'o' : character = 'x';
    return character;
};

function handleClick(e) {
    let arr = [];
    e.target.innerHTML = character;
    for (let i = 0; i < boardSpaces.length; i++) {
        boardArr[i] = boardSpaces[i].innerHTML;
    };

    for (let i = 0; i < WINNER_ARRAY.length; i++) {
        for (let j = 0; j < WINNER_ARRAY[i].length; j++) {
            arr.push(boardArr[WINNER_ARRAY[i][j]]);
        };

        if (arr.every((element) => element === character)) {
            gameMess.style.display = "flex";
            gameResult.innerHTML = `'${character.toUpperCase()}' wins!`
            return;
        } else if(boardArr.every((element) => element != '')) {
            gameMess.style.display = "flex";
            gameResult.innerHTML = `It is a draw!`;
        };
        arr = [];
    };
    character = charSwap();
};

boardSpaces.forEach(element => {
    element.addEventListener('click', (e) => handleClick(e));
});

//Restart game button
restartBtn.addEventListener('click', () => {
    boardArr = ['','','','','','','','',''];
    boardSpaces.forEach((element) => element.innerHTML = '');
    gameMess.style.display = "none";
});
