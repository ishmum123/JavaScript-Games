function startGame() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");

	background = new Image("black", 0, 0, canv.width, canv.height);
	var headPosition = {
		x: 10,
		y: 10
	};
	var numTiles = canv.width / 20;
	scaleFactor = canv.width / numTiles;
	var snakeSpeed = {
		x: 0,
		y: 0
	};
	var apple = {
		x: 15,
		y: 15
	};
	trail = [];
	tail = 5;
	on = true;

	document.addEventListener("keydown", function(evt) {keyPush(evt, snakeSpeed)});
	setInterval(function() {game(numTiles, snakeSpeed, headPosition, apple)}, 1000/15);
}

function calculatePositions(speed, position, numTiles) {
	position.x += speed.x;
	position.y += speed.y;
	if (position.x < 0) position.x = numTiles - 1; 
	if (position.x > (numTiles - 1)) position.x = 0; 
	if (position.y < 0) position.y = numTiles - 1; 
	if (position.y > (numTiles - 1)) position.y = 0; 
}
	
function game(numTiles, speed, position, apple) {
	if (on) {
		calculatePositions(speed, position, numTiles);
		var myApple = new Image("red", getPos(apple.x), getPos(apple.y), (scaleFactor - 4), (scaleFactor - 4));
		drawImage(background);
		drawSnake(position);
		adjustForAppleCapture(apple, position, numTiles);
		drawImage(myApple);
	}
}

function adjustForAppleCapture(apple, headPosition, numTiles) {
	if (apple.x === headPosition.x && apple.y === headPosition.y) {
		tail++;
		apple.x = Math.floor(Math.random() * numTiles);
		apple.y = Math.floor(Math.random() * numTiles);
	}
}

function drawSnake(position) {
	trail.forEach(function(box) {
		var boxImage = new Image("lime", getPos(box.x), getPos(box.y), (scaleFactor - 4), (scaleFactor - 4));
		drawImage(boxImage);
		if (box.x === position.x && box.y === position.y) tail = 5; 
	});
	trail.push({x:position.x, y:position.y});
	while (trail.length > tail) trail.shift(); 
}

function getPos(value) {
	return value * scaleFactor;
}

function drawImage(Image) {
	ctx.fillStyle = Image.colour;
	ctx.fillRect(Image.posX, Image.posY, Image.height, Image.width);
}

function Image(colour, posX, posY, height, width) {
	return {
		colour: colour,
		posX: posX,
		posY: posY,
		height: height,
		width: width,
	};
}

function keyPush(evt, snakeSpeed) {
	switch (evt.keyCode) {
		case 37:
			if (snakeSpeed.x !== 1) {
				snakeSpeed.x = -1; 
				snakeSpeed.y = 0;
			}
			break;
		case 38:
			if (snakeSpeed.y !== 1) {
				snakeSpeed.x = 0; 
				snakeSpeed.y = -1;
			}
			break;
		case 39:
			if (snakeSpeed.x !== -1) {
				snakeSpeed.x = 1; 
				snakeSpeed.y = 0;
			}
			break;
		case 40:
			if (snakeSpeed.y !== -1) {
				snakeSpeed.x = 0; 
				snakeSpeed.y = 1;
			}
			break;
		case 27:
			on = !on;
			break;
	}

	return {
		speedX: snakeSpeed.x,
		speedY: snakeSpeed.y
	};
}
