const grid = new Grid(document.getElementById('canvas'));
const gamePieces = new Array();
const directions = [0,90,180,270];
var count = 0, points = 0;

function randomDirection() {
        let i = Math.round(Math.random()*(directions.length-1)+1);
    	return directions[i];
}

var update = () => {
	count++;
	gamePieces.forEach(x=>{
		if(count%x.speed==0){
			x.clearMe(grid);
	        x.forward();
	        if(x!=gamePieces[0] && gamePieces[0].hasCollided(x)){
				x.x = grid.randomSpot().x;
				x.y = grid.randomSpot().y;
				x.direction = randomDirection();
				points = points + 10
				grid.drawScore(points);
		    }	
	        x.drawMe(grid);
	        }

	    });

    window.requestAnimationFrame(update);
}


gamePieces.push(new Player(grid))
gamePieces[0].x = grid.centreSpot().x;
gamePieces[0].y = grid.centreSpot().y;
gamePieces[0].control();

gamePieces.push(new Square(grid));
gamePieces.push(new Circle(grid));
gamePieces.push(new Triangle(grid));

window.requestAnimationFrame(update);