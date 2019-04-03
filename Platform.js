class Platform {

  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 20;
  }

  draw(ctx) {
    ctx.save()
    ctx.beginPath();
    ctx.fillStyle = "#f9bc20bf";
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.restore()
  }

  top() {
    return this.y
  }
  left() {
    return this.x
  }
  right() {
    return this.x + this.width
  }


}