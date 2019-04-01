class Player {
  constructor(){
    this.radius = 50
    this.y = 540;
    this.x = 500;
    console.log(this.x, this.y);
  
    this.mickeyImg = new Image();
    this.mickeyImg.src = './images/ezgif.com-rotate.gif'
}

draw(ctx){
  ctx.save()
  // ctx.beginPath()
  // ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
  // ctx.fill()
  ctx.drawImage(this.mickeyImg, this.x-this.radius*2.5/2, this.y-this.radius*2.5/2, this.radius*2.5,this.radius*2.5)
  ctx.restore()

}

update(){
}


}