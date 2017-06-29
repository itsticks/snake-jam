const directions = [0,90,180,270];

class RandomIndex{
    constructor(limit){
        return Math.round(Math.random()*(directions.length-1)+1);
    }
}

class GamePiece {
    constructor(grid) {
    this.grid = grid;
    this.x = grid.randomSpot().x;
    this.y = grid.randomSpot().y;
    this.width = 10;
    this.height = 10;
    this.color = '#ffffff';
    this.direction = new RandomIndex(3);
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
        let r1Top = this.y, r1Right = this.x + this.width, r1Bottom = this.y+this.height, r1Left = this.x;
        let r2Top = piece.y, r2Right = piece.x + piece.width, r2Bottom = piece.y + piece.height, r2Left = piece.x; 
        return !(r2Left > r1Right || r2Right < r1Left || r2Top > r1Bottom || r2Bottom < r1Top)
    }

    this.drawMe = (grid) => {
      grid.ctx.beginPath()
      grid.ctx.arc(this.x+(this.width/2), this.y+(this.height/2), this.width/2, 0, 2 * Math.PI, false)
      grid.ctx.fillStyle = this.color
      grid.ctx.fill()
      grid.ctx.lineWidth = 1
      grid.ctx.strokeStyle = 'this.color'
      grid.ctx.stroke()
    }

    this.clearMe = (grid) => {
        grid.ctx.clearRect(this.x-1,this.y-1,this.width+2,this.height+2)
    }

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