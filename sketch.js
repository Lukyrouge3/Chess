/* eslint-disable no-undef, no-unused-vars */
const board = require("./js/chess/board");

let sketch = (p) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    let board = new board.Board();
  };
  p.draw = () => {
    board.draw(p);
    p.windowResized = function () {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
};

new p5(sketch);
