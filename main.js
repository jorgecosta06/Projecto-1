const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// Constants
const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height
const DEBUG = true
const GRAVITY = 0.5
const BOUNCING_SPEED = -13

let frame = 0
let bg = new Background()
let enemies = [new Enemy()]
let platforms = [new Platform(0, 450, 300),new Platform(290, 300, 500),new Platform(750, 150, 300)]
let player = new Player()
let key = new Key(500,250)
let door = new Door(890,5,100)
let minnie = new Minnie()
let level = 1

playerImg = new Image();
playerImg.src = './images/Mickey2.png'
playerImgLeft = new Image();
playerImgLeft.src = './images/MickeyLeft2.png'
playerImgRight = new Image();
playerImgRight.src = './images/MickeyRight2.gif'
playerImgUp = new Image();
playerImgUp.src = '/images/MickeyJump.png'

function animation(){
drawEverything()
updateEverything()
window.requestAnimationFrame(animation)
}
// animation()

function drawEverything(){
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  bg.draw(ctx)
  for (let i = 0; i < platforms.length; i++){
    platforms[i].draw(ctx)
  }
  for (let i = 0; i < enemies.length; i++){
    enemies[i].draw(ctx)
  }
  player.draw(ctx)
  if (key){key.draw(ctx)}
  door.draw(ctx)
  if (level === 3){minnie.draw(ctx)}
}

function updateEverything() {
  frame++
  if (frame % 200 === 0){ // When the frame is multiple of 120
    enemies.push(new Enemy())
    // console.log('enemies push')
    // console.log(enemies)
  }
  
  player.update()
  for (let i = 0; i < enemies.length; i++){
    enemies[i].update()
  }

  for (let i = 0 ; i < enemies.length; i++){
    if (checkCollision(player,enemies[i])){
      // player.score += enemies[i].score
      // console.log(enemies[i])
      enemies.splice(i,1)
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  }

  for (let i = 0 ; i < platforms.length; i++){
    if (checkCollisionPlatform(player,platforms[i])){
      player.y = platforms[i].top() - player.height + player.radius
      player.vy = 0
      player.alreadyJumped = false
    }
  }

  if (key && checkCollisionKey(player, key)){
    // player.score += key.score
    key = undefined
    door.open()
    console.log(key)
  }
  
  if (checkCollisionDoor(player, door) && door.isOpened){
    console.log('Hello')
    goToNextLevel()
  }

}


function checkCollision(player, enemies) {
  let distance= Math.sqrt((enemies.x-player.x)**2+(enemies.y-player.y)**2)
  return player.radius+enemies.radius > distance
}

function checkCollisionPlatform(player, platform) {
  let formerPlayerBottom = player.bottom() - player.vy
  return formerPlayerBottom <  platform.top() && player.bottom() > platform.top() && platform.left() < player.x && player.x < platform.right()
}

function checkCollisionKey(player, key) {
  let distance = Math.sqrt((key.x-player.x)**2+(key.y-player.y)**2)
  // console.log(checkCollisionKey)
  return player.radius+key.radius > distance
}

function checkCollisionDoor(player, door){
  let distance= Math.sqrt((door.x-player.x)**2+(door.y-player.y)**2)
  // console.log(checkCollisionDoor)
  return player.radius+door.width/3 > distance
}


function goToNextLevel() {
  level++
  player.y = CANVAS_HEIGHT
  player.x = 500
  enemies = []
  platforms = []
  if (level === 2) {
    platforms = [new Platform(0,160,300),new Platform(0,330,700),new Platform(700,160,500), new Platform(800,430,500)]
    key = new Key(140,280)
    door = new Door(900,10,100)
  }
  if (level === 3) {
    door = new Door(0,-500,100)
    platforms = [new Platform(0,300,300),new Platform(700,300,300),new Platform(280,150,450), new Platform(280,450,450)]
    key = new Key(900,250)
    minnie = new Minnie(500,30)
  }
}

let playid = document.getElementById('playid')

playid.onclick = function(){
 document.getElementById('startid').style.display = "none"
 animation()
}