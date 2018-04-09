{
  let view = {
    el: '#board',
    init() {
      this.board = document.querySelector(this.el)
      this.context = this.board.getContext('2d')
      this.lineWidth = 5
      this.eraserEnabled = false
    }
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.init()
      this.bindEvents()
      this.autoSetCanvasSize(this.view.board)
      this.listenToUser(this.view.board, this.view.context)
    },
    bindEvents() {
      eraser.onclick = () => {
        this.view.eraserEnabled = true
        eraser.classList.add('active')
        pen.classList.remove('active')
      }

      pen.onclick =  () => {
        this.view.eraserEnabled = false
        pen.classList.add('active')
        eraser.classList.remove('active')
      }
      clear.onclick = () => {
        this.view.context.clearRect(0, 0, board.width, board.height)
      }
      red.onclick =  () => {
        // 填充颜色
        this.view.context.fillStyle = 'red'
        // 画笔颜色
        this.view.context.strokeStyle = 'red'
        red.classList.add('active')
        green.classList.remove('active')
        blue.classList.remove('active')
      }
      green.onclick =  () => {
        this.view.context.fillStyle = 'green'
        this.view.context.strokeStyle = 'green'
        green.classList.add('active')
        red.classList.remove('active')
        blue.classList.remove('active')
      }
      blue.onclick =  () => {
        this.view.context.fillStyle = 'red'
        this.view.context.strokeStyle = 'blue'
        blue.classList.add('active')
        green.classList.remove('active')
        red.classList.remove('active')
      }
      thin.onclick =  () => {
        this.view.lineWidth = 5
      }
      thick.onclick =  () => {
        this.view.lineWidth = 10
      }
      download.onclick =  () => {
        let url = this.view.board.toDataURL()
        let a = document.createElement('a')
        a.href = url
        a.download = '我的画儿'
        a.target = '_blank'
        a.click()
      }
    },
    drawLine(x1, y1, x2, y2, context, lineWidth) {
      context.beginPath()
      context.moveTo(x1, y1)
      context.lineWidth = lineWidth
      context.lineTo(x2, y2)
      context.stroke()
      context.closePath()
    },
    listenToUser(canvas, context) {
      let using = false
      let lastPoint = {
        x: undefined,
        y: undefined,
      }
      // 特性检测
      if (document.body.ontouchstart !== undefined) {
        log('m mobile phone')
        canvas.ontouchstart = (event) => {
          log('touch start')
          let x = event.touches[0].clientX
          let y = event.touches[0].clientY
          if (this.view.eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
          } else {
            lastPoint = {
              x,
              y,
            }
          }
        }
        canvas.ontouchmove = (event) => {
          log('touch move')
          event.preventDefault()
          let x = event.touches[0].clientX
          let y = event.touches[0].clientY
          if (this.view.eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
          } else {
            newPoint = {
              x,
              y,
            }
            this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, context, this.view.lineWidth)
            lastPoint = newPoint
          }
        }
        canvas.ontouchend = function (event) {
          log('touch end')
        }
      } else {
        canvas.onmousedown = (event) => {
          let x = event.clientX
          let y = event.clientY
          using = true
          if (this.view.eraserEnabled) {
            context.clearRect(x - 5, y - 5, 15, 15)
          } else {
            lastPoint = {
              x,
              y,
            }
          }
        }
        canvas.onmousemove = (event) => {
          let x = event.clientX
          let y = event.clientY

          if (!using) {
            return
          }
          if (this.view.eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
          } else {
            newPoint = {
              x,
              y,
            }
            this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, context, this.view.lineWidth)
            lastPoint = newPoint
          }
        }
        canvas.onmouseup = (event) => {
          using = false
        }
      }
    },
    setCanvasSize(canvas) {
      const pageWidth = document.documentElement.clientWidth
      const pageHeight = document.documentElement.clientHeight
      canvas.width = pageWidth
      canvas.height = pageHeight
    },
    autoSetCanvasSize(canvas) {
      this.setCanvasSize(canvas)
      window.onresize = () => {
        this.setCanvasSize(canvas)
      }
    }
  }
  controller.init(view, model)
}

function log() {
  console.log.apply(console, arguments)
}









