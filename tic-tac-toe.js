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
  const checkIfGameDraw = (inputBoard) => {
    return inputBoard.every(line => line.every(cell => cell !== null));
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
    checkIfGameDraw,
    incorrectInput,
    resetBoard
  };
})();

const Player = (id, name, token, score) => {
  const getId  = () => id;
  const getName  = () => name;
  const getToken  = () => token;
  const getScore  = () => score;
  const updateScore = () => score++;
  return {getId, getName, getToken, getScore, updateScore}
}

const game = (() => {
  const randomizeArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  let initialPlayerArray = [Player(1, 'jim', "X", 0), Player(2, 'jeff', "O", 0)];
  let playerArray = randomizeArray(initialPlayerArray.slice(0));
  
  const changeTurn = () => {
    playerArray = playerArray.reverse();
    let scorePlayer;
    let otherPlayer;
    console.log(playerArray[0].getId());
    if (playerArray[0].getId() === 1) {
      scorePlayer = document.getElementById("score-player-1");
      otherPlayer = document.getElementById("score-player-2");
    } else {
      scorePlayer = document.getElementById("score-player-2");
      otherPlayer = document.getElementById("score-player-1");
    };
    scorePlayer.style.borderStyle = "solid";
    otherPlayer.style.borderStyle = "hidden";
  }
  const randomTurn = () => PlayerArray = randomizeArray(playerArray);
  const gameDraw = () => {
    if (gameBoard.checkIfGameDraw(gameBoard.getBoard())) {
      gameOver();
    }
  }

  const gameOver = () => {
    let wrapper = document.getElementById("wrapper");
    wrapper.style.visibility = "hidden";
    
    let boardId = gameBoard.getBoardId();
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        let cellId =  boardId[y][x];
        let cell = document.getElementById(cellId);
        cell.innerHTML = null;
        cell.className = "cell";
      }  
    }
    let resetdiv = document.getElementById("reset");
    if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
      let gameOverText = document.createElement("p");
      gameOverText.id = "game-over-text"
      gameOverText.innerHTML = playerArray[1].getName() + " Wins !";
      resetdiv.appendChild(gameOverText);
    } else {
      let gameOverText = document.createElement("p");
      gameOverText.id = "game-over-text"
      gameOverText.innerHTML = "Draw !";
      resetdiv.appendChild(gameOverText);
    }
    gameBoard.resetBoard();

    scorePlayer = document.getElementById("score-player-1");
    otherPlayer = document.getElementById("score-player-2");

    scorePlayer.style.borderStyle = "hidden";
    otherPlayer.style.borderStyle = "hidden";

    let resetButton = document.createElement("button");
    resetButton.id = "resetbutton"
    resetButton.setAttribute("type", "button");
    resetButton.innerHTML = "New Game";
    resetButton.addEventListener("click", () => {
      resetGame();
    });
    resetdiv.appendChild(resetButton);
  }

  const resetGame = () => {
    let resetButton = document.getElementById("resetbutton");
    resetButton.remove();
    let gameOverText = document.getElementById("game-over-text");
    gameOverText.remove();
    randomTurn()
    wrapper.style.visibility = "visible";
    if (playerArray[0].getId() === 1) {
      scorePlayer = document.getElementById("score-player-1");
      otherPlayer = document.getElementById("score-player-2");
    } else {
      scorePlayer = document.getElementById("score-player-2");
      otherPlayer = document.getElementById("score-player-1");
    };
    scorePlayer.style.borderStyle = "solid";
    otherPlayer.style.borderStyle = "hidden";
  }

  const gameCheck = () => {
    if (gameBoard.checkIfGameOver(gameBoard.getBoard(), playerArray[1].getToken())) {
      playerArray[1].updateScore();

      const scorePlayer1 = document.getElementById("score-player-1");
      scorePlayer1.innerHTML = initialPlayerArray[0].getName() + " : " + initialPlayerArray[0].getScore();
  
      const scorePlayer2 = document.getElementById("score-player-2");
      scorePlayer2.innerHTML = initialPlayerArray[1].getName() + " : " + initialPlayerArray[1].getScore();

      gameOver();
    }
  }

  const addLinks = () => {
    const one = document.getElementById("one");
    one.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 0, 0);
      gameCheck();
      gameDraw();
    });

    const two = document.getElementById("two");
    two.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 1, 0);
      gameCheck();
      gameDraw();
    });

    const three = document.getElementById("three");
    three.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 2, 0);
      gameCheck();
      gameDraw();
    });

    const four = document.getElementById("four");
    four.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 0, 1);
      gameCheck();
      gameDraw();
    });

    const five = document.getElementById("five");
    five.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 1, 1);
      gameCheck();
      gameDraw();
    });

    const six = document.getElementById("six");
    six.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 2, 1);
      gameCheck();
      gameDraw();
    });

    const seven = document.getElementById("seven");
    seven.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 0, 2);
      gameCheck();
      gameDraw();
    });

    const eight = document.getElementById("eight");
    eight.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 1, 2);
      gameCheck();
      gameDraw();
    });

    const nine = document.getElementById("nine");
    nine.addEventListener("click", () => {
      gameBoard.play(playerArray[0].getToken(), 2, 2);
      gameCheck();
      gameDraw();
    });
  }

  const addPlayerScores = () => {
    const scorediv = document.getElementById("score");
    const scorePlayer1 = scorediv.appendChild(document.createElement('p'));
    scorePlayer1.className = "score-player";
    scorePlayer1.id = "score-player-1";
    scorePlayer1.innerHTML = initialPlayerArray[0].getName() + " : " + initialPlayerArray[0].getScore();

    const scorePlayer2 = scorediv.appendChild(document.createElement('p'));
    scorePlayer2.className = "score-player";
    scorePlayer2.id = "score-player-2";
    scorePlayer2.innerHTML = initialPlayerArray[1].getName() + " : " + initialPlayerArray[1].getScore();
  }

  const startGame = () => {
    wrapper.style.visibility = "visible";
    addPlayerScores();
    if (playerArray[0].getId() === 1) {
      scorePlayer = document.getElementById("score-player-1");
      otherPlayer = document.getElementById("score-player-2");
    } else {
      scorePlayer = document.getElementById("score-player-2");
      otherPlayer = document.getElementById("score-player-1");
    };
    scorePlayer.style.borderStyle = "solid";
    otherPlayer.style.borderStyle = "hidden";
  }

  function deleteForm() {
    let new_form = document.body.appendChild(document.createElement('div'));
    new_form.setAttribute('id', 'reset');
    let old_form = document.getElementById("reset");
    old_form.parentNode.replaceChild(new_form, old_form);
  }
  
  const createForm = () => {
    let down = document.getElementById("reset");
                
    // Create a break line element
    let br = document.createElement("br"); 
    function frm_crt_fun() {
                  
      // Create a form synamically
      let form = document.createElement("form");
  
      let label_name_1 = document.createElement("Label");
      label_name_1.innerHTML="Player 1 Name";
  
      // Create an input element for title
      let frm_name_1 = document.createElement("input");
      frm_name_1.setAttribute("type", "text");
      frm_name_1.setAttribute("name", "name_1");
  
      let label_name_2 = document.createElement("Label");
      label_name_2.innerHTML="Player 2 Name";
  
      // Create an input element for author
      let frm_name_2 = document.createElement("input");
      frm_name_2.setAttribute("type", "text");
      frm_name_2.setAttribute("name", "name_2");
  
      // create a submit button
      let s = document.createElement("button");
      
      s.setAttribute("type", "button");
      s.innerHTML = "Start Game";
                    
      // Append the full name input to the form
      form.appendChild(label_name_1);
      form.appendChild(br.cloneNode()); 
      form.appendChild(frm_name_1); 
        
      // Inserting a line break
      form.appendChild(br.cloneNode()); 
      form.appendChild(br.cloneNode()); 
        
      // Append the DOB to the form
      form.appendChild(label_name_2);
      form.appendChild(br.cloneNode()); 
      form.appendChild(frm_name_2); 
  
      // Inserting a line break
      form.appendChild(br.cloneNode()); 
      form.appendChild(br.cloneNode()); 
        
      // Append the submit button to the form
      form.appendChild(s);
      s.addEventListener("click", () => {
        createPlayerArray(frm_name_1.value, frm_name_2.value);
        startGame();
        deleteForm();
      });
  
      down.appendChild(form);
    }
    frm_crt_fun()
  }

  const createPlayerArray = (name1, name2) => {
    initialPlayerArray = [Player(1, name1, "X", 0), Player(2, name2, "O", 0)];
    playerArray = randomizeArray(initialPlayerArray.slice(0));
  }

  const play = () => {
    createForm();
    addLinks();
  }

  return {
    play,
    changeTurn,
    createPlayerArray,
    randomTurn
  };
})();

game.play();
