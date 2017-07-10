class Sine extends GamePiece {
    constructor(grid) {
    super(grid);
    this.speed = 2;
    this.gainNode.gain.value = 0.025;
    this.shape = "sine";
    this.color = "white";
    this.originalColor = 'white';
}
}