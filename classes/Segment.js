export default class Segment {
  constructor(x, y, color) {
    this.size = 10;
    this.x = x;
    this.y = y;
    this.color = color || 'royalblue';
  }

  updatePosition(newPosX, newPosY) {
    this.x = newPosX;
    this.y = newPosY;
  }
}
