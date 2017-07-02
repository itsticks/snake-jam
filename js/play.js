const grid = new Grid(document.getElementById('canvas'));
const gamePieces = new Array();
const directions = [0,90,180,270];
var points = 0, count = 0;

function randomDirection() {
        let i = Math.round(Math.random()*(directions.length)+1)-1;
        grid.drawScore(directions[i]);
    	return directions[i]
}

var update = () => {
	gamePieces.forEach(x=>{
			x.clearMe(grid);
	        x.forward();
	        if(count%(10-x.speed)*2===0){x.pulse()}
	        if(x!=gamePieces[0] && gamePieces[0].hasCollided(x)){
	        	let currentShape = gamePieces[0].shape;
	        	let currentColor = gamePieces[0].color;
				gamePieces[0].color = x.color;
				gamePieces[0].changeShape(x.shape);
				x.changeShape(currentShape);
				x.color = currentColor;
				x.x = grid.randomSpot().x;
				x.y = grid.randomSpot().y;
				x.direction = randomDirection();
				points = points + 10
				grid.drawScore(points);
		    }	
	        x.drawMe(grid);
	    });
	window.requestAnimationFrame(update)//,
	count++;
}


gamePieces.push(new Sine(grid))
gamePieces[0].x = grid.centreSpot().x;
gamePieces[0].y = grid.centreSpot().y;
gamePieces[0].control();

gamePieces.push(new Square(grid));
gamePieces.push(new Sawtooth(grid));
gamePieces.push(new Triangle(grid));

gamePieces.forEach(x=>x.direction = randomDirection())

window.requestAnimationFrame(update);