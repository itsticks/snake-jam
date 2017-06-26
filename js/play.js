var counter = 0;
var grid = new Grid(document.getElementById('canvas'));
var gamePieces = new Array();

gamePieces['player'] = new Player(grid);
gamePieces['player'].x = grid.centreSpot().x;
gamePieces['player'].y = grid.centreSpot().y;

gamePieces['player'].control();

gamePieces['square'] = new Square(grid);
gamePieces['square'].direction = 180;

gamePieces['circle'] = new Circle(grid);
gamePieces['circle'].direction = 90;

gamePieces['triangle'] = new Triangle(grid);
gamePieces['triangle'].direction = 270;

var update = () => {
	counter++;

	grid.clearRectangle(gamePieces['player']);
	gamePieces['player'].forward();
	grid.drawRectangle(gamePieces['player']);
	gamePieces['player'].checkWall(grid);
	if(counter%70==0){
    	grid.clearRectangle(gamePieces['triangle']);
		gamePieces['triangle'].forward();
    	grid.drawTriangle(gamePieces['triangle']);
    	gamePieces['triangle'].checkWall(grid);
	}
	if(counter%40==0){
		grid.clearRectangle(gamePieces['circle']);
		gamePieces['circle'].forward();
    	grid.drawCircle(gamePieces['circle']);
    	gamePieces['circle'].checkWall(grid);
	}
	if(counter%10==0){
		grid.clearRectangle(gamePieces['square']);
		gamePieces['square'].forward();
    	grid.drawRectangle(gamePieces['square']);
    	gamePieces['square'].checkWall(grid);
	}

	for(var key in gamePieces){
		if(key!="player"){
		let collided = gamePieces['player'].hasCollided(gamePieces[key])
		if(collided){
			gamePieces[key].x = grid.randomSpot().x;
			gamePieces[key].y = grid.randomSpot().y;
		}
	}
	}
	

    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);