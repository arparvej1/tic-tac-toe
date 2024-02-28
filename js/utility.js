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

function disabledGameMode() {
  gameEasy.disabled = true;
  gameMedium.disabled = true;
  gameHard.disabled = true;
  playWithFriend.disabled = true;
  playWithComp.disabled = true;
  playFirstComputer.classList.add('hidden');
}

function enabledGameMode() {
  gameEasy.disabled = false;
  gameMedium.disabled = false;
  gameHard.disabled = false;
  playWithFriend.disabled = false;
  playWithComp.disabled = false;
}

function hideGameMode() {
  gameModeForm.classList.add('hidden');
  formDivider.classList.add('hidden');
  playWithFriend.parentNode.classList.add('playWithActive');
  playWithComp.parentNode.classList.remove('playWithActive');
  playFirstComputer.classList.add('hidden');
  playTwoPlayer = 1;
}

function showGameMode() {
  gameModeForm.classList.remove('hidden');
  formDivider.classList.remove('hidden');
  playWithFriend.parentNode.classList.remove('playWithActive');
  playWithComp.parentNode.classList.add('playWithActive');
  playFirstComputer.classList.remove('hidden');
  playTwoPlayer = 0;
}

function addGameModeBgClass(mode) {
  gameEasy.parentNode.classList.remove('playWithActive');
  gameMedium.parentNode.classList.remove('playWithActive');
  gameHard.parentNode.classList.remove('playWithActive');
  mode.parentNode.classList.add('playWithActive');
}

function checkWinner(win) {
  for (const pattern of winPatterns) {
    let pos1Val = allBox[pattern[0]].innerText;
    let pos2Val = allBox[pattern[1]].innerText;
    let pos3Val = allBox[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos1Val === pos3Val) {
        winner.innerText = `Winner ${win}.`;
        gameOn = 0;
        disabledAllBox();
        break;
      } else if (nineBox.length == 0) {
        winner.innerText = "Game Draw.";
      }
    }
  }
}

function compMediumPlay() { // computer play medium mode
  let i = 0;
  if (allBox[4].innerText == "") {
    const ccc = nineBox.findIndex((element) => element == allBox[4].id);
    i = ccc;
  } else if (allBox[4].innerText == "X" && allBox[8].innerText == "X") {
    const ccc = nineBox.findIndex((element) => element == allBox[2].id);
    if (ccc > -1) {
      i = ccc;
    }
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
  compTurnClick(i);
}

function compHardPlay() { // computer play hard mode
  let i = 0;
  // -----------
  for (const pattern of hardPatterns) {
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
    } else {
      i = undefined;
    }
  }
  // ----------------
  for (const pattern of winPatterns) {
    let val1 = allBox[pattern[0]].innerText;
    let val2 = allBox[pattern[1]].innerText;
    let val3 = allBox[pattern[2]].innerText;

    if (val1 == val2 && val1 != "") {
      if (val3 == "") {
        const found = nineBox.findIndex((element) => element == allBox[pattern[2]].id);
        i = found;
        break;
      }
    } else if (val2 == val3 && val2 != "") {
      if (val1 == "") {
        const found = nineBox.findIndex((element) => element == allBox[pattern[0]].id);
        i = found;
        break;
      }
    } else if (val1 == val3 && val1 != "") {
      if (val2 == "") {
        const found = nineBox.findIndex((element) => element == allBox[pattern[1]].id);
        i = found;
        break;
      }
    }
  }
  // -----------

  if (i === undefined) {
    compMediumPlay();
  } else {
    compTurnClick(i);
  }
}

function compTurn() {
  if (gameMode === 1) {
    compMediumPlay();
  } else if (gameMode === 2) {
    compHardPlay();
  } else { // computer play easy mode
    const i = Math.floor(Math.random() * nineBox.length);
    compTurnClick(i);
  }
}

function compTurnClick(index) {
  const comID = document.getElementById(nineBox[index]);
  comID.innerText = 'O';
  comID.disabled = true;
  nineBox = nineBox.filter(remove => remove !== nineBox[index]);
  checkWinner('Computer',);
}

function playFirstComp() {
  compTurn();
  playFirstComputer.classList.add('hidden');
}