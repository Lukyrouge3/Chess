/* eslint-disable no-undef, no-unused-vars */
/*
 * Représente un plateau d'échecs
 */
const initalFenString =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export enum PiecesEnum {
  PAWN = "p",
  ROOK = "r",
  KNIGHT = "n",
  BISHOP = "b",
  QUEEN = "q",
  KING = "k"
}

export enum PieceColorEnum {
  WHITE = 0,
  BLACK = 1
}

export class Piece {
  color: number;
  type: string;

  constructor(_color, _type) {
    this.color = _color;
    this.type = _type;
  }

  draw(p, x: number, y: number) {
    p.color(this.color);
    p.ellipse(x, y, 10, 10);
  }
}

export class Board {
  boardFen: string;
  playerToPlay: string;
  board: Piece[];
  possibleRocks: string[];

  constructor() {
    this.boardFen = initalFenString;
  }

  draw(p) {
    this.board = Board.boardFromFen(this.boardFen);
    for (let i = 0; i < this.board.length; i++) {
      let y = Math.floor(i / 8);
      let x = i - y;
      this.board[i].draw(p, x, y);
    }
  }

  static boardFromFen(fen: string): Piece[] {
    let board: Piece[] = [];
    let splitedFen = fen.split(" ");
    for (let i = 0; i < splitedFen[0].length; i++) {
      let char = splitedFen[0][i];
      let color =
        char.toUpperCase() === char
          ? PieceColorEnum.WHITE
          : PieceColorEnum.BLACK;
      if (isNaN(parseInt(char))) {
        for (let j = 0; j < parseInt(char); j++) board.push(null);
        board.push(new Piece(color, char.toLowerCase()));
      }
    }
    return null;
  }
}
