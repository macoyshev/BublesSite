let canvas = document.getElementById('game')
let count = 0
const grid = 16;
let ctx = canvas.getContext('2d')
let snake = {
  x: 160,
  y: 160,
  cells: [],
  maxLength: 4,
  dx: grid,
  dy: 0,
  color: 'green'
}

let apple = {
  x: 32,
  y: 32,
  color: 'red'
}

function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop)
  if (++count < 4) {
    return;
  }
  count = 0
  if (snake.x > canvas.width) {
    snake.x = 0 - grid
  } else {
    if (snake.x < 0) {
      snake.x = canvas.width + grid
    }
  }

  if (snake.y > canvas.height) {
    snake.y = 0 - grid
  } else {
    if (snake.y < 0) {
      snake.y = canvas.height + grid
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  snake.x += snake.dx
  snake.y += snake.dy
  snake.cells.unshift({x: snake.x, y: snake.y})
  if (snake.cells.length > snake.maxLength) {
    snake.cells.pop()
  }

  snake.cells.forEach((cell, index) => {
    ctx.fillStyle = snake.color
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1)

    ctx.fillStyle = apple.color
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1)
  
    if ((cell.x === apple.x && cell.y === apple.y)) {
      snake.maxLength += 1
      apple.x = getRandom(0, 25)*grid
      apple.y = getRandom(0, 25)*grid
    }
  
    for (let i = index + 1 ; i < snake.cells.length ; i++) {
      if ((cell.x === snake.cells[i].x)&&(cell.y === snake.cells[i].y)){
        snake = {
          x: 0,
          y: 0,
          cells: [],
          maxLength: 4,
          dx: grid,
          dy: 0,
          color: 'green'
        }      
      }
    }
  })
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'w':
        snake.dx = 0;
        snake.dy = -grid;
        break;
      case 'a':
        snake.dx = -grid;
        snake.dy = 0;
        break;
      case 's':
        snake.dx = 0;
        snake.dy = grid;
        break;
      case 'd':
        snake.dx = grid;
        snake.dy = 0;
        break;
    }
  });
}

requestAnimationFrame(loop)