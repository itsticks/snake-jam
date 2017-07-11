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
	this.drawScores = (x) => {
		this.ctx.fillStyle = "white"
		this.ctx.clearRect(0,0,300,300)
		this.ctx.font = "15px Arial";
		this.ctx.fillText("score: "+x,10,20)
		let score = localStorage.highScore!=null && parseInt(localStorage.highScore) > x ? localStorage.highScore : x;  
		localStorage.highScore = score;
		this.ctx.fillText("best: "+score,10, 35)
	}

	this.drawMessage = (msg) => {
		this.ctx.fillStyle = "white"
		this.ctx.font = "25px Arial"
        this.ctx.clearRect(grid.centreSpot().x-50,grid.centreSpot().y-50,550,50)
		this.ctx.fillText(msg,this.centreSpot().x, this.centreSpot().y)
	}

	this.clearMe = () => {
		this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
	}

  }
}

