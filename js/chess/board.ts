/* eslint-disable no-undef, no-unused-vars */
/*
 * Représente un plateau d'échecs
 */
import P5 from "p5";

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
    WHITE = "rgb(220, 220, 220)",
    BLACK = "rgb(50, 50, 50)"
}

export class Piece {
    color: string;
    type: string;
    x: number;
    y: number;
    p5: P5;

    constructor(_p5, _x, _y, _color, _type) {
        this.x = _x;
        this.y = _y;
        this.p5 = _p5;
        this.color = _color;
        this.type = _type;
    }

    draw(model) {
        this.p5.fill(this.color);

        this.p5.push();
        this.p5.scale(.8);
        this.p5.translate(this.x * 100, this.y * 100)
        this.p5.model(model);
        this.p5.pop();
    }
}

export class Board {
    boardFen: string;
    playerToPlay: string;
    board: Piece[];
    possibleRocks: string[];
    p5: P5;
    pawnModel: P5.Geometry;

    constructor(_p5: P5, pawnModel) {
        this.p5 = _p5;
        this.pawnModel = pawnModel;
        this.boardFen = initalFenString;
    }

    draw() {
        this.board = this.boardFromFen();
        this.p5.noStroke();
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i]) this.board[i].draw(this.pawnModel);
        }
    }

    boardFromFen(): Piece[] {
        let board: Piece[] = [];
        let splitedFen = this.boardFen.split(" ")[0].split("/");
        for (let i = 0; i < splitedFen.length; i++) {
            for (let j = 0; j < splitedFen[i].length; j++) {
                let char = splitedFen[i][j];
                let color = char.toUpperCase() === char
                    ? PieceColorEnum.WHITE
                    : PieceColorEnum.BLACK;
                if (Board.isNumeric(char)) {
                    for (let j = 0; j < parseInt(char); j++) board.push(null);
                } else board.push(new Piece(this.p5, j, i, color, char.toLowerCase()));
            }
        }
        return board;
    }

    static isNumeric(s: any) {
        return !isNaN(s - parseFloat(s));
    }
}
