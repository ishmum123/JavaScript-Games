function startGame(canv, scoreboard) {
	const ctx = canv.getContext("2d");
	const background = new Image("black", 0, 0, canv.width, canv.height);
	const snake = getSnake();
	const numTiles = canv.width / 20;
	const scaleFactor = 20;
	const apple = { x: 15, y: 15 };
	const gameStatus = { 
		on: true,
		score: 0
	};
	
	document.addEventListener("keydown", function(evt) {keyPush(evt, snake.speed, gameStatus)});
	setInterval(function() {game(numTiles, apple, background, gameStatus, ctx, scaleFactor, snake, scoreboard)}, 1000/15);
}

function getSnake() {
	return {
		head: { x: 10, y: 10 },
		speed: { x: 0, y: 0 },
		size: 5,
		body: []
	};
}

function calculatePositions(speed, position, numTiles) {
	position.x += speed.x;
	position.y += speed.y;
	if (position.x < 0) position.x = numTiles - 1; 
	if (position.x > (numTiles - 1)) position.x = 0; 
	if (position.y < 0) position.y = numTiles - 1; 
	if (position.y > (numTiles - 1)) position.y = 0; 
}
	
function game(numTiles, apple, background, gameStatus, context, scaleFactor, snake, scoreboard) {
	var position = snake.head;
	var boxSize = scaleFactor - 4;
	if (gameStatus.on) {
		calculatePositions(snake.speed, position, numTiles);
		var myApple = new Image("white", (apple.x * scaleFactor), (apple.y * scaleFactor), boxSize, boxSize);
		drawImage(background, context);
		drawSnake(position, context, scaleFactor, snake.body, snake, gameStatus);
		adjustForAppleCapture(apple, position, numTiles, snake, gameStatus);
		drawImage(myApple, context);
	}

	var ctxs = scoreboard.getContext("2d");
	ctxs.font = "25px Courier New";
	ctxs.clearRect(0, 0, scoreboard.width, scoreboard.height);
	ctxs.fillText(gameStatus.score, 0, 18);
}

function adjustForAppleCapture(apple, headPosition, numTiles, snake, gameStatus) {
	if (apple.x === headPosition.x && apple.y === headPosition.y) {
		snake.size++;
		gameStatus.score++;
		apple.x = Math.floor(Math.random() * numTiles);
		apple.y = Math.floor(Math.random() * numTiles);
	}
}

function drawSnake(position, context, scaleFactor, body, snake, gameStatus) {
	var boxSize = scaleFactor - 4;
	body.forEach(function(part) {
		drawImage(part.image, context);
		if (part.x === position.x && part.y === position.y) {
			snake.size = 5;
			gameStatus.score = 0;
		}
	});
	body.push( {
		x: position.x, 
		y: position.y,
		image: new Image("white", (position.x * scaleFactor), (position.y * scaleFactor), boxSize, boxSize)
	});
	while (body.length > snake.size) body.shift(); 
}

function drawImage(image, context) {
	context.fillStyle = image.colour;
	context.fillRect(image.posX, image.posY, image.height, image.width);
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

function keyPush(evt, snakeSpeed, gameStatus) {
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
			gameStatus.on = !gameStatus.on;
			break;
	}
}
