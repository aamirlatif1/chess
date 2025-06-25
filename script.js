var svgns = "http://www.w3.org/2000/svg";

const enumValue = (name) => Object.freeze({toString: () => name});
const PieceType = Object.freeze({
    KING:   enumValue("king"),
    QUEEN:  enumValue("queen"),
    ROOK: enumValue("rook"),
    BISHOP: enumValue("bishop"),
    KNIGHT: enumValue("knight"),
    PAWN: enumValue("pawn"), 
});

const PieceColor = Object.freeze({
    BLACK:   enumValue("b"),
    WHITE:  enumValue("w"),
});

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

class Piece {
  constructor(x, y, type, color) {
    this.element = null;
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color;
    this.size = 70;
  }

  draw(board) {
    let piece = document.createElementNS(svgns, "image");
    piece.setAttributeNS(null, "href", "img/"+this.color.toString()+"_"+this.type.toString()+".png");
    piece.setAttributeNS(null, "x", this.x);
    piece.setAttributeNS(null, "y", this.y);
    piece.setAttributeNS(null, "width", this.size);
    piece.setAttributeNS(null, "height", this.size);
    piece.setAttributeNS(null, "class", "piece");
    piece.addEventListener("mousedown", (e) => {
      e.target.setAttributeNS(null, "class", "piece draggable draging");
    })
     piece.addEventListener("mouseup", (e) => {
       e.target.setAttributeNS(null, "class", "piece draggable");
    })
    this.element = piece;
    board.appendChild(piece);
  }
}

class TextElement {
  constructor(x, y, text, color,) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
  }
  draw(board) {
    var textEle = document.createElementNS(svgns, "text");
    textEle.setAttributeNS(null, "x", this.x);     
    textEle.setAttributeNS(null, "y",this.y); 
    textEle.setAttributeNS(null, "font-size","10");
    textEle.textContent = this.text;
    board.appendChild(textEle);
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
    for (let row = 0; row < 8; row++) {
      let te = new TextElement(5, row*this.size+15, 8-row, "black");
      te.draw(this.container)
    }
  }

  #drawRankLetters() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    for (let col = 0; col < 8; col++) {
      let te = new TextElement(this.size*col+this.size-10, this.size*8-5, letters[col], "black");
      te.draw(this.container)
    }
  }
  #initBoardSetting() {
    for (let row = 0; row < this.ranks.length; row++) {
      this.addPiece(PieceType.PAWN, PieceColor.WHITE, 6, row);
    }
     for (let row = 0; row < this.ranks.length; row++) {
      this.addPiece(PieceType.PAWN, PieceColor.BLACK, 1, row);
    }
  }
  addPiece(type, color, rank, file) {
    let square = this.ranks[rank][file];
    let piece = new Piece(square.x, square.y, type, color)
    piece.draw(this.container)
  }
}

const board = new Board("board");
board.draw();


let selectedElement = null;
let offset = 0;
function makeDraggable(evt) {
  let svg = evt.target;
  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);

  function getMousePosition(evt) {
    let CTM = svg.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  function startDrag(evt) {
    if (evt.target.classList.contains('draggable')) {
      selectedElement = evt.target;
      offset = getMousePosition(evt);
      offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
      offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
    }
  }
  function drag(evt) {
   if (selectedElement) {
      evt.preventDefault();
      var coord = getMousePosition(evt);
      selectedElement.setAttributeNS(null, "x", coord.x - offset.x);
      selectedElement.setAttributeNS(null, "y", coord.y - offset.y);
    }
  }
  function endDrag(evt) {
    selectedElement = null;
  }
}


/*
Tasks
- Add All types of pieces on board both back and white
- Improve font size and color (adjust according to background color)
- Read svg animatation tutorial here : https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
*/