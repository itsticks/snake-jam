var count = 0, points = 0;
var grid = new Grid(document.getElementById('canvas'));
var gamePieces = new Array();

gamePieces.push(new Player(grid))
gamePieces[0].x = grid.centreSpot().x;
gamePieces[0].y = grid.centreSpot().y;
gamePieces[0].control();

gamePieces.push(new Square(grid));
gamePieces.push(new Circle(grid));
gamePieces.push(new Triangle(grid));


var update = () => {
	count++;
	gamePieces.forEach(x=>{
		if(count%x.speed==0){
			x.clearMe(grid);
	        x.forward();
	        if(x!=gamePieces[0] && gamePieces[0].hasCollided(x)){
				x.x = grid.randomSpot().x;
				x.y = grid.randomSpot().y;
				points = points + 10
				grid.drawScore(points);
		    }	
	        x.drawMe(grid);
	        }

	    });
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);