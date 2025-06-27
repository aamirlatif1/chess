class CellPosition {}
function gameMovies(evt) {
  let svg = evt.target;
  const board = new Board("board");
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
  let from;

  function getMousePosition(evt) {
    let CTM = svg.getScreenCTM();
    if (evt.touches) { evt = evt.touches[0]; }
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  function startDrag(evt) {
    if (evt.target.classList.contains('dragging')) {
      from = findSquare(evt);

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
        selectedElement.setAttributeNS(null, "x", coord.x - offset.x);
        selectedElement.setAttributeNS(null, "y", coord.y - offset.y);
    }
  }

  function endDrag(evt) {
    if(selectedElement) {
      let to = findSquare(evt);
      if(to.piece !== null) {
        to = from;
      } else {
        to.piece = selectedElement;
        from.piece = null;
      }
      selectedElement.setAttributeNS(null, "x", to.x);
      selectedElement.setAttributeNS(null, "y", to.y);
    }
    selectedElement = false;
  }

  function findSquare(evt) {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    const col = Math.floor(svgP.x / 70);
    const row = Math.floor(svgP.y / 70);
    let s = board.square(row, col);
    return s;
  }
}

