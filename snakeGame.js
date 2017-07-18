window.onload = function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);

	background = new Image("black", 0, 0, canv.width, canv.height);
	posX = posY = 10;
	scaleFactor = tc = 20;
	snakeVelocityX = snakeVelocityY = 0;
	appleX = appleY = 15;
	trail = [];
	tail = 5;
	on = true;

	setInterval(game, 1000/15);
}


function calculatePositions() {
	posX += snakeVelocityX;
	posY += snakeVelocityY;
	if (posX < 0) posX = tc - 1; 
	if (posX > (tc - 1)) posX = 0; 
	if (posY < 0) posY = tc - 1; 
	if (posY > (tc - 1)) posY = 0; 
}
	
function game() {
	if (on) {
		calculatePositions();
		var apple = new Image("red", (appleX * scaleFactor), (appleY * scaleFactor), (scaleFactor - 4), (scaleFactor - 4));
		drawImage(background);
		drawSnake();
		adjustForAppleCapture();
		drawImage(apple);
	}
}

function adjustForAppleCapture() {
	if (appleX === posX && appleY === posY) {
		tail++;
		appleX = Math.floor(Math.random() * tc);
		appleY = Math.floor(Math.random() * tc);
	}
}

function drawSnake() {
	trail.forEach(function(box) {
		var boxImage = new Image("lime", (box.x * scaleFactor), (box.y * scaleFactor), (scaleFactor - 4), (scaleFactor - 4));
		drawImage(boxImage);
		if (box.x === posX && box.y === posY) tail = 5; 
	});
	trail.push({x:posX, y:posY});
	while (trail.length > tail) trail.shift(); 
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

function keyPush(evt) {
	switch (evt.keyCode) {
		case 37:
			snakeVelocityX = -1; snakeVelocityY = 0;
			break;
		case 38:
			snakeVelocityX = 0; snakeVelocityY = -1;
			break;
		case 39:
			snakeVelocityX = 1; snakeVelocityY = 0;
			break;
		case 40:
			snakeVelocityX = 0; snakeVelocityY = 1;
			break;
		case 27:
			on = !on;
			break;
	}
}
