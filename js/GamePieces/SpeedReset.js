class SpeedReset extends GamePiece {
    constructor(grid) {
    super(grid);
    this.speed = 8;
    this.gainNode.gain.value = 0.045;
    this.shape = "triangle";
    this.color = "pink";
    this.originalColor = 'pink';
    this.speedReset = true;
}
}