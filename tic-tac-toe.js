const gameBoard = (() => {
  let board = [[null, null, null], 
               [null, null, null], 
               [null, null, null]];
  const boardId = [["one", "two", "three"], 
                   ["four", "five", "six"], 
                   ["seven", "eight", "nine"]];
  const getBoard = () => board;
  const getBoardId = () => boardId;
  const resetBoard = () => {
    board = [[null, null, null], 
                 [null, null, null], 
                 [null, null, null]];
  }
  const play = (token, posx, posy) => {
    if (!alreadyTaken(board, posx, posy)) {
      board[posy][posx] = token;
      let cellSelected = boardId[posy][posx];
      let cell = document.getElementById(cellSelected);
      cell.innerHTML = token;
      cell.className = "inactivecell"
      game.changeTurn();
    }
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
  const incorrectInput = (inputBoard, posx, posy) => {
    return outsideGameboard(posx, posy) || alreadyTaken(inputBoard, posx, posy);
  }
  const outsideGameboard = (posx, posy) => {
    return posx > 3 || posx < 0 || posy > 3 || posy < 0;
  }
  const alreadyTaken = (inputBoard, posx, posy) => {
    return inputBoard[posy][posx] !== null;
  }

  return {
    getBoard,
    getBoardId,
    play,
    checkIfGameOver,
    incorrectInput,
    resetBoard
  };
})();

const Player = (name, token) => {
  const getName  = () => name;
  const getToken  = () => token;
  return {getName, getToken}
}

const game = (() => {
  let playerArray = [Player('jim', "X"), Player('jeff', "O")];
  const changeTurn = () => playerArray = playerArray.reverse();

  // const recursivePrompt = () => {
  //   let psnx = parseInt(prompt("x"));
  //   let psny = parseInt(prompt("y"));
  //   if (gameBoard.incorrectInput(gameBoard.getBoard(), psnx, psny)) {
  //     return recursivePrompt();
  //   } else {
  //     return [psnx, psny]
  //   }
  // }
  const gameOver = () => {
    let wrapper = document.getElementById("wrapper");
    // wrapper.style.visibility = "hidden";
    gameBoard.resetBoard();
    let boardId = gameBoard.getBoardId();
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        let cellId =  boardId[y][x];
        let cell = document.getElementById(cellId);
        cell.innerHTML = null;
        cell.className = "cell";
      }  
    }
  }

  const addLinks = () => {
    const one = document.getElementById("one");
    one.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 0, 0);
      if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
        gameOver();
      }
    });

    const two = document.getElementById("two");
    two.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 1, 0);
      if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
        gameOver();
      }
    });

    const three = document.getElementById("three");
    three.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 2, 0);
      if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
        gameOver();
      }
    });

    const four = document.getElementById("four");
    four.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 0, 1);
      if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
        gameOver();
      }
    });

    const five = document.getElementById("five");
    five.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 1, 1);
      if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
        gameOver();
      }
    });

    const six = document.getElementById("six");
    six.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 2, 1);
      if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
        gameOver();
      }
    });

    const seven = document.getElementById("seven");
    seven.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 0, 2);
      if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
        gameOver();
      }
    });

    const eight = document.getElementById("eight");
    eight.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 1, 2);
      if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
        gameOver();
      }
    });

    const nine = document.getElementById("nine");
    nine.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 2, 2);
      if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
        gameOver();
      }
    });
  }

  const play = () => {
    addLinks();
    // console.log(gameBoard.getBoard());
    // do {
    //   posnDuo = recursivePrompt();
    //   let psnx = posnDuo[0];
    //   let psny = posnDuo[1];
    //   gameBoard.play(playerArray[0].getToken(), psnx, psny);
    //   console.log(gameBoard.getBoard());
    //   changeTurn(playerArray);
    //   console.log(playerArray[1].getToken());
    // } while (!gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken()));
  }

  return {
    play,
    changeTurn
  };
})();

game.play();


// console.log(gameBoard.getBoard());

// const player1 = Player('jim', "X");
// const player2 = Player('jeff', "O");
// const playerArray = [Player('jim', "X"), Player('jeff', "O")];

// console.log(gameBoard.getBoard());
// gameBoard.play("X", 2, 1);
// console.log(gameBoard.getBoard());

// let testBoard1 = [["X", "X", "X"], 
// [null, null, null], 
// [null, null, null]];
// console.log(gameBoard.checkIfGameOver(testBoard1, "X") === true);

// let testBoard2 = [[null, null, null], 
// ["X", "X", "X"], 
// [null, null, null]];
// console.log(gameBoard.checkIfGameOver(testBoard2, "X") === true);

// let testBoard3 = [[null, null, null], 
// [null, null, null], 
// ["X", "X", "X"]];
// console.log(gameBoard.checkIfGameOver(testBoard3, "X") === true);

// let testBoard4 = [["X", null, null], 
// ["X", null, null], 
// ["X", null, null]];
// console.log(gameBoard.checkIfGameOver(testBoard4, "X") === true);

// let testBoard5 = [[null, "X", null], 
// [null, "X", null], 
// [null, "X", null]];
// console.log(gameBoard.checkIfGameOver(testBoard5, "X") === true);

// let testBoard6 = [[null, null, "X"], 
// [null, null, "X"], 
// [null, null, "X"]];
// console.log(gameBoard.checkIfGameOver(testBoard6, "X") === true);

// let testBoard7 = [["X", null, "X"], 
// [null, null, null], 
// [null, null, null]];
// console.log(gameBoard.checkIfGameOver(testBoard7, "X") === false);

// let testBoard8 = [[null, null, null], 
// ["X", "X", null], 
// [null, null, null]];
// console.log(gameBoard.checkIfGameOver(testBoard8, "X") === false);

// let testBoard9 = [[null, null, null], 
// [null, null, null], 
// [null, "X", "X"]];
// console.log(gameBoard.checkIfGameOver(testBoard9, "X") === false);

// let testBoard10 = [[null, null, null], 
// ["X", null, null], 
// ["X", null, null]];
// console.log(gameBoard.checkIfGameOver(testBoard10, "X") === false);

// let testBoard11 = [[null, "X", null], 
// [null, null, null], 
// [null, "X", null]];
// console.log(gameBoard.checkIfGameOver(testBoard11, "X") === false);

// let testBoard12 = [[null, null, "X"], 
// [null, null, "X"], 
// [null, null, null]];
// console.log(gameBoard.checkIfGameOver(testBoard12, "X") === false);

// let testBoard13 = [[null, null, "X"], 
// [null, null, "X"], 
// [null, "X", null]];
// console.log(gameBoard.checkIfGameOver(testBoard13, "X") === false);

// let testBoard14 = [["X", null, null], 
// [null, "X", null], 
// [null, null, "X"]];
// console.log(gameBoard.checkIfGameOver(testBoard14, "X") === true);

// let testBoard15 = [[null, null, "X"], 
// [null, "X", null], 
// ["X", null, null]];
// console.log(gameBoard.checkIfGameOver(testBoard15, "X") === true);

// console.log(player1.getName() === "jim");
// console.log(player1.getToken() === "X");
// console.log(player2.getName() === "jeff");
// console.log(player2.getToken() === "O");