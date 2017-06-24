function Canvas(canvasElement) {
	this.ctx = canvasElement.getContext('2d');
	this.ctx.canvas.width = window.innerWidth;
	this.ctx.canvas.height = window.innerHeight;
	this.drawRectangle = (x) => {
		this.ctx.fillStyle = x.color; 
		this.ctx.fillRect(x.x,x.y,x.width,x.height);
	}
	this.clearRectangle = (x) => {
		this.ctx.clearRect(x.x-1,x.y-1,x.width+2,x.height+2);
	}
	this.drawTriangle = (piece) => {
		this.ctx.fillStyle = piece.color; 
		this.ctx.beginPath();
		this.ctx.moveTo(piece.x+(piece.width/2),piece.y);
        this.ctx.lineTo(piece.x+(piece.width), piece.y+piece.height);
        this.ctx.lineTo(piece.x, piece.y+piece.height);
        this.ctx.fill();
	}
	this.drawCircle = (piece) => {
	  this.ctx.beginPath();
      this.ctx.arc(piece.x+(piece.width/2), piece.y+(piece.height/2), piece.width/2, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = piece.color;
      this.ctx.fill();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = 'piece.color';
      this.ctx.stroke();
	}

	this.drawLoss = (x) => {
		this.ctx.font = "5px Arial";
		this.ctx.fillText("lose",Math.round(Math.random()*window.innerWidth) + 1,Math.round(Math.random()*window.innerHeight) + 1);
	}

}