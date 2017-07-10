class Sawtooth extends GamePiece {
    constructor(grid){
    super(grid);
    this.color="#6C64B9";
    this.originalColor = '#6C64B9';
    this.speed = 2;
    this.harmful = true;
    this.shape = "sawtooth";
        this.forward = () => {
        switch(this.direction) {
        case 0:
            this.y = this.y+this.speed;
            break;
        case 90:
            this.x = this.x+this.speed;
            break;
        case 180:
            this.y = this.y-this.speed;
            break;
        case 270:
            this.x = this.x-this.speed;
            break;
        }
        this.checkWall(grid);
        this.oscillator.frequency.value = this.x/2;
    }
}
}