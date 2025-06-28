
function isValidMove(board, from, to, turn) {
  if(to.row > 7 || to.row < 0 || to.col > 7 || to.col < 0 || !board.square(to.row, to.col)) return false;
  const pieceToMove = board.square(from.row, from.col).piece;
  const destPiece = board.square(to.row, to.col).piece;
  if (pieceToMove.color !== turn) return false;
 
  let validMove = false;
  if (pieceToMove.type == PieceType.PAWN) {
    validMove = isValidPawnMove(board, from, to);
  } else if(pieceToMove.type == PieceType.BISHOP){
     validMove = isClearDiagonal(board, from, to);
  } else if (pieceToMove.type == PieceType.ROOK){
    validMove = isClearStraight(board, from, to);
  } else if (pieceToMove.type == PieceType.QUEEN) {
    validMove = isClearDiagonal(board, from, to) || isClearStraight(board, from, to)
  } else if (pieceToMove.type == PieceType.KNIGHT) {
    validMove = isValidKnightMove(from, to)
  } else if (pieceToMove.type == PieceType.KING) {
    validMove = isValidKingMove(from, to)
  }

  // check not capturing own piece
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
    const step = from.row < to.row ? 1 : -1;
    for (let r = Math.max(from.row + step, 0); r !== to.row; r+= step) {
      if (board.square(r, from.col).piece) return false;
    }
    return true;
  }
  if (from.row === to.row) {
    const step = from.col < to.col ? 1 : -1;
    for (let c = Math.max(from.col + step); c !== to.col; c+= step) {
      if (board.square(from.row, c).piece) return false;
    }
    return true;
  }
  return false
}
function isValidKnightMove(from, to) {
  const absColDiff = Math.abs((to.col - from.col));
  const absRowDiff = Math.abs((to.row - from.row));
  return (absColDiff === 2 && absRowDiff === 1) || (absColDiff === 1 && absRowDiff === 2);
}
function isValidKingMove(from, to) {
  const absColDiff = Math.abs((to.col - from.col));
  const absRowDiff = Math.abs((to.row - from.row));
  return (absColDiff <= 1 && absRowDiff <= 1)
}
