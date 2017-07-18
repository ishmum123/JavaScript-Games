window.onload = function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);
	setInterval(game, 1000/15);
}

posX = posY = 10;
scaleFactor = tc = 20;
snakeVelocityX = snakeVelocityY = 0;
appleX = appleY = 15;
trail = [];
tail = 5;
pause = false;

function calculatePositions() {
	posX += snakeVelocityX;
	posY += snakeVelocityY;
	if (posX < 0) posX = tc - 1; 
	if (posX > (tc - 1)) posX = 0; 
	if (posY < 0) posY = tc - 1; 
	if (posY > (tc - 1)) posY = 0; 
}
	
function game() {
	if (!pause) {
		calculatePositions();
		drawBackground();
		drawSnake();
		adjustForAppleCapture();
		drawApple();
	}
}

function adjustForAppleCapture() {
	if (appleX === posX && appleY === posY) {
		tail++;
		appleX = Math.floor(Math.random() * tc);
		appleY = Math.floor(Math.random() * tc);
	}
}

function drawBackground() {
	ctx.fillStyle="black";
	ctx.fillRect(0, 0, canv.width, canv.height);
}

function drawSnake() {
	ctx.fillStyle="lime";
	trail.forEach(function(box) {
		ctx.fillRect(box.x * scaleFactor, box.y * scaleFactor, scaleFactor - 2, scaleFactor - 2);
		if (box.x === posX && box.y === posY) tail = 5; 

	});
	trail.push({x:posX, y:posY});
	while (trail.length > tail) trail.shift(); 
}

function drawApple() {
	ctx.fillStyle="red";
	ctx.fillRect(appleX * scaleFactor, appleY * scaleFactor, scaleFactor - 2, scaleFactor - 2);
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
			pause = !pause;
			console.log(pause);
			break;
	}
}
