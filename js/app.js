const allBox = document.getElementsByClassName('box');
const winner = document.getElementById('winner');
let nineBox = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'];
let gameOn = 1;
let gameMode = 1; // 0=easy, 1=medium/hard

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
    e.target.innerText = 'X'; // '✕'
    e.target.disabled = true;
    nineBox = nineBox.filter(remove => remove !== e.target.id);
    checkWinner('you');
    gameOn === 1 ? (nineBox.length > 0 ? setTimeout(compTurn, 100) : null) : null;
  })
};

function compMediumPlay() {
  let i = 0;
  if (allBox[4].innerText == "") {
    const ccc = nineBox.findIndex((element) => element == allBox[4].id);
    i = ccc;
  }
  // ----------------
  for (const pattern of winPatterns) {
    let val1 = allBox[pattern[0]].innerText;
    let val2 = allBox[pattern[1]].innerText;
    let val3 = allBox[pattern[2]].innerText;

    if (val1 == "X" && val2 == "X") {
      if (val3 == "") {
        const found = nineBox.findIndex((element) => element == allBox[pattern[2]].id);
        i = found;
        break;
      }
    } else if (val2 == "X" && val3 == "X") {
      if (val1 == "") {
        const found = nineBox.findIndex((element) => element == allBox[pattern[0]].id);
        i = found;
        break;
      }
    } else if (val1 == "X" && val3 == "X") {
      if (val2 == "") {
        const found = nineBox.findIndex((element) => element == allBox[pattern[1]].id);
        i = found;
        break;
      }
    }
  }
  // -----------
  const comID = document.getElementById(nineBox[i]);
  comID.innerText = 'O';
  comID.disabled = true;
  nineBox = nineBox.filter(remove => remove !== nineBox[i]);
  checkWinner();
}

function compTurn() {
  if (gameMode === 1) {
    compMediumPlay();
  } else {
    const i = Math.floor(Math.random() * nineBox.length);
    const comID = document.getElementById(nineBox[i]);
    comID.innerText = 'O';
    comID.disabled = true;
    nineBox = nineBox.filter(remove => remove !== nineBox[i]);
    checkWinner();
  }
}

function disabledAllBox() {
  for (const box of allBox) {
    box.disabled = true;
  }
}

function enabledAllBox() {
  for (const box of allBox) {
    box.disabled = false;
    box.innerText = '';
  }
}

function checkWinner(win = 'computer') {
  console.log("Check starting");
  for (const pattern of winPatterns) {
    let pos1Val = allBox[pattern[0]].innerText;
    let pos2Val = allBox[pattern[1]].innerText;
    let pos3Val = allBox[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos1Val === pos3Val) {
        console.log("Winner", pos1Val);
        winner.innerText = "Winner " + win + ".";
        gameOn = 0;
        disabledAllBox();
      }
    }
  }
}

function resetGame() {
  enabledAllBox();
  gameOn = 1;
  nineBox = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'];
  winner.innerText = '';
}

document.getElementById('reset-game').addEventListener('click', resetGame);
