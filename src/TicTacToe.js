import React, { useStatem, useEffect, useState } from 'react';
import './style.css';

function TicTacToe() {
  const empytBoard = Array(9).fill("");
  const [board, setBoard] = useState(empytBoard);

  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (winner) {
      alert('o jogo ja acabou')
      return null
    }

    if (board[index] !== "") {
      alert(`A Casa atual possui Marcação ${board[index]}`)
      return null
    }

    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item ));
  
    setCurrentPlayer(currentPlayer === "X" ? 'O' : "X");
  }

  

  const checkWinner = () => {
    const possibleWaysToWin = [
     [board[0], board[1], board[2]], 
     [board[3], board[4], board[5]], 
     [board[6], board[7], board[8]],

     [board[0], board[3], board[6]], 
     [board[1], board[4], board[7]], 
     [board[2], board[5], board[8]], 

     [board[0], board[4], board[8]], 
     [board[2], board[4], board[6]]
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "X")) setWinner("X");
      if (cells.every(cell => cell === "O")) setWinner("O");
      
    });

    checkDraw();
  }

  const checkDraw = () => {
    if (board.every(item => item !== '')) setWinner('E');
  }

  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(empytBoard);
    setWinner(null)
  };

  useEffect(checkWinner, [board]);

  return (
    <main>
      <h1 className='title'>JOGO DA VELHA</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (

          <div key={index} 
          className={`cell ${item}`} 
          onClick={ () => handleCellClick(index)}>
          {item}</div>

          ))}

      </div>

      {winner && 
      <footer>
        {winner === 'E' ?
          <h2 className='winner-message'>
          <span className={winner}>OCORREU UM EMPATE !!!</span></h2>
        :
          <h2 className='winner-message'>
          <span className={winner}>
          {winner}</span> VENCEU !!!</h2>
        }
      
      
      <button onClick={resetGame}> RECOMEÇAR O JOGO</button>
      </footer>}
      
      
    </main>
  );
}

export default TicTacToe;
