
function isValidMove(board, from, to) {
  console.log(from, to);
  const pieceToMove = board.square(from.x, from.y).piece;
  const destPiece = board.square(to.x, to.y).piece;
  if(destPiece && destPiece.color == pieceToMove.color) {
    return false;
  } else {
    return true;
  }
}