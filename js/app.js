const allBox = document.getElementsByClassName('box');
const winner = document.getElementById('winner');
let nineBox = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'];
let gameOn = 1;

let gameMode = 1; // 0=easy, 1=medium 2=hard
const gameEasy = document.getElementById('gameModeEasy');
const gameMedium = document.getElementById('gameModeMedium');
const gameHard = document.getElementById('gameModeHard');
gameEasy.addEventListener('click', function () { gameMode = 0; addGameModeBgClass(gameEasy); });
gameMedium.addEventListener('click', function () { gameMode = 1; addGameModeBgClass(gameMedium); });
gameHard.addEventListener('click', function () { gameMode = 2; addGameModeBgClass(gameHard); });
const playFirstComputer = document.getElementById('playFirstComp');

const gameModeForm = document.getElementById('gameModeForm');
const formDivider = document.getElementById('formDivider');
const playWithComp = document.getElementById('playWithComp');
const playWithFriend = document.getElementById('playWithFriend');
let playTwoPlayer = 0;
let turnO = false;
playWithComp.addEventListener('click', function () { showGameMode() });
playWithFriend.addEventListener('click', function () { hideGameMode() });

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

for (const box of allBox) {
  box.addEventListener('click', function (e) {
    disabledGameMode();
    if (playTwoPlayer === 1) {
      withTwoFriends(e);
    } else {
      withCompPlay(e);
    }
  })
};

function withTwoFriends(e) {
  if (turnO) { //playerO
    e.target.innerText = "O";
    turnO = false;
  } else { //playerX
    e.target.innerText = "X";
    turnO = true;
  }
  e.target.disabled = true;
  nineBox = nineBox.filter(remove => remove !== e.target.id);
  checkWinner(turnO ? 'X' : 'O');
}

function withCompPlay(e) {
  e.target.innerText = 'X';
  e.target.disabled = true;
  nineBox = nineBox.filter(remove => remove !== e.target.id);
  checkWinner('you');
  gameOn === 1 ? (nineBox.length > 0 ? setTimeout(compTurn, 100) : null) : null;
}

function resetGame() {
  enabledAllBox();
  enabledGameMode();
  gameOn = 1;
  nineBox = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'];
  winner.innerText = '';
  playFirstComputer.classList.remove('hidden');
}

document.getElementById('reset-game').addEventListener('click', resetGame);
