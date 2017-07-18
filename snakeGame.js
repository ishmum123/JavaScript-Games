window.onload = function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);

	background = new Image("black", 0, 0, canv.width, canv.height);
	headPosX = headPosY = 10;
	tileCount = canv.width / 20;
	scaleFactor = canv.width / tileCount;
	snakeVelocityX = snakeVelocityY = 0;
	appleX = appleY = 15;
	trail = [];
	tail = 5;
	on = true;

	setInterval(game, 1000/15);
}


function calculatePositions() {
	headPosX += snakeVelocityX;
	headPosY += snakeVelocityY;
	if (headPosX < 0) headPosX = tileCount - 1; 
	if (headPosX > (tileCount - 1)) headPosX = 0; 
	if (headPosY < 0) headPosY = tileCount - 1; 
	if (headPosY > (tileCount - 1)) headPosY = 0; 
}
	
function game() {
	if (on) {
		calculatePositions();
		var apple = new Image("red", getPos(appleX), getPos(appleY), (scaleFactor - 4), (scaleFactor - 4));
		drawImage(background);
		drawSnake();
		adjustForAppleCapture();
		drawImage(apple);
	}
}

function adjustForAppleCapture() {
	if (appleX === headPosX && appleY === headPosY) {
		tail++;
		appleX = Math.floor(Math.random() * tileCount);
		appleY = Math.floor(Math.random() * tileCount);
	}
}

function drawSnake() {
	trail.forEach(function(box) {
		var boxImage = new Image("lime", getPos(box.x), getPos(box.y), (scaleFactor - 4), (scaleFactor - 4));
		drawImage(boxImage);
		if (box.x === headPosX && box.y === headPosY) tail = 5; 
	});
	trail.push({x:headPosX, y:headPosY});
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
