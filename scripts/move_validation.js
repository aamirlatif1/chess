
function isValidMove(board, from, to) {
  console.log(from, to);
  const pieceToMove = board.square(from.x, from.y).piece;
  const destPiece = board.square(to.x, to.y).piece;
  if (pieceToMove.type == PieceType.PAWN) {
    const dir = pieceToMove.color == PieceColor.WHITE ? -1 : 1
    const startRow = pieceToMove.color == PieceColor.WHITE ? 6 : 1
    
    const dr = to.x - from.x;
    const dc = to.y - from.y;

    if (dc === 0) {
      if (dr === dir && !destPiece) return true;
      const middlePiece = board.square(from.x + dir, to.y).piece;
      if (from.x === startRow && dr === 2*dir && !destPiece && !middlePiece) return true;
    }
   
  } else if(pieceToMove.type == PieceType.BISHOP){
      return true;
  }
  return false;
}
