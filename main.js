const log = console.log.bind(console)

let board = document.getElementById('board')
let context = board.getContext('2d')
let lineWidth = 5

autoSetCanvasSize(board)

listenToUser(board)

let eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
clear.onclick = function() {
  context.clearRect(0, 0, board.width, board.height)
}
download.onclick = function() {
  let url = board.toDataURL()
  let a = document.createElement('a')
  a.href = url
  a.download = '我的画儿'
  a.target = '_blank'
  a.click()
}
red.onclick = function () {
  // 填充颜色
  context.fillStyle = 'red'
  // 画笔颜色
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function () {
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function () {
  context.fillStyle = 'red'
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  green.classList.remove('active')
  red.classList.remove('active')
}
thin.onclick = function() {
  lineWidth = 5
}
thick.onclick = function() {
  lineWidth = 10
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth 
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  let using = false
  let lastPoint = {
    x: undefined,
    y: undefined,
  }
  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    log('这是一个移动设备')
    canvas.ontouchstart = function (event) {
      log('摸上')
      let x = event.touches[0].clientX
      let y = event.touches[0].clientY
      // using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          x,
          y,
        }
      }
    }
    canvas.ontouchmove = function (event) {
      log('摸动')
      event.preventDefault()
      let x = event.touches[0].clientX
      let y = event.touches[0].clientY

      // if (!using) {
      //   return
      // }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        newPoint = {
          x,
          y,
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function (event) {
      log('摸完')
      // using = false
    }
  } else {
    canvas.onmousedown = function (event) {
      let x = event.clientX
      let y = event.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          x,
          y,
        }
      }
    }
    canvas.onmousemove = function (event) {
      let x = event.clientX
      let y = event.clientY

      if (!using) {
        return
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        newPoint = {
          x,
          y,
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function (event) {
      using = false
    }
  }
}

function autoSetCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }
  function setCanvasSize() {
    log('resize')
    const pageWidth = document.documentElement.clientWidth
    const pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}


