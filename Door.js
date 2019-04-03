class Door {

  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 140;
    this.doorImageClosed = new Image();
    this.doorImageClosed.src = './images/ClosedDoor2.png'
    this.doorImageOpened = new Image();
    this.doorImageOpened.src = './images/OpenDoor2.png'
    this.isOpened = false
  }

  draw(ctx) {
    ctx.beginPath();
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    if (!this.isOpened)
      ctx.drawImage(this.doorImageClosed,this.x,this.y,this.width,this.height)
    else {
      ctx.drawImage(this.doorImageOpened,this.x,this.y,this.width,this.height)
      // ctx.fillRect(this.x,this.y,this.width,this.height)
    }
    // ctx.fill();
  }

  open(){
    this.isOpened = true
  }

}