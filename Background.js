class Background{

  constructor(){
    this.level = 0
    this.imgs = [new Image(), new Image(), new Image()]
    this.imgs[0].src = './images/livingromm2.jpg'
    this.imgs[1].src = './images/kitchen.jpeg'
    this.imgs[2].src = './images/room2.jpeg'
  }

  draw(ctx){
    if (level == 1) {
     ctx.drawImage(this.imgs[0], 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    } else if (level == 2) {
      ctx.drawImage(this.imgs[1], 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    } else {
      ctx.drawImage(this.imgs[2], 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
  }
}