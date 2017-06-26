class Player extends GamePiece {
    constructor(grid) {
    super(grid);
    this.speed = 1;
    this.gain.gain.value = 0.025;
    this.control = () => {
        window.onkeydown = (e) => {
            switch(e.keyCode) {
                case 37:
                    this.direction = 270;
                    break;
                case 38:
                    this.direction = 180;
                    break;
                case 39:
                    this.direction = 90;
                    break;
                case 40:
                    this.direction = 0;
                    break;
        }
    }
} 
}
}