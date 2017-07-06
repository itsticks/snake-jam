var audioCtx = new AudioContext;

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

class GamePiece {
    constructor(grid) {
    this.grid = grid;
    this.harmful = false;
    this.x = grid.randomSpot().x;
    this.y = grid.randomSpot().y;
    this.width = 10;
    this.height = 10;
    this.color = '#ffffff';
    this.originalColor = '#ffffff';
    this.shape = "circle";
    this.direction = 0;
    this.speed = 4;
    this.volume = 0.01;
    // this.analyser = audioCtx.createAnalyser();
    // this.biquadFilter = audioCtx.createBiquadFilter();
    // this.convolver = audioCtx.createConvolver();
    this.gainNode = audioCtx.createGain();
    this.gainNode.gain.value = this.volume;
    this.distortion = audioCtx.createWaveShaper();
    this.distortion.wave = makeDistortionCurve(this.x);
    this.oscillator = audioCtx.createOscillator();
    this.oscillator.start(0);
    this.oscillator.frequency.value = this.y;
    this.oscillator.connect(this.distortion);
    this.distortion.connect(this.gainNode);
    this.gainNode.connect(audioCtx.destination);  

    this.pulse = () => {
        this.gainNode.gain.value = this.gainNode.gain.value == 0 ? this.volume : 0
        this.color = this.color == "white" ? this.originalColor : "white";
    }

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
        this.oscillator.frequency.value = this.y;
        this.distortion.curve = makeDistortionCurve(this.x);
    }

    this.checkWall = (canvas) => {
        if(this.x + this.width > canvas.ctx.canvas.width){
            this.x=0;
        }
        else if(this.x < 0) {
            this.x=canvas.ctx.canvas.width-this.width;
        }
        else if(this.y + this.height > canvas.ctx.canvas.height){
            this.y=0;
        }
        else if(this.y < 0) {
            this.y = canvas.ctx.canvas.height - this.height;
        }
    }

    this.changeShape = (shape) => {
        this.shape = shape;
        this.oscillator.type = shape;
    }

    this.hasCollided = (piece) => {
        let r1Top = this.y, r1Right = this.x + this.width, r1Bottom = this.y+this.height, r1Left = this.x;
        let r2Top = piece.y, r2Right = piece.x + piece.width, r2Bottom = piece.y + piece.height, r2Left = piece.x; 
        return !(r2Left > r1Right || r2Right < r1Left || r2Top > r1Bottom || r2Bottom < r1Top)
    }

    this.drawMe = () => {
    switch(this.shape) {
      case "sine":
        grid.ctx.beginPath()
        grid.ctx.arc(this.x+(this.width/2), this.y+(this.height/2), this.width/2, 0, 2 * Math.PI, false)
        grid.ctx.fillStyle = this.color
        grid.ctx.fill()
        grid.ctx.lineWidth = 1
        grid.ctx.strokeStyle = this.color
        grid.ctx.stroke()
      break;
      case "square":
        grid.ctx.fillStyle = this.color; 
        grid.ctx.fillRect(this.x,this.y,this.width,this.height);
        break;
      case "triangle":
        grid.ctx.fillStyle = this.color
        grid.ctx.beginPath()
        grid.ctx.moveTo(this.x+(this.width/2),this.y)
        grid.ctx.lineTo(this.x+(this.width), this.y+this.height)
        grid.ctx.lineTo(this.x, this.y+this.height)
        grid.ctx.fill()
        break;
      case "sawtooth":
        grid.ctx.fillStyle = this.color
        grid.ctx.beginPath()
        grid.ctx.moveTo(this.x,this.y)
        grid.ctx.lineTo(this.x+(this.width/2), this.y+this.height)
        grid.ctx.lineTo(this.x+this.width/2, this.y)
        grid.ctx.lineTo(this.x, this.y)
        grid.ctx.lineTo(this.x+this.width/2, this.y)
        grid.ctx.lineTo(this.x+this.width, this.y+this.height)
        grid.ctx.lineTo(this.x+this.width, this.y)
        grid.ctx.lineTo(this.x, this.y)
        grid.ctx.fill()
        break;
        }
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
        window.ontouchstart = (e) => {
            let startTouchX = e.touches[0].clientX;
            let startTouchY = e.touches[0].clientY;
            window.ontouchmove = (f) => {
                 let moveTouchX = f.touches[0].clientX;
                 let moveTouchY = f.touches[0].clientY;
                 let xDelta = moveTouchX > startTouchX ? moveTouchX - startTouchX : startTouchX - moveTouchX
                 let yDelta = moveTouchY > startTouchY ? moveTouchY - startTouchY : startTouchY - moveTouchY
                 if(xDelta>yDelta){
                   this.direction = moveTouchX > startTouchX ? 90 : 270
                 }
                 else{
                   this.direction = moveTouchY > startTouchY ? 0 : 180
                 }
                 f.preventDefault();
            }
        }
}

}
}