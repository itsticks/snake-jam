class Circle extends GamePiece {
    constructor(grid){
    super(grid);
    this.color="#0000ff";
    this.speed = 2;
    this.drawMe = (grid) => {
	  grid.ctx.beginPath()
      grid.ctx.arc(this.x+(this.width/2), this.y+(this.height/2), this.width/2, 0, 2 * Math.PI, false)
      grid.ctx.fillStyle = this.color
      grid.ctx.fill()
      grid.ctx.lineWidth = 1
      grid.ctx.strokeStyle = 'this.color'
      grid.ctx.stroke()
	}
}
}