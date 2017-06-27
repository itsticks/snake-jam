const directions = [0,90,180,270];

class GamePiece {
    constructor(grid) {
    this.grid = grid;
    this.x = grid.randomSpot().x;
    this.y = grid.randomSpot().y;
    this.width = 10;
    this.height = 10;
    this.color = '#ffffff';
    this.direction = directions[0];
    this.speed = 4;

    this.audioCtx = new AudioContext;
    this.gain = this.audioCtx.createGain();
    this.gain.gain.value = 0.01;
    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.start(0);
    this.oscillator.frequency.value = this.y;
    this.oscillator.connect(this.gain)
    this.gain.connect(this.audioCtx.destination);  

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
        this.checkWall(grid);
        this.oscillator.frequency.value = this.y;
    }

    this.checkWall = (canvas) => {
        if(this.x + this.width > canvas.ctx.canvas.width){
            this.x=0;
        }
        else if(this.x < 0){
            this.x=canvas.ctx.canvas.width-this.width;
        }
        else if(this.y + this.height > canvas.ctx.canvas.height){
            this.y=0;
        }
        else if(this.y < 0){
            this.y = canvas.ctx.canvas.height - this.height;
        }
    }

    this.hasCollided = (piece) => {
    let topLeftIntersect = this.x > piece.x && this.x < piece.x + piece.width && this.y > piece.y && this.y < piece.y + piece.height;
    let topRightIntersect = this.x + this.width > piece.x && this.x + this.width < piece.x + piece.width && this.y > piece.y && this.y < piece.y + piece.height;

    let bottomLeftIntersect = this.x + this.height > piece.x && this.x+this.height < piece.x + piece.width && this.y > piece.y && this.y < piece.y + piece.height;

    let bottomRightIntersect = this.x + this.height + this.width > piece.x ;

    let xAxisIntersect = this.x>piece.x && this.x<piece.x+piece.width;
    let yAxisIntersect = this.y>piece.y && this.y<piece.y+piece.height;
    let xAxisIntersect2 = this.x<piece.x && this.x+this.width>piece.x;
    let yAxisIntersect2 = this.y<piece.y && this.y+this.height>piece.y;
     return ( topLeftIntersect || topRightIntersect || bottomLeftIntersect || bottomRightIntersect)
    }

    this.drawMe = (grid) => {
        grid.ctx.fillStyle = this.color; 
        grid.ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    this.clearMe = (grid) => {
        grid.ctx.clearRect(this.x-1,this.y-1,this.width+2,this.height+2)
    }

}
}