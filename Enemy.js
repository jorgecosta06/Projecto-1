class Enemy {
  
  constructor(){
      this.radius = 30
      this.y = this.radius+Math.floor((CANVAS_HEIGHT-2*this.radius)*Math.random())
      this.x = -10;
      this.vx = 2 // Velocity y
      console.log(this.x, this.y);
    
      this.ghostImg = new Image();
      this.ghostImg.src = './images/ghostright.png'
  }
  
  draw(ctx){
    ctx.save()
    if (DEBUG) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
      // ctx.fill()
      ctx.restore()
    }
    ctx.drawImage(this.ghostImg, this.x-this.radius*2.5/2, this.y-this.radius*2.5/2, this.radius*2.5,this.radius*2.5)
    ctx.restore()

}

update(){
  this.x += this.vx
}

}

