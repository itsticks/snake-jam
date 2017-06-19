//(function(){
var level1 = new Level();
var player1 = new Player();
var canvas1 = new Canvas(document.getElementById('canvas'));
var slideshowAudioCtx = new AudioContext;
var slideshowOscillator = slideshowAudioCtx.createOscillator();
slideshowOscillator.start(0);
slideshowOscillator.frequency.value = player1.x;
slideshowOscillator.connect(slideshowAudioCtx.destination);

giveControls(player1);
player1.centreOnCanvas(canvas1);

var update = () => {
	canvas1.clear(player1);
	player1.forward();
	slideshowOscillator.frequency.value = player1.y/2;
	canvas1.draw(player1);
	if(player1.hitTheWall(canvas1))
        {
        	player1.centreOnCanvas(canvas1)
        	canvas1.drawLoss()
        }
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
//})();