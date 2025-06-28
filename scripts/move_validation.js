
function isValidMove(board, from, to) {
  console.log(from, to);
  const pieceToMove = board.square(from.row, from.col).piece;
  const destPiece = board.square(to.row, to.col).piece;
 
  let validMove = false;
  if (pieceToMove.type == PieceType.PAWN) {
    validMove = isValidPawnMove(board, from, to);
  } else if(pieceToMove.type == PieceType.BISHOP){
     validMove = isClearDiagonal(board, from, to);
  } else if (pieceToMove.type == PieceType.ROOK){
    validMove = isClearStraight(board, from, to);
  }
  if(validMove && (!destPiece || destPiece.color !== pieceToMove.color)){
    return true;
  }
  return false;
}

function isValidPawnMove(board, from, to) {
  const pieceToMove = board.square(from.row, from.col).piece;
  const destPiece = board.square(to.row, to.col).piece;
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
  return false;
}

function isClearDiagonal(board, from, to){
  const rowDiff = to.row - from.row;
  const colDiff = to.col - from.col;
  // when not diagonal
  if (Math.abs(colDiff) !== Math.abs(rowDiff)) return false;

  const stepX = colDiff > 0 ? 1 : -1;
  const stepY = rowDiff > 0 ? 1 : -1;

  let r = from.row + stepY
  let c = from.col + stepX

  while (c !== to.col && r !== to.row) {
    if (board.square(r, c).piece) return false;
    c += stepX
    r += stepY
  }
  return true;
}

function isClearStraight(board, from, to) {
  if (from.col === to.col){
    const step = from.col < to.col ? 1 : -1;
    for (let r = from.row + step; r !== to.row; r+= step) {
      if (board.square(from.row, col).piece) return false;
    }
    return true;
  }
  if (from.row === to.row) {
    const step = from.col < to.col ? 1 : -1;
    for (let c = from.col + step; c !== to.col; c+= step) {
      if (board.square(from.row, col).piece) return false;
    }
    return true;
  }
  return false
}
