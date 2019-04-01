class Background{

  constructor(){
    this.level = 0
    this.imgs = [new Image(), new Image(), new Image()]
    this.imgs[0].src = './images/livingromm2.jpg'
  }

  draw(ctx){
    ctx.drawImage(this.imgs[0], 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
}