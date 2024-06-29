export const createBoard = () => {
    const rows = 20;
    const cols = 10;
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  };
  
  // Define Tetris pieces and their rotations
  export const PIECES = {
    I: [
      [[1, 1, 1, 1]],
      [[1], [1], [1], [1]]
    ],
    J: [
      [[0, 1], [0, 1], [1, 1]],
      [[1, 0, 0], [1, 1, 1]],
      [[1, 1], [1, 0], [1, 0]],
      [[1, 1, 1], [0, 0, 1]]
    ],
    L: [
      [[1, 0], [1, 0], [1, 1]],
      [[1, 1, 1], [1, 0, 0]],
      [[1, 1], [0, 1], [0, 1]],
      [[0, 0, 1], [1, 1, 1]]
    ],
    O: [
      [[1, 1], [1, 1]]
    ],
    S: [
      [[0, 1, 1], [1, 1, 0]],
      [[1, 0], [1, 1], [0, 1]]
    ],
    T: [
      [[0, 1, 0], [1, 1, 1]],
      [[1, 0], [1, 1], [1, 0]],
      [[1, 1, 1], [0, 1, 0]],
      [[0, 1], [1, 1], [0, 1]]
    ],
    Z: [
      [[1, 1, 0], [0, 1, 1]],
      [[0, 1], [1, 1], [1, 0]]
    ]
  };
  
  
  // Check if the piece can be placed on the board
  export const isValidMove = (board, piece, x, y) => {
    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[row].length; col++) {
        if (piece[row][col] && (board[row + y] && board[row + y][col + x]) !== 0) {
          return false;
        }
      }
    }
    return true;
  };
  
  // Add a piece to the board
  export const placePiece = (board, piece, x, y) => {
    const newBoard = board.map(row => row.slice());
    piece.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          newBoard[rowIndex + y][colIndex + x] = cell;
        }
      });
    });
    return newBoard;
  };
  
  // Move the piece down
  export const movePieceDown = (board, piece, x, y) => {
    if (isValidMove(board, piece, x, y + 1)) {
      return { board, x, y: y + 1, collision: false };
    }
    return { board: placePiece(board, piece, x, y), x, y, collision: true };
  };
  
  
  // Move the piece left
  export const movePieceLeft = (board, piece, x, y) => {
    if (isValidMove(board, piece, x - 1, y)) {
      return { board, x: x - 1, y };
    }
    return { board, x, y };
  };
  
  // Move the piece right
  export const movePieceRight = (board, piece, x, y) => {
    if (isValidMove(board, piece, x + 1, y)) {
      return { board, x: x + 1, y };
    }
    return { board, x, y };
  };
  
  // Rotate the piece
  export const rotatePiece = (piece) => {
    const newPiece = piece[0].map((_, index) => piece.map(row => row[index])).reverse();
    return newPiece;
  };
  
  // Get a random piece
  export const getRandomPiece = () => {
    const pieceKeys = Object.keys(PIECES);
    const randomKey = pieceKeys[Math.floor(Math.random() * pieceKeys.length)];
    return PIECES[randomKey][0];
  };
  
  // Clear completed lines
  export const clearLines = (board) => {
    const newBoard = board.filter(row => row.some(cell => cell === 0));
    const clearedLines = Array(board.length - newBoard.length).fill(Array(board[0].length).fill(0));
    return clearedLines.concat(newBoard);
  };
  