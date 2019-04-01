class Platform {
  
  constructor(x,y,width){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 20;
  
  
}

draw(ctx){
  ctx.beginPath();
  ctx.fillRect(this.x, this.y, this.width, this.height,)
  ctx.fillStyle = "#f9bc20bf";
  ctx.fill();
}


}