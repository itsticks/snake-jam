class Player extends GamePiece {
    constructor(grid) {
    super(grid);
    this.control = () => {
    window.onkeydown = (e) => {
        switch(e.keyCode) {
            case 37:
                player.direction = 270;
                break;
            case 38:
                player.direction = 180;
                break;
            case 39:
                player.direction = 90;
                break;
            case 40:
                player.direction = 0;
                break;
        }
    }
} 
}
}