import Food from './Food.js';
import Snake from './Snake.js';

export default class Board {
  constructor() {
    this.board = document.getElementById('board');
    this.context = this.board.getContext('2d');
    this.width = this.board.width = window.innerHeight * 0.75;
    this.height = this.board.height = window.innerHeight * 0.75;
    this.foods = [];

    this.snake = new Snake(this.context, this.width, this.height);
    this.summonFood();
  }

  play() {
    this.snake.draw();
    this.snake.update();
    this.checkCollision();

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.snake.setDirection('down');
          break;
        case 'ArrowLeft':
          this.snake.setDirection('left');
          break;
        case 'ArrowDown':
          this.snake.setDirection('up');
          break;
        case 'ArrowRight':
          this.snake.setDirection('right');
          break;

        default:
          break;
      }
    });
  }

  checkCollision() {
    const snakeHead = this.snake.segments[0];
    this.foods.forEach((food) => {
      if (
        snakeHead.x + snakeHead.size * 2 >= food.x &&
        snakeHead.x <= food.x + food.size &&
        snakeHead.y + snakeHead.size * 2 >= food.y &&
        snakeHead.y <= food.y + food.size
      ) {
        food.isEated = true;
        this.snake.growth();
      }
    });

    this.foods = this.foods.filter((food) => food.isEated === false);

    this.foods.forEach((food) => food.draw());
  }

  summonFood() {
    setInterval(() => {
      this.foods.push(new Food(this.context, this.width, this.height));
    }, 10000);
  }
}
