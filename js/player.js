const speeds = [0,1,2,3,4,5,6,7,8,9];
const directions = [0,90,180,270];

function Player() {
	this.x = 0;
	this.y = 0;
    this.width = 10;
    this.height = 10;
    this.color = '#ffffff';
	this.direction = directions[0];
	this.speed = speeds[0];
    this.forward = () => {
        switch(this.direction) {
        case 0:
            this.y = this.y+this.height;
            break;
        case 90:
            this.x = this.x+this.width;
            break;
        case 180:
            this.y = this.y-this.height;
            break;
        case 270:
            this.x = this.x-this.width;
            break;
        }
    }
    this.centreOnCanvas = (canvas) => {
        this.x = canvas.ctx.canvas.width / 2;
        this.y = canvas.ctx.canvas.height / 2; 
    }

    this.hitTheWall = (canvas) => {
        return (this.x + this.width > canvas.ctx.canvas.width
        || this.x < 0
        || this.y + this.height > canvas.ctx.canvas.height) 
        || this.y < 0
        ? true : false
    }
}