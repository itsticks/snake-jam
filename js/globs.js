'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var audioCtx = new AudioContext();

function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
    for (; i < n_samples; ++i) {
        x = i * 2 / n_samples - 1;
        curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
};

var GamePiece = function GamePiece(grid) {
    var _this = this;

    _classCallCheck(this, GamePiece);

    this.grid = grid;
    this.on = true;
    this.x = grid.randomSpot().x;
    this.y = grid.randomSpot().y;
    this.width = 10;
    this.height = 10;
    this.color = '#ffffff';
    this.originalColor = '#ffffff';
    this.shape = "circle";
    this.direction = 0;
    this.speed = 4;
    this.volume = 0.01;
    // this.analyser = audioCtx.createAnalyser();
    // this.biquadFilter = audioCtx.createBiquadFilter();
    // this.convolver = audioCtx.createConvolver();
    this.gainNode = audioCtx.createGain();
    this.gainNode.gain.value = this.volume;
    // this.distortion = audioCtx.createWaveShaper();
    // this.distortion.wave = makeDistortionCurve(this.x*10);
    this.oscillator = audioCtx.createOscillator();
    this.oscillator.start(0);
    this.oscillator.frequency.value = this.y;
    this.oscillator.connect(this.gainNode);
    // this.distortion.connect(this.gainNode);
    this.gainNode.connect(audioCtx.destination);

    this.pulse = function () {
        _this.gainNode.gain.value = _this.gainNode.gain.value == 0 ? _this.volume : 0;
        _this.color = _this.color == "#9064C3" ? _this.originalColor : "#9064C3";
    };

    this.invertDirection = function () {
        switch (_this.direction) {
            case 0:
                _this.direction = 180;
                break;
            case 90:
                _this.direction = 270;
                break;
            case 180:
                _this.direction = 0;
                break;
            case 270:
                _this.direction = 90;
                break;
        }
    };

    this.forward = function () {
        switch (_this.direction) {
            case 0:
                _this.y = _this.y + _this.speed;
                break;
            case 90:
                _this.x = _this.x + _this.speed;
                break;
            case 180:
                _this.y = _this.y - _this.speed;
                break;
            case 270:
                _this.x = _this.x - _this.speed;
                break;
        }
        _this.checkWall(grid);
        _this.oscillator.frequency.value = _this.y;
        // this.distortion.curve = makeDistortionCurve(this.x);
    };

    this.checkWall = function (canvas) {
        if (_this.x + _this.width > canvas.ctx.canvas.width) {
            _this.x = 0;
        } else if (_this.x < 0) {
            _this.x = canvas.ctx.canvas.width - _this.width;
        } else if (_this.y + _this.height > canvas.ctx.canvas.height) {
            _this.y = 0;
        } else if (_this.y < 0) {
            _this.y = canvas.ctx.canvas.height - _this.height;
        }
    };

    this.changeShape = function (shape) {
        _this.shape = shape;
        _this.oscillator.type = shape;
    };

    this.hasCollided = function (piece) {
        if (piece.on) {
            var r1Top = _this.y,
                r1Right = _this.x + _this.width,
                r1Bottom = _this.y + _this.height,
                r1Left = _this.x;
            var r2Top = piece.y,
                r2Right = piece.x + piece.width,
                r2Bottom = piece.y + piece.height,
                r2Left = piece.x;
            return !(r2Left > r1Right || r2Right < r1Left || r2Top > r1Bottom || r2Bottom < r1Top);
        }
        return false;
    };

    this.collide = function (piece) {
        var precedent = _this.collisionIndex * _this.speed > piece.collisionIndex * piece.speed ? _this : piece;
        precedent.collision();
    };

    this.collision = function (piece) {
        piece.on = false;
    };

    this.drawMe = function () {
        switch (_this.shape) {
            case "sine":
                grid.ctx.beginPath();
                grid.ctx.arc(_this.x + _this.width / 2, _this.y + _this.height / 2, _this.width / 2, 0, 2 * Math.PI, false);
                grid.ctx.fillStyle = _this.color;
                grid.ctx.fill();
                grid.ctx.lineWidth = 1;
                grid.ctx.strokeStyle = _this.color;
                grid.ctx.stroke();
                break;
            case "square":
                grid.ctx.fillStyle = _this.color;
                grid.ctx.fillRect(_this.x, _this.y, _this.width, _this.height);
                break;
            case "triangle":
                grid.ctx.fillStyle = _this.color;
                grid.ctx.beginPath();
                grid.ctx.moveTo(_this.x + _this.width / 2, _this.y);
                grid.ctx.lineTo(_this.x + _this.width, _this.y + _this.height);
                grid.ctx.lineTo(_this.x, _this.y + _this.height);
                grid.ctx.fill();
                break;
            case "sawtooth":
                grid.ctx.fillStyle = _this.color;
                grid.ctx.beginPath();
                grid.ctx.moveTo(_this.x, _this.y);
                grid.ctx.lineTo(_this.x + _this.width / 2, _this.y + _this.height);
                grid.ctx.lineTo(_this.x + _this.width / 2, _this.y);
                grid.ctx.lineTo(_this.x, _this.y);
                grid.ctx.lineTo(_this.x + _this.width / 2, _this.y);
                grid.ctx.lineTo(_this.x + _this.width, _this.y + _this.height);
                grid.ctx.lineTo(_this.x + _this.width, _this.y);
                grid.ctx.lineTo(_this.x, _this.y);
                grid.ctx.fill();
                break;
        }
    };

    this.clearMe = function (grid) {
        grid.ctx.clearRect(_this.x - 1, _this.y - 1, _this.width + 2, _this.height + 2);
    };

    this.control = function () {
        window.onkeydown = function (e) {
            switch (e.keyCode) {
                case 37:
                    _this.direction = 270;
                    break;
                case 38:
                    _this.direction = 180;
                    break;
                case 39:
                    _this.direction = 90;
                    break;
                case 40:
                    _this.direction = 0;
                    break;
            }
        };
        window.ontouchstart = function (e) {
            var startTouchX = e.touches[0].clientX;
            var startTouchY = e.touches[0].clientY;
            window.ontouchmove = function (f) {
                var moveTouchX = f.touches[0].clientX;
                var moveTouchY = f.touches[0].clientY;
                var xDelta = Math.abs(startTouchX - moveTouchX);
                var yDelta = Math.abs(startTouchY - moveTouchY);
                if (xDelta > yDelta) {
                    _this.direction = moveTouchX > startTouchX ? 90 : 270;
                } else {
                    _this.direction = moveTouchY > startTouchY ? 0 : 180;
                }
                f.preventDefault();
            };
        };
    };
};
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sawtooth = function (_GamePiece) {
    _inherits(Sawtooth, _GamePiece);

    function Sawtooth(grid) {
        _classCallCheck(this, Sawtooth);

        var _this = _possibleConstructorReturn(this, (Sawtooth.__proto__ || Object.getPrototypeOf(Sawtooth)).call(this, grid));

        _this.color = "#6C64B9";
        _this.originalColor = '#6C64B9';
        _this.speed = 2;
        _this.harmful = true;
        _this.shape = "sawtooth";
        _this.forward = function () {
            switch (_this.direction) {
                case 0:
                    _this.y = _this.y + _this.speed;
                    break;
                case 90:
                    _this.x = _this.x + _this.speed;
                    break;
                case 180:
                    _this.y = _this.y - _this.speed;
                    break;
                case 270:
                    _this.x = _this.x - _this.speed;
                    break;
            }
            _this.checkWall(grid);
            _this.oscillator.frequency.value = _this.x / 2;
        };
        return _this;
    }

    return Sawtooth;
}(GamePiece);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sine = function (_GamePiece) {
    _inherits(Sine, _GamePiece);

    function Sine(grid) {
        _classCallCheck(this, Sine);

        var _this = _possibleConstructorReturn(this, (Sine.__proto__ || Object.getPrototypeOf(Sine)).call(this, grid));

        _this.speed = 2;
        _this.gainNode.gain.value = 0.025;
        _this.shape = "sine";
        _this.color = "white";
        _this.originalColor = 'white';
        return _this;
    }

    return Sine;
}(GamePiece);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpeedReset = function (_GamePiece) {
    _inherits(SpeedReset, _GamePiece);

    function SpeedReset(grid) {
        _classCallCheck(this, SpeedReset);

        var _this = _possibleConstructorReturn(this, (SpeedReset.__proto__ || Object.getPrototypeOf(SpeedReset)).call(this, grid));

        _this.speed = 8;
        _this.gainNode.gain.value = 0.045;
        _this.shape = "triangle";
        _this.color = "#F012BE";
        _this.originalColor = '#F012BE';
        _this.speedReset = true;
        _this.speed = 8;
        _this.width = 20;
        _this.height = 20;
        return _this;
    }

    return SpeedReset;
}(GamePiece);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Square = function (_GamePiece) {
    _inherits(Square, _GamePiece);

    function Square(grid) {
        _classCallCheck(this, Square);

        var _this = _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).call(this, grid));

        _this.color = "#00ff00";
        _this.originalColor = '#00ff00';
        _this.speed = 8;
        _this.shape = "square";
        _this.oscillator.type = 'square';
        return _this;
    }

    return Square;
}(GamePiece);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Triangle = function (_GamePiece) {
    _inherits(Triangle, _GamePiece);

    function Triangle(grid) {
        _classCallCheck(this, Triangle);

        var _this = _possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, grid));

        _this.color = "#ff0000";
        _this.originalColor = '#ff0000';
        _this.shape = "triangle";
        _this.sizer = 'down';

        return _this;
    }

    return Triangle;
}(GamePiece);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function Grid(canvasElement) {
	var _this = this;

	_classCallCheck(this, Grid);

	this.ctx = canvasElement.getContext('2d');
	this.ctx.canvas.width = window.innerWidth;
	this.ctx.canvas.height = window.innerHeight;

	this.centreSpot = function () {
		var midX = _this.ctx.canvas.width / 2;
		var midY = _this.ctx.canvas.height / 2;
		return { x: midX, y: midY };
	};

	this.randomSpot = function () {
		var randX = Math.floor(Math.random() * _this.ctx.canvas.width + 1);
		var randY = Math.floor(Math.random() * _this.ctx.canvas.height + 1);
		return { x: randX, y: randY };
	};
	this.drawScores = function (x) {
		_this.ctx.clearRect(0, 0, 300, 300);
		_this.ctx.font = "15px Arial";
		_this.ctx.fillText("score: " + x, 10, 20);
		var score = localStorage.highScore != null && parseInt(localStorage.highScore) > x ? localStorage.highScore : x;
		localStorage.highScore = score;
		_this.ctx.fillText("best: " + score, 10, 35);
	};

	this.drawMessage = function (msg) {
		_this.ctx.font = "25px Arial";
		_this.ctx.clearRect(_this.centreSpot().x - 50, _this.centreSpot().y - 50, 150, 50);
		_this.ctx.fillText(msg, _this.centreSpot().x, _this.centreSpot().y);
	};
};
"use strict";

function randomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

var update = function update() {
	if (count % 50 == 0 || count == 1) {
		grid.drawScores(points);
	}
	gamePieces.forEach(function (x) {
		x.clearMe(grid);
		if (x.on) {
			x.forward();
		}
		// if(count%(10-x.speed)===0&&x.harmful){x.pulse()}
		if (x != gamePieces[0] && gamePieces[0].hasCollided(x)) {
			gamePieces[4].on = points % 50 == 0 ? true : false;
			var currentShape = gamePieces[0].shape;
			var currentColor = gamePieces[0].color;
			if (x.harmful) {
				canvas.style["background-color"] = "silver";
				grid.drawMessage("you died!");
				setTimeout(function () {
					return window.location.href = window.location.href;
				}, 3000);
			} else if (x.speedReset) {
				gamePieces[0].speed = gamePieces[0].speed > 8 ? gamePieces[0].speed - randomItem(speeds) : gamePieces[0].speed;
				gamePieces.forEach(function (p, i) {
					if (i != 0) {
						p.invertDirection();
					}
				});
				gamePieces[4].on = false;
				points = points + 20;
			} else {
				points = points + 10;
				grid.drawScores(points);
				if (x.color == "#00ff00") {
					gamePieces[0].height = gamePieces[0].height + 1;
					gamePieces[0].width = gamePieces[0].width + 1;
				} else if (x.color == "#ff0000" && gamePieces[0].height > 5) {
					gamePieces[0].height = gamePieces[0].height - 1;
					gamePieces[0].width = gamePieces[0].width - 1;
				}
				if (count % 2 == 0) {
					gamePieces.push(new Sawtooth(grid));
					gamePieces[gamePieces.length - 1].direction = randomItem(directions);
					gamePieces[gamePieces.length - 1].speed = randomItem(speeds);
				} else {
					gamePieces[0].speed = gamePieces[0].speed + 1;
				}
			}

			gamePieces[0].changeShape(x.shape);
			x.changeShape(currentShape);

			x.x = grid.randomSpot().x;
			x.y = grid.randomSpot().y;
			x.direction = randomItem(directions);
			x.speed = randomItem(speeds);
		}
		if (x.on) {
			x.drawMe(grid);
		}
	});
	count++;
	window.requestAnimationFrame(update);
};

var grid = new Grid(document.getElementById('canvas'));
var gamePieces = new Array();
var directions = [0, 90, 180, 270];
var speeds = [1, 2, 4];
var points = 0,
    count = 0;

gamePieces.push(new Sine(grid));
gamePieces[0].x = grid.centreSpot().x;
gamePieces[0].y = grid.centreSpot().y;
gamePieces[0].control();

gamePieces.push(new Square(grid));
gamePieces.push(new Sawtooth(grid));
gamePieces.push(new Triangle(grid));
gamePieces.push(new SpeedReset(grid));
gamePieces[gamePieces.length - 1].on = false;

gamePieces.filter(function (x, i) {
	return i != 0;
}).forEach(function (x) {
	x.direction = randomItem(directions);
	x.speed = randomItem(speeds);
});

window.requestAnimationFrame(update);