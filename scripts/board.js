
class Square {
  constructor(x, y, color, size = 70) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.object = null;
  }
  draw(board) {
    var cell = document.createElementNS(svgns, 'rect');
    cell.setAttribute("width", this.size)   
    cell.setAttribute("height", this.size)
    cell.setAttribute("x", this.x)
    cell.setAttribute("y", this.y)  
    cell.setAttribute("style", "fill:"+ this.color)
    board.appendChild(cell)
  }
  setColor(color) {
    this.color = color;
  }
  addObject(object) {
    this.object = object;
  }
}

class Board {
  constructor(container) {
    this.size = 70;
    this.container = document.getElementById(container);
    this.ranks = Array(8);
    for (let r = 0; r < 8; r++) {
      this.ranks[r] = Array(8);
    }
  }
  draw() {
    this.#drawGrid();
    this.#drawFileNumbers();
    this.#drawRankLetters();
    this.#initBoardSetting()
    // this.container.addEventListener('onload', (evt) => makeDraggable(evt))
  }

  #drawGrid(){
    let count = 0;
    for (let row = 0; row < this.ranks.length; row++) {
      for (let cols = 0; cols < this.ranks[row].length; cols++) {
        let square = new Square((this.size)*cols, (this.size)*row, "#5d9948")
        if(cols == 0)
          count++
        if(count % 2 == 0)
          square.setColor("#5d9948")
        else 
          square.setColor("#eee")
        count++
        square.draw(this.container)
        this.ranks[row][cols] = square;
      }
    }
  }

  #drawFileNumbers() {
    let count = 0
    for (let row = 0; row < 8; row++) {
      if(count % 2 == 0){
        this.color = "#5d9948"
        
      } else {
        this.color = "#eee"
      }
      count++
      let te = new TextElement(5, row*this.size+15, 8-row, this.color);
      te.draw(this.container)
    }
  }

  #drawRankLetters() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    let count = 0
    for (let col = 0; col < 8; col++) {
      if(count % 2 == 0) {
          this.color = "#eee"
      } else {
          this.color = "#5d9948"
      }
        count++
      let te = new TextElement(this.size*col+this.size-10, this.size*8-5, letters[col], this.color);
      te.draw(this.container)
    }
  }
  #initBoardSetting() {
    const backrank = [
      PieceType.ROOK,
      PieceType.KNIGHT,
      PieceType.BISHOP,
      PieceType.QUEEN,
      PieceType.KING,
      PieceType.BISHOP,
      PieceType.KNIGHT,
      PieceType.ROOK,
    ]
    for (let file = 0; file < this.ranks.length; file++) {
      this.addPiece(PieceType.PAWN, PieceColor.WHITE, 6, file);
    }
    for (let file = 0; file < this.ranks.length; file++) {
      this.addPiece(PieceType.PAWN, PieceColor.BLACK, 1, file);
    }
    for (let file = 0; file < this.ranks.length; file++) {
      this.addPiece(backrank[file], PieceColor.WHITE, 7, file)
    }
    for (let file = 0; file < this.ranks.length; file++) {
      this.addPiece(backrank[file], PieceColor.BLACK, 0, file) 
    }

  }
  addPiece(type, color, rank, file) {
    let square = this.ranks[rank][file];
    let piece = new Piece(square.x, square.y, type, color)
    piece.draw(this.container)
  }
}
var selectedElement, offset
var boundaryX1 = 0;
var boundaryX2 = 900;
var boundaryY1 = 0;
var boundaryY2 = 900;

function makeDraggable(evt) {
    var svg = evt.target;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
    
    function startDrag(evt) {
      if (evt.target.classList.contains('dragging')) {
        selectedElement = evt.target;
        offset = getMousePosition(evt);
        offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
        offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
      }
    }
    function drag(evt) {
      if (selectedElement) {
        var coord = getMousePosition(evt)
        selectedElement.setAttributeNS(null, "x", coord.x - offset.x);
        selectedElement.setAttributeNS(null, "y", coord.y - offset.y);
      }
    }
    function endDrag(evt) {
      selectedElement = null;
    }
    function getMousePosition(evt) {
        var CTM = svg.getScreenCTM();
        return {
          x: (evt.clientX - CTM.e) / CTM.a,
          y: (evt.clientY - CTM.f) / CTM.d
        };
      }
  }


const board = new Board("board");
board.draw();

/*
Tasks
- Add All types of pieces on board both back and white
- Improve font size and color (adjust according to background color)
- Read svg animatation tutorial here : https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
*/