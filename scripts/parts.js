
var svgns = "http://www.w3.org/2000/svg";

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



class Piece {
  constructor(x, y, type, color) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color;
    this.size = 70;
    this.id = `${color.toString()}${type.toString()}`;
  }

  draw(board) {
    let c = this.color.toString(), t = this.type.toString()
    let piece = document.createElementNS(svgns, "image");
    piece.setAttributeNS(null, "href", `img/${c}${t}.png`);
    piece.setAttributeNS(null, "x", this.x);
    piece.setAttributeNS(null, "y", this.y);
    piece.setAttributeNS(null, "width", this.size);
    piece.setAttributeNS(null, "height", this.size);
    piece.setAttributeNS(null, "class", "drag");
    piece.setAttributeNS(null, "id", `${c}${t}`);
    this.#addDragListeners(piece)
    board.appendChild(piece);
  }
  
  #addDragListeners(piece) {
     piece.addEventListener("mousedown", (evt) => {
      let p = evt.target;
      p.setAttributeNS(null, "class", "dragging");
    })
     piece.addEventListener("mouseup", (evt) => {
      let p = evt.target;
      p.setAttributeNS(null, "class", "drag");
    })
  }
}

