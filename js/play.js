//(function(){
var level1 = new Level();
var player1 = new Player();
var canvas1 = new Canvas(document.getElementById('canvas'));
giveControls(player1);

player1.centreOnCanvas(canvas1);

var update = () => {
	canvas1.clear(player1);
	player1.forward();
	canvas1.draw(player1);
	player1.checkWall(canvas1)
        
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
//})();