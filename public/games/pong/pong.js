// Define canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'white';
ctx.fillStyle = 'white';

// Define constants
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const centerLineWidth = 5;
const centerLineX = (canvasWidth / 2) - 1;
const paddleWidth = 5;
const paddleHeight = 30;
const paddleSpeed = 2;
const ballSize = 5;
const ballSpeed = 2;

// Define variables
let playerPaddleY = (canvasHeight - paddleHeight) / 2;
let opponentPaddleY = (canvasHeight - paddleHeight) / 2;
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;

function createBackground(){
	// Dashed line
	ctx.beginPath();
	ctx.setLineDash([5, 5]);
	ctx.moveTo(canvasWidth / 2, 0);
	ctx.lineTo(canvasWidth / 2, canvasHeight);
	ctx.stroke();
}

// Event listener for mouse movement
canvas.addEventListener('mousemove', (e) => {
	const canvasRect = canvas.getBoundingClientRect();
	const offsetY = e.clientY - canvasRect.top;
	const normalizedY = offsetY / canvasRect.height; // Normalize mouse position

	playerPaddleY = (canvasHeight - paddleHeight) * normalizedY;

	// Ensure the paddle stays within the vertical boundaries
	if (playerPaddleY < 0) {
		playerPaddleY = 0;
	} else if (playerPaddleY + paddleHeight > canvasHeight) {
		playerPaddleY = canvasHeight - paddleHeight;
	}
});

// Update function
function update() {
	// Move the opponent paddle towards the ball
	if (opponentPaddleY + (paddleHeight / 2) < ballY) {
		opponentPaddleY += paddleSpeed;
	} else {
		opponentPaddleY -= paddleSpeed;
	}

	// Update ball position
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// Bounce ball off top and bottom walls
	if (ballY < 0 || ballY > canvasHeight - ballSize) {
		ballSpeedY = -ballSpeedY;
	}

	// Check if ball collides with player paddle
	if (ballX < paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
		ballSpeedX = -ballSpeedX;
	}

	// Check if ball collides with opponent paddle
	if (ballX > canvasWidth - paddleWidth - ballSize && ballY > opponentPaddleY && ballY < opponentPaddleY + paddleHeight) {
		ballSpeedX = -ballSpeedX;
	}

	// Reset ball if it goes off left or right edge of screen
	if (ballX < 0 || ballX > canvasWidth) {
		ballX = canvasWidth / 2;
		ballY = canvasHeight / 2;
		ballSpeedX = ballSpeed;
		ballSpeedY = ballSpeed;
	}
}

// Render function
function render() {
	// Clear canvas
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	// Draw background
	createBackground();

	// Draw player paddle
	ctx.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);

	// Draw opponent paddle
	ctx.fillRect(canvasWidth - paddleWidth, opponentPaddleY, paddleWidth, paddleHeight);

	// Draw ball
	ctx.fillRect(ballX - (ballSize / 2), ballY - (ballSize / 2), ballSize, ballSize);
}



// Game loop
function gameLoop() {
	update();
	render();
	requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();