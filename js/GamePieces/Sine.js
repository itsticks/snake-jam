class Sine extends GamePiece {
    constructor(grid) {
    super(grid);
    this.speed = 10;
    this.gain.gain.value = 0.025;
    this.shape = "sine";
    this.color = "yellow";
}
}