import React, { useState, useEffect } from 'react';
import Board from './Board';
import { createBoard, movePieceDown, movePieceLeft, movePieceRight, rotatePiece, getRandomPiece, clearLines, isValidMove, placePiece } from '../utils/tetris';

const Tetris = () => {
  const [board, setBoard] = useState(createBoard());
  const [piece, setPiece] = useState(getRandomPiece());
  const [nextPiece, setNextPiece] = useState(getRandomPiece()); // Add state for the next piece
  const [x, setX] = useState(4);
  const [y, setY] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        const result = movePieceDown(board, piece, x, y);
        setY(result.y);
        if (result.collision) {
          const newBoard = clearLines(result.board);
          setBoard(newBoard);
          const newPiece = nextPiece; // Use next piece
          setPiece(newPiece);
          setNextPiece(getRandomPiece()); // Set new next piece
          setX(4);
          setY(0);
          if (!isValidMove(newBoard, newPiece, 4, 0)) {
            setGameOver(true);
          }
        } else {
          setBoard(result.board);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [board, piece, x, y, gameOver, nextPiece]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameOver) return;

      switch (event.keyCode) {
        case 37: // Left arrow
          setX((prevX) => movePieceLeft(board, piece, prevX, y).x);
          break;
        case 39: // Right arrow
          setX((prevX) => movePieceRight(board, piece, prevX, y).x);
          break;
        case 40: // Down arrow
          const result = movePieceDown(board, piece, x, y);
          setY(result.y);
          if (result.collision) {
            const newBoard = clearLines(result.board);
            setBoard(newBoard);
            const newPiece = nextPiece; // Use next piece
            setPiece(newPiece);
            setNextPiece(getRandomPiece()); // Set new next piece
            setX(4);
            setY(0);
            if (!isValidMove(newBoard, newPiece, 4, 0)) {
              setGameOver(true);
            }
          } else {
            setBoard(result.board);
          }
          break;
        case 38: // Up arrow
          setPiece((prevPiece) => rotatePiece(prevPiece));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board, piece, x, y, gameOver, nextPiece]);

  return (
    <div className="tetris-container">
      {gameOver ? <div>Game Over</div> : <Board board={placePiece(board, piece, x, y)} />}
      <div className="next-piece">
        <h3>Next Piece:</h3>
        <Board board={nextPiece} size={4} />
      </div>
    </div>
  );
};

export default Tetris;
