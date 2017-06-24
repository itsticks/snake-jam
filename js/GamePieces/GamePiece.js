const speeds = [0,1,2,3,4,5,6,7,8,9];
const directions = [0,90,180,270];
const gridCellSquarePixels = 10;

class GamePiece {
    constructor(x, y, width, height, color) {
    this.x = x || gridCellSquarePixels;
    this.y = y || gridCellSquarePixels;
    this.width = width || 10;
    this.height = height || 10;
    this.color = '#ffffff';
    this.direction = directions[0];
    this.speed = speeds[0];

    this.forward = () => {
        switch(this.direction) {
        case 0:
            this.y = this.y+this.height;
            this.oscillator.type = 'square';
            break;
        case 90:
            this.x = this.x+this.width;
            this.oscillator.type = 'triangle';
            break;
        case 180:
            this.y = this.y-this.height;
            this.oscillator.type = 'sine';
            break;
        case 270:
            this.x = this.x-this.width;
            this.oscillator.type = 'sawtooth';
            break;
        }
        this.oscillator.frequency.value = this.y;
    }

    this.centreOnCanvas = (canvas) => {
        this.x = canvas.ctx.canvas.width / 2;
        this.y = canvas.ctx.canvas.height / 2; 
    }

    this.checkWall = (canvas) => {
        if(this.x + this.width > canvas.ctx.canvas.width){
            this.x=0;
            return "hitRight";
        }
        else if(this.x < 0){
            this.x=canvas.ctx.canvas.width-this.width;
            return "hitLeft";
        }
        else if(this.y + this.height > canvas.ctx.canvas.height){
            this.y=0;
            return "hitBottom"
        }
        else if(this.y < 0){
            this.y = canvas.ctx.canvas.height - this.height;
            return "hitTop";
        }
    }

}
}