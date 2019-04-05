class EasterEgg {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.radius = 30
    this.width = 10
    this.height = 100
  }

  draw(ctx) {
    ctx.save()
    ctx.save()
    // ctx.globalAlpha = 0.7
    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
    // ctx.rect(this.x, this.y, this.width,this.height)
    // ctx.fill()
    ctx.restore()

    ctx.restore()
  }
}