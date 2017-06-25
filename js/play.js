//(function(){
var counter = 0;
var grid = new Grid(document.getElementById('canvas'));
var gamePieces = new Array();

var player = new Player(grid);
player.x = grid.centreSpot().x;
player.y = grid.centreSpot().y;

player.control();
gamePieces.push(player);

var square = new Square(grid);
square.direction = 180;
gamePieces.push(square);

var circle = new Circle(grid);
circle.direction = 90;
gamePieces.push(circle);

var triangle = new Triangle(grid);
triangle.direction = 270;
gamePieces.push(triangle);

var update = () => {
	counter++;
	gamePieces.forEach(piece=>{
		piece.checkCollision(gamePieces);
	});

	grid.clearRectangle(player);
	player.forward();
	grid.drawRectangle(player);
	player.checkWall(grid);
	if(counter%70==0){
    	grid.clearRectangle(triangle);
		triangle.forward();
    	grid.drawTriangle(triangle);
    	triangle.checkWall(grid);
	}
	if(counter%40==0){
		grid.clearRectangle(circle);
		circle.forward();
    	grid.drawCircle(circle);
    	circle.checkWall(grid);
	}
	if(counter%10==0){
		grid.clearRectangle(square);
		square.forward();
    	grid.drawRectangle(square);
    	square.checkWall(grid);
	}      
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
//})();