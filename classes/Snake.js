import Segment from './Segment.js';

export default class Snake {
  constructor(context, boardWidth, boardHeight) {
    this.context = context;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;

    this.direction = 'right';
    this.speed = 1;
    this.movement = {
      left: {
        x: -this.speed,
        y: 0,
      },
      right: {
        x: this.speed,
        y: 0,
      },
      up: {
        x: 0,
        y: this.speed,
      },
      down: {
        y: -this.speed,
        x: 0,
      },
    };

    this.segments = [];
    for (let index = 0; index <= 20; index++) {
      this.segments.push(
        new Segment(this.boardWidth * 0.5, this.boardHeight * 0.5)
      );
    }
  }

  growth() {
    for (let index = 0; index <= 10; index++) {
      this.segments.push(
        new Segment(
          this.segments[this.segments.length - 1].x,
          this.segments[this.segments.length - 1].y
        )
      );
    }
  }

  setDirection(dir) {
    this.direction = dir;
  }

  update() {
    let dx = this.movement[this.direction].x;
    let dy = this.movement[this.direction].y;

    const snakeHead = this.segments[0];
    let prevPosX = snakeHead.x;
    let prevPosY = snakeHead.y;
    snakeHead.updatePosition(prevPosX + dx, prevPosY + dy);

    for (let i = 1; i < this.segments.length; i++) {
      const segment = this.segments[i];
      let tempX = segment.x;
      let tempY = segment.y;

      segment.updatePosition(
        prevPosX + (segment.x - prevPosX) * 0.5,
        prevPosY + (segment.y - prevPosY) * 0.5
      );

      prevPosX = tempX;
      prevPosY = tempY;
    }
  }

  draw() {
    for (let i = this.segments.length - 1; i > 0; i--) {
      const segment = this.segments[i];

      this.context.beginPath();
      this.context.fillStyle = i === 1 ? 'red' : segment.color;
      this.context.arc(segment.x, segment.y, segment.size, 0, Math.PI * 2);
      this.context.fill();
    }

    const snakeHead = this.segments[0];
    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.rect(
      snakeHead.x - snakeHead.size,
      snakeHead.y - snakeHead.size,
      snakeHead.size * 2,
      snakeHead.size * 2
    );
    this.context.fill();
  }
}
