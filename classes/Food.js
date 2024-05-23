export default class Food {
  constructor(context, boardWidth, boardHeight) {
    this.context = context;
    this.size = 10;
    this.x = Math.floor(Math.random() * boardWidth + 50);
    this.y = Math.floor(Math.random() * boardHeight + 50);
    this.isEated = false;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = 'red';
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();
  }
}
