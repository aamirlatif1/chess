const blackColor = "#5d9948";
const whiteColor = "#eee"
class Square {
  constructor(x, y, color, size = 70) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.piece = null;
  }
  draw(board) {
    var s = document.createElementNS(svgns, 'rect');
    s.setAttribute("width", this.size)   
    s.setAttribute("height", this.size)
    s.setAttribute("x", this.x)
    s.setAttribute("y", this.y)  
    s.setAttribute("style", "fill:"+ this.color)
    board.appendChild(s)
  }
  setColor(color) {
    this.color = color;
  }
  setPiece(piece) {
    this.piece = piece;
  }
}

class Board {
  constructor(svg) {
    this.height = 70*8;
    this.width = 7*80;
    this.size = 70;
    this.container = svg;
    this.container.setAttribute("height", this.height);
    this.container.setAttribute("width", this.width);
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

  square(x, y) {
    return this.ranks[x][y];
  }

  #drawGrid(){
    let count = 0;
    for (let x = 0; x < this.ranks.length; x++) {
      for (let y = 0; y < this.ranks[x].length; y++) {
        let square = new Square((this.size)*y, (this.size)*x, blackColor)
        if(y == 0)
          count++
        if(count % 2 == 0)
          square.setColor(blackColor)
        else 
          square.setColor(whiteColor)
        count++
        square.draw(this.container)
        this.ranks[x][y] = square;
      }
    }
  }

  #drawFileNumbers() {
    let count = 0
    for (let row = 0; row < 8; row++) {
      if(count % 2 == 0){
        this.color = blackColor
        
      } else {
        this.color = whiteColor
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
          this.color = whiteColor;
      } else {
          this.color = blackColor;
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
    // white pawn row
    for (let file = 0; file < this.ranks.length; file++) {
      this.addPiece(PieceType.PAWN, PieceColor.WHITE, 6, file);
    }
     // black pawn row
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
    this.ranks[rank][file].piece = piece;
    piece.draw(this.container)
  }
}
