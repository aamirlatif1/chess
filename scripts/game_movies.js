class Position {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}
function gameMovies(evt) {
  const svg = evt.target;
  const board = new Board(svg);
  const display = document.getElementById("coords");
  board.draw();

  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  svg.addEventListener('touchstart', startDrag);
  svg.addEventListener('touchmove', drag);
  svg.addEventListener('touchend', endDrag);
  svg.addEventListener('touchleave', endDrag);
  svg.addEventListener('touchcancel', endDrag);

  let selectedElement, offset;
  let fromSquare;

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
      fromSquare = findSquare(evt);

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
        display.innerHTML = `${dx}, ${dy}`;
        selectedElement.setAttributeNS(null, "x", dx);
        selectedElement.setAttributeNS(null, "y", dy);
    }
  }

  function endDrag(evt) {
    if(selectedElement) {
      const toSquare = findSquare(evt);
      let newPosition;

      if(!isValidMove(board, fromSquare, toSquare)) {
        newPosition = board.square(fromSquare.x, fromSquare.y);
      } else {
        let to = board.square(toSquare.x, toSquare.y);
        let from = board.square(fromSquare.x, fromSquare.y);
        to.piece = from.piece;
        from.piece = null;
        newPosition = to
      }
      selectedElement.setAttributeNS(null, "x", newPosition.x);
      selectedElement.setAttributeNS(null, "y", newPosition.y);
    }
    selectedElement = false;
  }

  function findSquare(evt) {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    return new Position( Math.floor(svgP.y / 70), Math.floor(svgP.x / 70));
  }
}

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
