import React, { useState } from 'react';
import circleIcon from '../assets/circle.png';
import crossIcon from '../assets/cross.png';
import '../App.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (newBoard) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a] === 'x' ? 'Player X Wins!' : 'Player O Wins!');
        return;
      }
    }

    if (!newBoard.includes(null)) {
      setWinner("It's a Draw!");
    }
  };

  const handleClick = (index) => {
    if (winner || board[index]) return;
    
    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'x' : 'o'; //if isXturn is true, set x else set o 
    setBoard(newBoard); //update the board with the new value 
    setIsXTurn(!isXTurn); //toggle the turn 
    checkWinner(newBoard); //check for winner after each move
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true); //reset the turn to x
    setWinner(null); //reset the winner
  };

  return (
    <div className='text-center '>
      <h1 className='text-white m-10 text-3xl font-bold '>
        Tic Tac Toe Game in <span className='text-green-300'>React</span>
      </h1>
      
      <h2 className='text-white text-xl mb-4'>
        {winner ? winner : `Turn: ${isXTurn ? 'Player X' : 'Player O'}`}
      </h2>

      <div className='grid grid-cols-3 gap-1 w-60 m-auto'>
        {board.map((value, index) => (
          <div key={index} 
               className='w-20 h-20 bg-gray-600 flex justify-center items-center cursor-pointer border border-gray-800'
               onClick={() => handleClick(index)}>
            {value && <img src={value === 'x' ? crossIcon : circleIcon} alt={value} />}
          </div>
        ))}
      </div>

      {winner && <div className='mt-5 text-2xl text-yellow-400 font-bold'>{winner}</div>}

      <button onClick={resetGame} className='mt-5 px-4 py-2 bg-gray-700 text-green-400 text-xl rounded'>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
