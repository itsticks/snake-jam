const speeds = [0,1,2,3,4,5,6,7,8,9];
const directions = [0,90,180,270];

class GamePiece {
    constructor(grid) {
    this.x = grid.randomSpot().x;
    this.y = grid.randomSpot().y;
    this.width = 10;
    this.height = 10;
    this.color = '#ffffff';
    this.direction = directions[0];
    this.speed = speeds[0];

    this.audioCtx = new AudioContext;
    this.gain = this.audioCtx.createGain();
    this.gain.gain.value = 0.005;
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

    this.checkCollision = (gamePieces) => {
    gamePieces.forEach(piece=>{
    let xAxisIntersect = this.x+this.width>piece.x && this.x+this.width<piece.x+piece.width;
    let yAxisIntersect = this.y+this.height>piece.y && this.y+this.height<piece.y+piece.height;
    if(xAxisIntersect && yAxisIntersect) {
        alert("boom")
        console.log(Object.prototype.toString.call(this),"collides",Object.prototype.toString.call(piece));
    }
})
    }

}
}