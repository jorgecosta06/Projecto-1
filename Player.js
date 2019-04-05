class Player {
  constructor() {
    this.radius = 50
    this.direction // Possible values: undefined, "right", "left"
    this.speed = 6
    this.width = 120
    this.height = 120
    this.x = 340
    this.y = CANVAS_HEIGHT - this.height - 100
    this.vx = 0
    this.vy = 0
    this.position = 'down'
    this.alreadyJumped = false
    this.life = 3

    this.playerImg = new Image();
    this.playerImg.src = './images/Mickey2.png'
    this.playerImgLeft = new Image();
    this.playerImgLeft.src = './images/MickeyLeft2.png'
    this.playerImgRight = new Image();
    this.playerImgRight.src = './images/MickeyRight2.gif'
    this.playerImgUp = new Image();
    this.playerImgUp.src = './images/MickeyJump.png'
    this.hearts = new Image();
    this.hearts.src = './images/hearts.png'

    // --- Sound Effects ---

    let jumpSound = new Audio()
    jumpSound.src = "./Sounds/jumpSound.mp3"


    // --- Movements Keys ---

    document.onkeydown = event => {
      event.preventDefault()
      if (event.keyCode === 37) { // left
        if (this.x <= 0){
          this.direction = undefined
        } else {
          this.direction = "left" 
        }
      }
      if (event.keyCode === 39) { // right
        if (this.x + this.width>=CANVAS_WIDTH){
          this.direction = undefined
        } else {
          this.direction = "right"
        }
      }
      if (event.keyCode === 38 && !this.alreadyJumped ) { // up
          this.direction = "up"
          jumpSound.play()
      }

    }

    
    document.onkeyup = event => {
        if ((event.keyCode === 37 && this.direction === "left") || (event.keyCode === 39 && this.direction === "right") || (event.keyCode === 38 && this.direction === "up")) {
          this.direction = undefined
        }
      }
  }
  
  
  
  draw(ctx) {
    ctx.save()
    if (DEBUG) {
      // ctx.globalAlpha = 0.7
      ctx.save()
      ctx.fillStyle = "red"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
      // ctx.rect(this.x, this.y, this.width,this.height)
      // ctx.fill()
      ctx.restore()
    }
 
    let img
    switch(this.direction){
      case undefined: {
        img = this.playerImg
        break;
      }
      case 'left': {
        img = this.playerImgLeft

        break;
      }
      case 'right': {
        img = this.playerImgRight

        break;
      }
      case 'up': {
        img = this.playerImgUp
        
        break;
      }
      
    }
    

    // if player loses change the image
    if (player.life === 0){
      ctx.drawImage(this.playerImgUp, this.x-this.radius, this.top(), 2*this.radius, this.height)
    } else {
      ctx.drawImage(img, this.x-this.radius, this.top(), 2*this.radius, this.height)
    }

    // Draw the hearts
    let heartSize = 30
    let x = 10
    let y = 10
    for (let i = 0; i < this.life; i++) {
      ctx.drawImage(this.hearts,x,y,heartSize,heartSize)
      // ctx.fillStyle = "#bb0000"
      // ctx.fillRect(x,y,heartSize,heartSize)
      x += heartSize*1.5
    }

    ctx.restore()
  }

  top () {
    return this.y-this.radius
  }
  bottom() {
    return this.top() + this.height
  }
  right () {
    return this.x+this.radius
  }
  left () {
    return this.x-this.radius
  }
  
  // update() {
    // }
    
    update(){
      if (this.direction === "right") {
        this.x += this.speed
      }
      if (this.direction === "left") {
        this.x -= this.speed
      }
      if (this.direction === "up") {
        if (!this.alreadyJumped) {
          this.vy = BOUNCING_SPEED
          this.alreadyJumped = true
        }
      }
      
      // vx = Δx/Δt ===(Δt=1)==> Δx = vx
      this.x += this.vx
      // vy = Δy/Δt ===(Δt=1)==> Δy = vy
      this.y += this.vy
      
      // Δvy = gravity
      this.vy += GRAVITY
      
      this.vx *= 0.
      // console.log('Helo')
      
      // If the player touches the bottom, it bounces up
      /*  if (this.y+this.radius>CANVAS_HEIGHT) {
        this.vy = CANVAS_HEIGHT
      } */
      
      
      while (this.bottom() > CANVAS_HEIGHT && this.life !== 0) {
        this.y = Math.floor(this.y - 1)
        this.alreadyJumped = false
        this.vy = 0
      }
      while (this.top() < 0) {
        this.y++
      }
      
      // If the player touches the left or right border, it bounces
      while (this.left() < 0) {
        this.x++
      }
      while (this.right() > CANVAS_WIDTH) {
        this.x--
      }
    }
  }
