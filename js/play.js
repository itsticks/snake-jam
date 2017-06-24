//(function(){
var counter = 0;
var level1 = new Level();
var player1 = new Player();
var canvas1 = new Canvas(document.getElementById('canvas'));
giveControls(player1);

player1.centreOnCanvas(canvas1);

var update = () => {
	counter++;
	var randX = Math.floor((Math.random() * canvas1.ctx.canvas.width) + 1);
	var randY = Math.floor((Math.random() * canvas1.ctx.canvas.height) + 1);
	canvas1.clearRectangle(player1);
	player1.forward();
	canvas1.drawRectangle(player1);
	player1.checkWall(canvas1);
	if(counter%70==0){
		var triangle = new Triangle(randX,randY);
    	canvas1.drawTriangle(triangle);
	}
	if(counter%40==0){
		var circle = new Circle(randX,randY);
    	canvas1.drawCircle(circle);
	}
	if(counter%100==0){
		var square = new Square(randX,randY);
    	canvas1.drawRectangle(square);
	}      
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
//})();