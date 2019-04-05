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
let easterEgg = new EasterEgg()
let level = 1
let isGameWon = false
let bandeira = false

playerImg = new Image();
playerImg.src = './images/Mickey2.png'
playerImgLeft = new Image();
playerImgLeft.src = './images/MickeyLeft2.png'
playerImgRight = new Image();
playerImgRight.src = './images/MickeyRight2.gif'
playerImgUp = new Image();
playerImgUp.src = '/images/MickeyJump.png'

let doorSound = new Audio()
doorSound.src = "./Sounds/doorSound.mp3"
let scream = new Audio()
scream.src = "./Sounds/scream.mp3"

let music = new Audio()
music.src = "./Sounds/Not As It Seems.mp3"


// --- Calling ---

function animation() {
  if (player.y > CANVAS_HEIGHT) {
    displayGameLost()
  }
  else {
    updateEverything()
    drawEverything()
    window.requestAnimationFrame(animation)
  }
  
 }

 // --- Draw ---

function drawEverything(){
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  if (isGameWon) {
    displayGameWon()
    return // stop the function
  }
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
  if (level === 3){
    minnie.draw(ctx)
  }
  if (level === 2 || level === 3)
  {easterEgg.draw(ctx)}
}

// --- Update ---

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
      player.life--
      scream.play()
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
    doorSound.play()
    minnie.happy()
  }
  
  if (checkCollisionDoor(player, door) && door.isOpened){
    goToNextLevel()
  }
  
  if (checkCollisionMinnie(player, minnie)){
    isGameWon = true
  }

  if (checkCollisionEasterEgg(player, easterEgg)){
    bandeira = true
  }

}

// --- Collisions ---

function checkCollision(player, enemies) {
  let distance= Math.sqrt((enemies.x-player.x)**2+(enemies.y-player.y)**2)
  return player.radius+enemies.radius > distance
}

function checkCollisionPlatform(player, platform) {
  if (player.life === 0) return false
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

function checkCollisionMinnie(player, minnie){
  let distance= Math.sqrt((minnie.x-player.x)**2+(minnie.y-player.y)**2)
  // console.log(checkCollisionMinnie)
  return player.radius+minnie.radius > distance
}

function checkCollisionEasterEgg(player, easterEgg){
  let distance= Math.sqrt((easterEgg.x-player.x)**2+(easterEgg.y-player.y)**2)
 if(player.radius+easterEgg.radius > distance){
   bandeira = true
 }
}

// --- Go to next Level ---
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
    easterEgg = new EasterEgg(150,250)
  }
}


// --- Start Game Button ---
let playid = document.getElementById('playid')

playid.onclick = function(){
 document.getElementById('startid').style.display = "none"
 music.play()
 animation()
}

// --- Win Game ---

let WinImg = new Image()
WinImg.src = './images/Win.png'

let easterEggImg = new Image()
easterEggImg.src = './images/127.png'

function displayGameWon(){
  if (bandeira) {
    // --- EasterEgg ---
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.drawImage(easterEggImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
  else {
    ctx.fillStyle = "#0c0d29"
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.drawImage(WinImg, 0, 0 , CANVAS_WIDTH, CANVAS_HEIGHT )
  }

}


// --- Lose Game ---

let gameOverImg = new Image()
gameOverImg.src = '/images/Lose.png'

function displayGameLost(){
 ctx.fillStyle = "#0c0d29"
 ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
 ctx.drawImage(gameOverImg, 150, 100, CANVAS_WIDTH/1.5, CANVAS_HEIGHT/1.5)
}

// --- Easter egg ---
