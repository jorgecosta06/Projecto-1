const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// Constants
const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height

let frame = 0
let bg = new Background()
let enemies = [new Enemy()]
let platforms = [new Platform(0, 450, 300),new Platform(290, 300, 500),new Platform(750, 150, 300)]
let player = new Player()


function animation(){
drawEverything()
updateEverything()
window.requestAnimationFrame(animation)
}
animation()

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
}

function updateEverything() {
  frame++
  if (frame % 200 === 0){ // When the frame is multiple of 120
    enemies.push(new Enemy())
    // console.log('enemies push')
    // console.log(enemies)
  }

  for (let i = 0; i < enemies.length; i++){
    enemies[i].update()
  }

  for (let i = 0 ; i < enemies.length; i++){
    if (checkCollision(player,enemies[i])){
      player.score += enemies[i].score
      console.log(enemies[i])
      enemies.splice(i,1)
    }
  }


  player.update()
}


function checkCollision(player, enemies) {
  let distance= Math.sqrt((enemies.x-player.x)**2+(enemies.y-player.y)**2)
  return player.radius + enemies.radius > distance
}
