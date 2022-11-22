const gameMess = document.querySelector('.game_message');
const gameResult = document.querySelector('#game_result');
const restartBtn = document.getElementById('restart_game_btn');
const boardSpaces = document.querySelectorAll('.board_spaces');
const charBtns = document.querySelectorAll('.char_btn');
const playerChar = document.getElementById('player_char');
const aiChar = document.getElementById('ai_char');

let boardArr = ['','','','','','','','',''];
const WINNER_ARRAY = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let character = 'x';
let ai = 'o';
let charSelectTrue = false;


charBtns.forEach(element => {
    element.addEventListener('click', (e) => {
        if (!charSelectTrue) {
            character = e.target.innerHTML;
            ai = charSwap(character);
            playerChar.innerHTML = `You are: ${character.toUpperCase()}`;
            aiChar.innerHTML = `AI is: ${ai.toUpperCase()}`;
            charSelectTrue = true;
        } else {
            return;
        }
        
    });
});

function charSwap(character) {
    character === 'x' ? character = 'o' : character = 'x';
    return character;
};

boardSpaces.forEach(element => {
    element.addEventListener('click', (e) => handleClick(e));
});

function getBoardArr() {
    for (let i = 0; i < boardSpaces.length; i++) {
        boardArr[i] = boardSpaces[i].innerHTML;
    };
};

function findWinOrDraw(arr) {
    for (let i = 0; i < WINNER_ARRAY.length; i++) {
        for (let j = 0; j < WINNER_ARRAY[i].length; j++) {
            arr.push(boardArr[WINNER_ARRAY[i][j]]);
        };

        if (arr.every((element) => element === character)) {
            gameMess.style.display = "flex";
            gameResult.innerHTML = `'${character.toUpperCase()}' wins!`
            return;
        } else if(arr.every((element) => element === ai)) {
            gameMess.style.display = "flex";
            gameResult.innerHTML = `'${ai.toUpperCase()}' wins!`
            return;
        } else if(boardArr.every((element) => element != '')) {
            gameMess.style.display = "flex";
            gameResult.innerHTML = `It is a draw!`;
        };
        arr = [];
    };
};

function handleClick(e) {
    let arr = [];
    if (e.target.innerHTML === '') {
        e.target.innerHTML = character;
        getBoardArr();
        findWinOrDraw(arr);
        aiMove();
        findWinOrDraw(arr);
    } else {
        return;
    };
};

//Restart game button
restartBtn.addEventListener('click', () => {
    boardArr = ['','','','','','','','',''];
    boardSpaces.forEach((element) => element.innerHTML = '');
    gameMess.style.display = "none";
    charSelectTrue = false;
});

function aiMove() {
    let randomMove = Math.floor(Math.random() * boardSpaces.length);

    if (boardArr.every((element) => element === character || element === ai)) {
        return;
    } else if (boardSpaces[randomMove].innerHTML === '') {
            boardSpaces[randomMove].innerHTML = ai;
            boardArr[randomMove] = ai;
    } else {
        aiMove();
    };
};