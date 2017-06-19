function Canvas(canvasElement) {
	this.ctx = canvasElement.getContext('2d');
	this.ctx.canvas.width = window.innerWidth - 50;
	this.ctx.canvas.height = window.innerHeight - 50;
	this.draw = (x) => {
		this.ctx.fillStyle = x.color; 
		this.ctx.fillRect(x.x,x.y,x.width,x.height);
	}
	this.drawLoss = (x) => {
		this.ctx.font = "30px Arial";
this.ctx.fillText("lose",Math.round(Math.random()*window.innerWidth) + 1,Math.round(Math.random()*window.innerHeight) + 1);
	}
		this.clear = (x) => {
		this.ctx.clearRect(x.x,x.y,x.width+1,x.height+1);
	}
}