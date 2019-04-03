class Minnie {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.radius = 50
    this.speed = 6
    this.width = 120
    this.height = 120
    this.minnieScared = new Image();
    this.minnieScared.src = './images/MinnieScared.png'
    this.minnieHappy = new Image();
    this.minnieHappy.src = './images/Minnie.png'
    this.isScared = false
  }

  draw(ctx) {
    ctx.save()
    if (DEBUG) {
      ctx.save()
      // ctx.globalAlpha = 0.7
      ctx.fillStyle = "red"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
      // ctx.rect(this.x, this.y, this.width,this.height)
      // ctx.fill()
      ctx.restore()
    }
    if (!this.isScared)
      ctx.drawImage(this.minnieScared, this.x-this.radius, this.y, 2*this.radius, this.height)
    else {
      ctx.drawImage(this.minnieHappy, this.x-this.radius, this.y, 2*this.radius, this.height)

    }

    ctx.restore()
  }

  happy(){
    this.isScared = true
  }
}