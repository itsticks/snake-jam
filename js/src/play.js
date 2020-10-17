var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame

function randomItem(array) {
    	return array[Math.floor(Math.random()*array.length)]
}


var update = () => {
	if(count%50==0 || count == 1){
		grid.drawScores(points)
	}
	gamePieces.forEach(x=>{
		if(x!=gamePieces[0]){
			x.setVolume(gamePieces[0]);
		}
			if(x.on){x.clearMe(grid);x.forward()}
	        if(count%(10-x.speed)===0&&x.harmful){x.pulse()}
	        if(x!=gamePieces[0] && gamePieces[0].hasCollided(x)){
	 		    gamePieces[4].on = points % 50 == 0 ? true : false
	        	let currentShape = gamePieces[0].shape
	        	let currentColor = gamePieces[0].color
	        	if(x.harmful){
				    canvas.style["background-color"] = "#55ee22";
				    grid.drawMessage("end game")
				    audioCtx.close()
				    audioCtx = new AudioContext
				    cancelAnimationFrame(myReq+1)
				    myReq = 0
				    grid.clearMe()
				    setTimeout(()=>{startGame();canvas.style["background-color"] = "black"},3000)
				}
				else if(x.speedReset){
					gamePieces[0].speed = gamePieces[0].speed > 8 ? gamePieces[0].speed-randomItem(speeds) : gamePieces[0].speed
					gamePieces.forEach((p,i)=>{if(i!=0){p.invertDirection()}})
					gamePieces[4].on = false
					points = points + 20
				}
				else{
					points = points + 10
					gamePieces[0].size = gamePieces[0].size+1;
				    grid.drawScores(points)
				    if(x.color =="#00ff00"){
						gamePieces[0].height = gamePieces[0].height + 1
						gamePieces[0].width = gamePieces[0].width + 1

					}
					else if (x.color=="#ff0000" && gamePieces[0].height > 5){
						gamePieces[0].height = gamePieces[0].height - 1
						gamePieces[0].width = gamePieces[0].width - 1
				    }
				    if(count%2==0){
				        gamePieces.push(new Sawtooth(grid));
				        gamePieces[gamePieces.length-1].direction = randomItem(directions)
				        gamePieces[gamePieces.length-1].speed = randomItem(speeds)
				    }
				    else {
				    	gamePieces[0].speed = gamePieces[0].speed + 1
				    }
				}
				x.clearMe(grid)
				gamePieces[0].changeShape(x.shape)
				x.changeShape(currentShape)
	
				x.x = grid.randomSpot().x
				x.y = grid.randomSpot().y
				x.direction = randomItem(directions)
				x.speed = randomItem(speeds)

		    }	
	        if(x.on){x.drawMe(grid)}
	    });
	count++
	myReq = requestAnimationFrame(update)

}

const startGame = () => {
gamePieces = new Array()
points = 0
paused = true
count = 0
grid.clearMe()

gamePieces.push(new Sine(grid))
gamePieces[0].x = grid.centreSpot().x
gamePieces[0].y = grid.centreSpot().y
gamePieces[0].control()

gamePieces.push(new Square(grid))
gamePieces.push(new Sawtooth(grid))
gamePieces.push(new Triangle(grid))
gamePieces.push(new SpeedReset(grid))
gamePieces[gamePieces.length-1].on = false

gamePieces.filter((x,i)=>i!=0).forEach(x=>{
	x.direction = randomItem(directions)
	x.speed = randomItem(speeds)
})

grid.drawMessage("Snake Jam")

cancelAnimationFrame(myReq)
mute()

}

document.body.onkeyup = function(e){
    if(paused){
        myReq = requestAnimationFrame(update)
        unmute()
        paused = false
        grid.ctx.clearRect(grid.centreSpot().x-50,grid.centreSpot().y-50,550,100)
    }
    else if(e.keyCode == 32 && !paused){
    	cancelAnimationFrame(myReq)
    	mute()
    	paused = true
    }
}

document.body.ontouchstart = function(){
	    if(paused){
        myReq = requestAnimationFrame(update)
        unmute()
        paused = false
        grid.ctx.clearRect(grid.centreSpot().x-50,grid.centreSpot().y-50,550,50)
    }
}

window.onblur = function() {
	console.log("blurring")
		cancelAnimationFrame(myReq)
    	mute()
    	paused = true
}

const grid = new Grid(document.getElementById('canvas'))
const directions = [0,90,180,270]
const speeds = [1,2,4]
var gamePieces = new Array()
var points = 0
var paused = true
var myReq
var count = 0


const mute = () => gamePieces.forEach(x=>x.disconnectGain())
const unmute = () => gamePieces.forEach(x=>x.connectGain())


startGame();