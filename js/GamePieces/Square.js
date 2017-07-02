class Square extends GamePiece {
    constructor(grid){
    super(grid);
    this.color="#00ff00";
    this.speed = 8;
    this.shape = "square";
    this.oscillator.type = 'square';
	}
}