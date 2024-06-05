function GameBoard(){
  const size = 9;
  const board = [];

  const createBoard = () => {
    for(let i = 0; i < size; i++){
      board[i] = ``;
    };
  };

  const getBoard = board;

  const printBoard = () => console.log(board);

  return { createBoard, printBoard, getBoard};
};

function GameController(playerSymbol){
  const btnContainer = document.querySelector(`.btn-container`);
  const result = document.querySelector(`.result`);
  const resultText = document.querySelector(`.result-text`);
  const playAgainBtn = document.querySelector(`.play-again-btn`);

  let winner = false;
  let round = 0;
  const gameBoard = GameBoard();
  gameBoard.createBoard();
  const test = playerSymbol;
  const players = [
    {
      Name : `User`,
      symbol : test
    },
    {
      Name : `Computer`,
      symbol : test == `X` ? `O` : `X`
    }
  ];

  let activePlayer = players[0];

  const switchPlayer= () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const computerValue = () => {
    const computerIndex = Math.floor(Math.random() * 9);
    return computerIndex;
  };

  const changeValue = (index, symbol) => {
    if(gameBoard.getBoard[index] === ``){
      gameBoard.getBoard[index] = symbol;
      switchPlayer();
      round ++;
    }
    else{
      playRound();
    }
  };

  const getWinner = () => {
    const winningPattern = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];

    let firstVal, secondVal, thirdVal;
    let draw = false;

    winningPattern.forEach((pattern) => {
      firstVal = pattern[0];
      secondVal = pattern[1];
      thirdVal = pattern[2];

      if(gameBoard.getBoard[firstVal] !== `` && gameBoard.getBoard[secondVal] !== `` && gameBoard.getBoard[thirdVal] !== `` ){
        if(gameBoard.getBoard[firstVal] === gameBoard.getBoard[secondVal] && gameBoard.getBoard[secondVal] === gameBoard.getBoard[thirdVal]){
          winner = true;
          activePlayer === players[1] ? resultText.textContent = `You Won!!!` : resultText.textContent = `Computer Won!!!`;
        }
      }
      }
    );

    if(winner){playAgain()};
  };

  const playAgain = () => {
    result.style.visibility = `visible`;
    playAgainBtn.addEventListener(`click`, () => {
      round = 0;
      winner = false;
      activePlayer = players[0];
      gameBoard.createBoard();
      render();
      result.style.visibility = `hidden`;
    });
  }

  
  const playRound = (click) => {
    if(!winner){
      if(round < 9){
        if(activePlayer === players[0]){
          changeValue(click, activePlayer.symbol);
          render();
          getWinner();
          playRound();
        }
        else{
          changeValue(computerValue(), activePlayer.symbol);
          render();
          getWinner();
        }
      }
      else{
        resultText.textContent = `Its a Tie`;
        playAgain();
        return;
      }
    }
    else{
      return;
    }
  };
  
  function render () {
    btnContainer.innerHTML = ``;
    gameBoard.getBoard.forEach((cell, index) => {
      const button = document.createElement(`button`);
      btnContainer.appendChild(button);
      button.classList.add(`btn`)
      button.textContent = cell;
      if(!winner){
        if(round < 9){
          button.addEventListener(`click`, ()=>{
            playRound(index);
          });
        }
      }
    });
  };

  render();
};

function GameStart(){
  const main = document.querySelector(`.main`);
  const start = document.querySelector(`.start`);
  const playBtn = document.querySelector(`.play-btn`);
  const modal = document.querySelector(`.modal`);
  const symbolBtn = document.querySelectorAll(`.symbol-btn`);
  const header = document.querySelector(`.header`);
  let symbol;

  main.style.display = `none`;

  playBtn.addEventListener(`click`, () => {
    modal.showModal();
  });

  symbolBtn.forEach((button) => {
    button.addEventListener(`click`, () => {
      symbol = button.value;
      modal.close();
      start.style.display = `none`;
      main.style.display = `grid`;
      header.textContent = `TIC TAC TOE`;
      GameController(symbol);
    });
  })

  

};

GameStart();