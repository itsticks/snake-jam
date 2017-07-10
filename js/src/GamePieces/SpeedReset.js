class SpeedReset extends GamePiece {
    constructor(grid) {
    super(grid);
    this.speed = 8;
    this.gainNode.gain.value = 0.045;
    this.shape = "triangle";
    this.color = "#F012BE";
    this.originalColor = '#F012BE';
    this.speedReset = true;
    this.speed = 8;
    this.width = 20;
    this.height = 20;
}
}