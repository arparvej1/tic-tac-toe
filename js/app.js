const allBox = document.getElementsByClassName('box');
const winner = document.getElementById('winner');
// const selectedBox = [];
let nineBox = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'];
let gameOn = 1;

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


function compTurn() {
  const i = Math.floor(Math.random() * nineBox.length);
  const comID = document.getElementById(nineBox[i]);
  comID.innerText = 'O';
  comID.disabled = true;
  // selectedBox.push(nineBox[i]);
  nineBox = nineBox.filter(remove => remove !== nineBox[i]);
  checkWinner();
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

function checkWinner(win='computer') {
  console.log("Check starting");
  for (const pattern of winPatterns) {
    let pos1Val = allBox[pattern[0]].innerText;
    let pos2Val = allBox[pattern[1]].innerText;
    let pos3Val = allBox[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos1Val === pos3Val) {
        console.log("Winner", pos1Val);
        winner.innerText = "Winner "+ win +".";
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




// -----------------------
// for (const box of allBox) {
//   box.addEventListener('click', function (e) {
//     if (!selectedBox.includes(e.target.id)) {
//       e.target.innerText = 'X'; // '✕'
//       e.target.disabled = true;
//       selectedBox.push(e.target.id);
//       nineBox = nineBox.filter(remove => remove !== e.target.id);
//       checkWinner();
//       if (gameOn === 1) {
//         nineBox.length > 0 ? setTimeout(compTurn, 100) : null;
//       }
//     }
//   })
// };