class Square extends GamePiece {
    constructor(grid){
    super(grid);
    this.color="#00ff00";
    this.speed = 8;

     this.drawMe = (grid) => {
        grid.ctx.fillStyle = this.color; 
        grid.ctx.fillRect(this.x,this.y,this.width,this.height)
    }
    
	}
}