// Game settings
const gridSize = 20;
let tileCount;

// DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gameOverDiv = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

// Game state
let snake = [{ x: 10, y: 10 }];
let velocity = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gameLoop;

// Initialize
tileCount = canvas.width / gridSize;
highScoreElement.textContent = highScore;

// Draw functions
function drawSnake() {
    ctx.fillStyle = '#10b981';
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 2;
    
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Head with gradient effect
            ctx.fillStyle = '#34d399';
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
            ctx.fillStyle = '#10b981';
        } else {
            ctx.fillStyle = '#10b981';
        }
        
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
    
    // Add shine effect
    ctx.fillStyle = '#fca5a5';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2 - 3,
        food.y * gridSize + gridSize / 2 - 3,
        gridSize / 6,
        0,
        2 * Math.PI
    );
    ctx.fill();
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    
    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

function moveSnake() {
    // Don't move if velocity is zero (player hasn't pressed a key yet)
    if (velocity.x === 0 && velocity.y === 0) {
        return;
    }

    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }

    // Check self collision (only check body, skip the current head)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    startBtn.disabled = false;
    startBtn.textContent = 'Bắt đầu';
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    
    finalScoreElement.textContent = score;
    gameOverDiv.classList.remove('hidden');
    gameOverDiv.classList.add('game-over');
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    velocity = { x: 0, y: 0 };
    score = 0;
    scoreElement.textContent = score;
    generateFood();
    gameOverDiv.classList.add('hidden');
    gameOverDiv.classList.remove('game-over');
}

function gameStep() {
    if (!gameRunning) return;

    // Clear canvas
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }

    moveSnake();
    drawFood();
    drawSnake();
}

// Controls
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    switch(e.key) {
        case 'ArrowUp':
            if (velocity.y !== 1) velocity = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (velocity.y !== -1) velocity = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (velocity.x !== 1) velocity = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (velocity.x !== -1) velocity = { x: 1, y: 0 };
            break;
    }
});

// Start button
startBtn.addEventListener('click', () => {
    resetGame();
    gameRunning = true;
    startBtn.textContent = 'Đang chơi...';
    startBtn.disabled = true;
    
    gameLoop = setInterval(() => {
        gameStep();
    }, 100);
});

// Restart button
restartBtn.addEventListener('click', () => {
    resetGame();
    gameRunning = true;
    startBtn.textContent = 'Đang chơi...';
    startBtn.disabled = true;
    
    gameLoop = setInterval(() => {
        gameStep();
    }, 100);
});

// Initial draw
ctx.fillStyle = '#1f2937';
ctx.fillRect(0, 0, canvas.width, canvas.height);
drawSnake();
drawFood();

// Prevent arrow keys from scrolling the page
window.addEventListener('keydown', (e) => {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
});

