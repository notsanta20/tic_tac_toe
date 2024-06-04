function GameBoard(){
  const size = 9;
  const board = [];

  for(let i = 0; i < size; i++){
    board.push(0);
  };

  const getBoard = board;

  const printBoard = () => console.log(board);

  const changeValue = (index, symbol) => {
    if(board[index] === 0){
      board[index] = symbol;
    }
    else{
      console.log(`Slot is already Take`);
      
    }
  };

  return { printBoard, changeValue, getBoard};
};

function GameController(player1 = `User`, player2 = `Computer`, symbol = `X`){
  let winner = false;
  const gameBoard = GameBoard();

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
    console.log(`${activePlayer.Name}'s Turn`);
  };

  const playerValue = () => {
    let playerIndex = prompt(`Enter cell Value between 1 - 9`);
    playerIndex = Number(playerIndex)
    return playerIndex - 1;
  };

  const computerValue = () => {
    const computerIndex = Math.floor(Math.random() * 9);
    return computerIndex;
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

      if(gameBoard.getBoard[firstVal] !== 0 && gameBoard.getBoard[secondVal] !== 0 && gameBoard.getBoard[thirdVal] !== 0 ){
        if(gameBoard.getBoard[firstVal] === gameBoard.getBoard[secondVal] && gameBoard.getBoard[secondVal] === gameBoard.getBoard[thirdVal]){
          winner = true;
        }
      }
      }
    );

    if(winner){
      activePlayer === players[0] ? console.log(`You Won!!!`) : console.log(`Computer Won!!!`);
    }
  };

  const playRound = () => {
    if(!winner){
      if(activePlayer === players[0]){
        gameBoard.changeValue(playerValue(), activePlayer.symbol);
        gameBoard.printBoard();
        getWinner();
      }
      else{
        gameBoard.changeValue(computerValue(), activePlayer.symbol);
        gameBoard.printBoard();
        getWinner();
      }
      switchPlayer();
      playRound();
    }
    else{
      return;
    }
  };

  playRound();
};

