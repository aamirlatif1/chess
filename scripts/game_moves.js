class Position {
  constructor(x, y){
    this.row = x;
    this.col = y;
  }
}
function gameMoves(evt) {
  const svg = evt.target;
  const board = new Board(svg);
  const maxX = 490, maxY = 490, minX = 0, minY = 0;
  let turn = PieceColor.WHITE;
  
  board.draw();

  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);

  let selectedElement, offset;
  let fromPos;

  function getMousePosition(evt) {
    const CTM = svg.getScreenCTM();
    if (evt.touches) { evt = evt.touches[0]; }
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  function startDrag(evt) {
    if (evt.target.classList.contains('dragging')) {
      fromPos = findSquarePos(evt);

      selectedElement = evt.target;
      offset = getMousePosition(evt);
      offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
      offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
    }
  }

  function drag(evt) {
    if (selectedElement) {
       evt.preventDefault();
        let coord = getMousePosition(evt);
        let dx = coord.x - offset.x;
        let dy = coord.y - offset.y
        if (dx > maxX) dx = maxX
        if (dx < minX) dx = minX
        if (dy > maxY) dy = maxY
        if (dy < minY) dy = minY
        selectedElement.setAttributeNS(null, "x", dx);
        selectedElement.setAttributeNS(null, "y", dy);
    }
  }

  function endDrag(evt) {
    if(selectedElement) {
      const toPos = findSquarePos(evt);
      let destSquare;

      if(!isValidMove(board, fromPos, toPos, turn)) {
        destSquare = board.square(fromPos.row, fromPos.col);
      } else {
        let toSquare = board.square(toPos.row, toPos.col);
        let fromSquare = board.square(fromPos.row, fromPos.col);
        if(toSquare.piece){
          toSquare.piece.element.remove();
        }
        toSquare.piece = fromSquare.piece;
        fromSquare.piece = null;
        destSquare = toSquare
        turn = turn == PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
      }
      selectedElement.setAttributeNS(null, "x", destSquare.x);
      selectedElement.setAttributeNS(null, "y", destSquare.y);
    }
    selectedElement = false;
  }

  function findSquarePos(evt) {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    return new Position( Math.floor(svgP.y / 70), Math.floor(svgP.x / 70));
  }
}


// basic move validation.