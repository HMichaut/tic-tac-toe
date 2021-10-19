const gameBoard = (() => {
  let board = [[null, null, null], 
                 [null, null, null], 
                 [null, null, null]];
  const getBoard = () => board;
  const play = (token, posx, posy) => {
    board[posy][posx] = token;
  }
  const checkIfGameOver = (inputBoard, token) => {
    return checkLines(inputBoard, token) || checkDiagonals(inputBoard, token);
  }
  const checkLines = (inputBoard, token) => {
    return inputBoard.some(element => element.filter(item => token === item).length == 3) || 
    [0, 1, 2].some(iter => inputBoard.filter(item => token === item[iter]).length == 3);
  }

  const checkDiagonals = (inputBoard, token) => {
    return [0, 1, 2].every(iter => inputBoard[iter][iter] === token) || 
    [0, 1, 2].every(iter => inputBoard[iter][2 - iter] === token);
  }

  return {
    getBoard,
    play,
    checkIfGameOver
  };
})();

// console.log(gameBoard.getBoard());
// gameBoard.play("X", 2, 1);
// console.log(gameBoard.getBoard());

let testBoard1 = [["X", "X", "X"], 
[null, null, null], 
[null, null, null]];
console.log(gameBoard.checkIfGameOver(testBoard1, "X") === true);

let testBoard2 = [[null, null, null], 
["X", "X", "X"], 
[null, null, null]];
console.log(gameBoard.checkIfGameOver(testBoard2, "X") === true);

let testBoard3 = [[null, null, null], 
[null, null, null], 
["X", "X", "X"]];
console.log(gameBoard.checkIfGameOver(testBoard3, "X") === true);

let testBoard4 = [["X", null, null], 
["X", null, null], 
["X", null, null]];
console.log(gameBoard.checkIfGameOver(testBoard4, "X") === true);

let testBoard5 = [[null, "X", null], 
[null, "X", null], 
[null, "X", null]];
console.log(gameBoard.checkIfGameOver(testBoard5, "X") === true);

let testBoard6 = [[null, null, "X"], 
[null, null, "X"], 
[null, null, "X"]];
console.log(gameBoard.checkIfGameOver(testBoard6, "X") === true);

let testBoard7 = [["X", null, "X"], 
[null, null, null], 
[null, null, null]];
console.log(gameBoard.checkIfGameOver(testBoard7, "X") === false);

let testBoard8 = [[null, null, null], 
["X", "X", null], 
[null, null, null]];
console.log(gameBoard.checkIfGameOver(testBoard8, "X") === false);

let testBoard9 = [[null, null, null], 
[null, null, null], 
[null, "X", "X"]];
console.log(gameBoard.checkIfGameOver(testBoard9, "X") === false);

let testBoard10 = [[null, null, null], 
["X", null, null], 
["X", null, null]];
console.log(gameBoard.checkIfGameOver(testBoard10, "X") === false);

let testBoard11 = [[null, "X", null], 
[null, null, null], 
[null, "X", null]];
console.log(gameBoard.checkIfGameOver(testBoard11, "X") === false);

let testBoard12 = [[null, null, "X"], 
[null, null, "X"], 
[null, null, null]];
console.log(gameBoard.checkIfGameOver(testBoard12, "X") === false);

let testBoard13 = [[null, null, "X"], 
[null, null, "X"], 
[null, "X", null]];
console.log(gameBoard.checkIfGameOver(testBoard13, "X") === false);

let testBoard14 = [["X", null, null], 
[null, "X", null], 
[null, null, "X"]];
console.log(gameBoard.checkIfGameOver(testBoard14, "X") === true);

let testBoard15 = [[null, null, "X"], 
[null, "X", null], 
["X", null, null]];
console.log(gameBoard.checkIfGameOver(testBoard15, "X") === true);