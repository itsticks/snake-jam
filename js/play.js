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
	gamePieces['player'].checkCollision(gamePieces);
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
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);