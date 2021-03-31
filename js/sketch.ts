/* eslint-disable no-undef, no-unused-vars */
import {Board} from "./chess/board";

import P5 from "p5";

let sketch = (p) => {
    let board: Board;
    let pawn;

    let c = "rgb(255,255,255)"

    p.preload = () => {
        p.loadModel("img/pawn.obj", true, model => {
            pawn = model;
            console.log(model)
        }, error => console.log("Il y a eu une erreur" + error));
        // console.log(pawn);
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        board = new Board(p, pawn);
        p.frameRate = 2;
        p.background(175);

        // console.log(board.boardFromFen());
    };
    p.draw = () => {
        p.translate(-p.width / 2 + 200, -p.height / 2 + 50);
        board.draw();
        // p.fill(c);
        // p.model(pawn);
        p.windowResized = function () {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    };

    p.mouseClicked = () => {
        console.log(p.mouseX, p.mouseY)
        let b = board.boardFromFen();
        let d = 9999, di = 0;
        for (let i = 0; i < b.length; i++) {
            if (b[i]) {
                let min = Math.min(p.dist(p.mouseX, p.mouseY, b[i].x * 100, b[i].y * 100), d)
                if (min < d) {
                    di = i;
                    d = min;
                }
            }
        }
        b[di].color = "rgb(255, 0, 0)";
        // b[di].x = 400;
        console.log(b[di]);
        // c = "rgb(255,0,0)";
    }
};

new P5(sketch);
