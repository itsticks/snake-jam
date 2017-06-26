class Triangle extends GamePiece {
    constructor(grid) {
    super(grid);
    this.color="#ff0000";
    this.speed = 4;
	this.drawMe = (grid) => {
		grid.ctx.fillStyle = this.color
		grid.ctx.beginPath()
		grid.ctx.moveTo(this.x+(this.width/2),this.y)
        grid.ctx.lineTo(this.x+(this.width), this.y+this.height)
        grid.ctx.lineTo(this.x, this.y+this.height)
        grid.ctx.fill()
	}
	
	}
}