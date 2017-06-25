class Grid {
  constructor(canvasElement) {
	this.ctx = canvasElement.getContext('2d')
	this.ctx.canvas.width = window.innerWidth
	this.ctx.canvas.height = window.innerHeight

	this.drawRectangle = (x) => {
		this.ctx.fillStyle = x.color; 
		this.ctx.fillRect(x.x,x.y,x.width,x.height)
	}

	this.clearRectangle = (x) => {
		this.ctx.clearRect(x.x-1,x.y-1,x.width+2,x.height+2)
	}

	this.drawTriangle = (piece) => {
		this.ctx.fillStyle = piece.color
		this.ctx.beginPath()
		this.ctx.moveTo(piece.x+(piece.width/2),piece.y)
        this.ctx.lineTo(piece.x+(piece.width), piece.y+piece.height)
        this.ctx.lineTo(piece.x, piece.y+piece.height)
        this.ctx.fill()
	}

	this.drawCircle = (piece) => {
	  this.ctx.beginPath()
      this.ctx.arc(piece.x+(piece.width/2), piece.y+(piece.height/2), piece.width/2, 0, 2 * Math.PI, false)
      this.ctx.fillStyle = piece.color
      this.ctx.fill()
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = 'piece.color'
      this.ctx.stroke()
	}

	this.centreSpot = () => {
		let midX = this.ctx.canvas.width / 2;
        let midY = this.ctx.canvas.height / 2; 
        return {x:midX,y:midY}
	}

	this.randomSpot = () => {
		let randX = Math.floor((Math.random() * this.ctx.canvas.width) + 1)
		let randY = Math.floor((Math.random() * this.ctx.canvas.height) + 1)
		return {x:randX,y:randY}
	}

	this.drawLoss = (x) => {
		this.ctx.font = "15px Arial"
		this.ctx.fillText("collision!",this.randomSpot().x, this.randomSpot().y)
	}

  }
}