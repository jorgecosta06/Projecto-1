class Key {

  constructor(x, y) {
    this.radius= 25
    this.x = x;
    this.y = y;
    this.keyImg = new Image();
    this.keyImg.src = './images/Key.png'
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
    ctx.drawImage(this.keyImg, this.x-this.radius*2.5/2, this.y-this.radius*2.5/2, this.radius*2.5,this.radius*2.5)
    // ctx.fill();
  }
}