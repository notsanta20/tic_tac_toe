function GameBoard(){
  const size = 9;
  const board = [];

  const createBoard = () => {
    for(let i = 0; i < size; i++){
      board.push(``);
    };
  };

  const getBoard = board;

  const printBoard = () => console.log(board);

  return { createBoard, printBoard, getBoard};
};

function GameController(player1 = `User`, player2 = `Computer`, symbol = `X`){
  let winner = false;
  let round = 0;
  const gameBoard = GameBoard();
  gameBoard.createBoard();

  const players = [
    {
      Name : player1,
      symbol : symbol
    },
    {
      Name : player2,
      symbol : symbol === `X` ? `O` : `X`
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
          activePlayer === players[1] ? console.log(`You Won!!!`) : console.log(`Computer Won!!!`);
        }
      }
      }
    );
  };

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
        console.log(`Its a Tie`);
        return;
      }
    }
    else{
      return;
    }
  };
  
  const btnContainer = document.querySelector(`.btn-container`);


  function render () {
    btnContainer.innerHTML = ``;
    gameBoard.getBoard.forEach((cell, index) => {
      const button = document.createElement(`button`);
      btnContainer.appendChild(button);
      button.classList.add(`btn`)
      button.textContent = cell;
      button.addEventListener(`click`, ()=>{
        playRound(index);
      })
    });
  };

  render();
};

GameController();
