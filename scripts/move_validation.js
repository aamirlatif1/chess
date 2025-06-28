
function isValidMove(board, from, to) {
  console.log(from, to);
  const pieceToMove = board.square(from.row, from.col).piece;
  const destPiece = board.square(to.row, to.col).piece;
 
  if (pieceToMove.type == PieceType.PAWN) {
    const dir = pieceToMove.color == PieceColor.WHITE ? -1 : 1
    const startRow = pieceToMove.color == PieceColor.WHITE ? 6 : 1
    
    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;

    // forward move
    if (colDiff === 0) {
      if (rowDiff === dir && !destPiece) return true;
      const middlePiece = board.square(from.row + dir, to.col).piece;
      if (from.row === startRow && rowDiff === 2*dir && !destPiece && !middlePiece) return true;
    }
    // capture
    if (Math.abs(colDiff) === 1 && rowDiff === dir && destPiece && destPiece.color !== pieceToMove.color) {
      return true;
    }
   
  } else if(pieceToMove.type == PieceType.BISHOP){
      return true;
  }
  return false;
}
