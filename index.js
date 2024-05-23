import Board from './classes/Board.js';

const board = new Board();

function main() {
  board.context.clearRect(0, 0, board.width, board.height);

  // board.play();

  requestAnimationFrame(main);
}

window.onload = () => main();
