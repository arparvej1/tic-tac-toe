const allBox = document.getElementsByClassName('box');
const selectedBox = [];
let nineBox = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'];

for (const box of allBox) {
  box.addEventListener('click', function (e) {
    if (!selectedBox.includes(e.target.id)) {
      e.target.innerText = "X";
      selectedBox.push(e.target.id);
      nineBox = nineBox.filter(remove => remove !== e.target.id);
      nineBox.length > 0 ? compTurn() : null;
    }
  })
};

function compTurn() {
  const index = Math.floor(Math.random() * nineBox.length);
  const compSelId = nineBox[index];
  document.getElementById(compSelId).innerText = 'O';
  selectedBox.push(compSelId);
  nineBox = nineBox.filter(remove => remove !== compSelId);
  console.log(nineBox[index]);
  console.log(selectedBox);
  console.log(nineBox);

}