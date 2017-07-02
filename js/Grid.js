class Grid {
  constructor(canvasElement) {
	this.ctx = canvasElement.getContext('2d')
	this.ctx.canvas.width = window.innerWidth
	this.ctx.canvas.height = window.innerHeight

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

	this.drawScore = (x) => {
		this.ctx.font = "25px Arial"
		this.ctx.clearRect(this.centreSpot().x-50,this.centreSpot().y-50,150,50)
		this.ctx.fillText(x,this.centreSpot().x, this.centreSpot().y)
	}

  }
}