const grid = new Grid(document.getElementById('canvas'));
const gamePieces = new Array();
const directions = [0,90,180,270];
const speeds = [1,2,4];
var points = 0, count = 0;

function randomItem(array) {
    	return array[Math.floor(Math.random()*array.length)]
}

var update = () => {
	if(count%100==0){
		grid.drawScores(points);
	}
	if(gamePieces.length%10==0){
		gamePieces.push(new SpeedReset(grid));
			gamePieces[gamePieces.length-1].direction = randomItem(directions)
			gamePieces[gamePieces.length-1].speed = randomItem(speeds)
	}
	gamePieces.forEach(x=>{
			x.clearMe(grid);
	        x.forward();
	        if(count%(10-x.speed)===0&&x.harmful){x.pulse()}
	        if(x!=gamePieces[0] && gamePieces[0].hasCollided(x)){
	        	let currentShape = gamePieces[0].shape;
	        	let currentColor = gamePieces[0].color;
	        	if(x.harmful){
	        		points = 0;
				    //grid.drawScore("game over");
				    canvas.style["background-color"] = "white"
				    setTimeout(()=>window.location.href = window.location.href,2000);
				}
				else if(x.speedReset){
					gamePieces[0].speed = 4;
					let currentIndex = gamePieces.indexOf(x);
					gamePieces.splice(currentIndex,1);
				}
				else{
				    points = points + 10;
				    grid.drawScores(points);
				    if(x.color =="#00ff00"){
					gamePieces[0].height = gamePieces[0].height + 1;
					gamePieces[0].width = gamePieces[0].width + 1;

				}
				else if (x.color=="#ff0000" && gamePieces[0].height > 5){
					gamePieces[0].height = gamePieces[0].height - 1;
					gamePieces[0].width = gamePieces[0].width - 1;
				}
				    if(count%2==0){
				        gamePieces.push(new Sawtooth(grid));
				        gamePieces[gamePieces.length-1].direction = randomItem(directions);
				        gamePieces[gamePieces.length-1].speed = randomItem(speeds);
				    }
				    else {
				    	gamePieces[0].speed = gamePieces[0].speed + 1;
				    }
				}

				gamePieces[0].changeShape(x.shape);
				x.changeShape(currentShape);
	
				x.x = grid.randomSpot().x;
				x.y = grid.randomSpot().y;
				x.direction = randomItem(directions);
				x.speed = randomItem(speeds)

		    }	
	        x.drawMe(grid);
	    });
	window.requestAnimationFrame(update)
	count++;
}


gamePieces.push(new Sine(grid))
gamePieces[0].x = grid.centreSpot().x;
gamePieces[0].y = grid.centreSpot().y;
gamePieces[0].control();

gamePieces.push(new Square(grid));
gamePieces.push(new Sawtooth(grid));
gamePieces.push(new Triangle(grid));

gamePieces.filter((x,i)=>i!=0).forEach(x=>{
	x.direction = randomItem(directions)
	x.speed = randomItem(speeds)
})

window.requestAnimationFrame(update);