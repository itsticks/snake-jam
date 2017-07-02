const grid = new Grid(document.getElementById('canvas'));
const gamePieces = new Array();
const directions = [0,90,180,270];
const speeds = [2,4,8];
var points = 0, count = 0;

function randomItem(array) {
    	return array[Math.floor(Math.random()*array.length)]
}

var update = () => {
	gamePieces.forEach(x=>{
			x.clearMe(grid);
	        x.forward();
	        if(count%(10-x.speed)===0&&x.harmful){x.pulse()}
	        if(x!=gamePieces[0] && gamePieces[0].hasCollided(x)){
	        	let currentShape = gamePieces[0].shape;
	        	let currentColor = gamePieces[0].color;
	        	if(x.harmful){
	        		points = 0;
				    grid.drawScore("you died!");
				    canvas.style["background-color"] = "white"
				    setTimeout(()=>window.location.href = window.location.href,2000);
				}
				else{
				    points = points + 10;
				    gamePieces[0].speed = gamePieces[0].speed + 1;
				    gamePieces.push(new Sawtooth(grid));
				    gamePieces[gamePieces.length-1].direction = randomItem(directions);
				    gamePieces[gamePieces.length-1].speed = randomItem(speeds);
				    grid.drawScore(points);
				    grid.drawRecordScore(points);
				}

				gamePieces[0].changeShape(x.shape);
				x.changeShape(currentShape);
	
				x.x = grid.randomSpot().x;
				x.y = grid.randomSpot().y;
				x.direction = randomItem(directions);
				x.speed = randomItem(speeds)

		    }	
	        x.drawMe(grid);
	        //grid.drawScore(points);
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

gamePieces.filter((x,i)=>i!=0).forEach(x=>{
	x.direction = randomItem(directions)
	x.speed = randomItem(speeds)
})

window.requestAnimationFrame(update);