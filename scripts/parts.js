
var svgns = "http://www.w3.org/2000/svg";

const enumValue = (name) => Object.freeze({toString: () => name});
const PieceType = Object.freeze({
    KING:   enumValue("k"),
    QUEEN:  enumValue("q"),
    ROOK: enumValue("r"),
    BISHOP: enumValue("b"),
    KNIGHT: enumValue("n"),
    PAWN: enumValue("p"), 
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
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color;
    this.size = 70;
  }

  draw(board) {
    let c = this.color.toString(), t = this.type.toString()
    let piece = document.createElementNS(svgns, "image");
    piece.setAttributeNS(null, "href", `img/${c}${t}.png`);
    piece.setAttributeNS(null, "x", this.x);
    piece.setAttributeNS(null, "y", this.y);
    piece.setAttributeNS(null, "width", this.size);
    piece.setAttributeNS(null, "height", this.size);
    board.appendChild(piece);
  }
}

class TextElement {
  constructor(x, y, text, color) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
  }
  draw(board) {
    var textEle = document.createElementNS(svgns, "text");
    textEle.setAttributeNS(null, "x", this.x);     
    textEle.setAttributeNS(null, "y",this.y); 
    textEle.setAttributeNS(null, "font-size","16");
    textEle.setAttributeNS(null, "fill", this.color)
    textEle.textContent = this.text;
    board.appendChild(textEle);
  }
}