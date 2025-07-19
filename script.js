class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // Game state
        this.snake = [{ x: 10, y: 10 }];
        this.food = this.generateFood();
        this.direction = { x: 0, y: 0 };
        this.score = 0;
        this.gameRunning = false;
        this.gameLoop = null;
        
        // Get high score from localStorage
        this.highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
        
        // Bind methods
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleControlClick = this.handleControlClick.bind(this);
        this.update = this.update.bind(this);
        this.startGame = this.startGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        document.addEventListener('keydown', this.handleKeyPress);
        document.getElementById('startBtn').addEventListener('click', this.startGame);
        document.getElementById('restartBtn').addEventListener('click', this.restartGame);
        
        // Mobile controls
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', this.handleControlClick);
        });
        
        // Update UI
        this.updateScore();
        this.updateHighScore();
        
        // Draw initial state
        this.draw();
    }
    
    generateFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        
        return food;
    }
    
    handleKeyPress(event) {
        if (!this.gameRunning) return;
        
        const key = event.key.toLowerCase();
        
        // Prevent reverse direction
        switch (key) {
            case 'arrowup':
            case 'w':
                if (this.direction.y === 0) this.direction = { x: 0, y: -1 };
                break;
            case 'arrowdown':
            case 's':
                if (this.direction.y === 0) this.direction = { x: 0, y: 1 };
                break;
            case 'arrowleft':
            case 'a':
                if (this.direction.x === 0) this.direction = { x: -1, y: 0 };
                break;
            case 'arrowright':
            case 'd':
                if (this.direction.x === 0) this.direction = { x: 1, y: 0 };
                break;
        }
    }
    
    handleControlClick(event) {
        if (!this.gameRunning) return;
        
        const direction = event.target.dataset.direction;
        
        switch (direction) {
            case 'up':
                if (this.direction.y === 0) this.direction = { x: 0, y: -1 };
                break;
            case 'down':
                if (this.direction.y === 0) this.direction = { x: 0, y: 1 };
                break;
            case 'left':
                if (this.direction.x === 0) this.direction = { x: -1, y: 0 };
                break;
            case 'right':
                if (this.direction.x === 0) this.direction = { x: 1, y: 0 };
                break;
        }
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // Don't move if no direction is set yet
        if (this.direction.x === 0 && this.direction.y === 0) {
            this.draw();
            return;
        }
        
        // Move snake
        const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.food = this.generateFood();
            
            // Add particle effect for food eaten
            this.createParticles(head.x * this.gridSize + this.gridSize / 2, 
                               head.y * this.gridSize + this.gridSize / 2);
        } else {
            this.snake.pop();
        }
        
        this.draw();
    }
    
    createParticles(x, y) {
        // Simple retro particle effect - white squares
        const particles = [];
        for (let i = 0; i < 6; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1.0,
                size: Math.random() * 3 + 1
            });
        }
        
        const animateParticles = () => {
            this.ctx.save();
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= 0.08;
                
                if (particle.life > 0) {
                    this.ctx.globalAlpha = particle.life;
                    this.ctx.fillStyle = '#ffffff';
                    this.ctx.fillRect(
                        particle.x - particle.size/2, 
                        particle.y - particle.size/2, 
                        particle.size, 
                        particle.size
                    );
                } else {
                    particles.splice(index, 1);
                }
            });
            this.ctx.restore();
            
            if (particles.length > 0) {
                requestAnimationFrame(animateParticles);
            }
        };
        
        animateParticles();
    }
    
    draw() {
        // Clear canvas with black background
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw retro grid
        this.ctx.strokeStyle = '#333333';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
        
        // Draw snake in retro style
        this.snake.forEach((segment, index) => {
            const x = segment.x * this.gridSize;
            const y = segment.y * this.gridSize;
            
            if (index === 0) {
                // Snake head - bright white with pixelated style
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(x + 1, y + 1, this.gridSize - 2, this.gridSize - 2);
                
                // Add simple retro eyes
                this.ctx.fillStyle = '#000000';
                this.ctx.fillRect(x + 4, y + 4, 2, 2);
                this.ctx.fillRect(x + 14, y + 4, 2, 2);
            } else {
                // Snake body - white with border
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
                
                // Add inner black border for retro effect
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x + 3, y + 3, this.gridSize - 6, this.gridSize - 6);
            }
        });
        
        // Draw food in retro style - blinking white square
        const time = Date.now();
        const blink = Math.floor(time / 250) % 2; // Blink every 250ms
        
        if (blink) {
            this.ctx.fillStyle = '#ffffff';
        } else {
            this.ctx.fillStyle = '#cccccc';
        }
        
        const foodX = this.food.x * this.gridSize;
        const foodY = this.food.y * this.gridSize;
        
        this.ctx.fillRect(foodX + 3, foodY + 3, this.gridSize - 6, this.gridSize - 6);
        
        // Add border to food
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(foodX + 3, foodY + 3, this.gridSize - 6, this.gridSize - 6);
    }
    
    startGame() {
        this.gameRunning = true;
        document.getElementById('startScreen').classList.add('hidden');
        
        // Start the game loop
        this.gameLoop = setInterval(this.update, 150);
    }
    
    gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameLoop);
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore.toString());
            this.updateHighScore();
        }
        
        // Show game over screen
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOver').classList.remove('hidden');
    }
    
    restartGame() {
        // Reset game state
        this.snake = [{ x: 10, y: 10 }];
        this.food = this.generateFood();
        this.direction = { x: 0, y: 0 };
        this.score = 0;
        this.updateScore();
        
        // Hide game over screen and start new game
        document.getElementById('gameOver').classList.add('hidden');
        this.startGame();
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
    
    updateHighScore() {
        document.getElementById('highScore').textContent = this.highScore;
    }
}

// Add roundRect method if not supported
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.arcTo(x + width, y, x + width, y + height, radius);
        this.arcTo(x + width, y + height, x, y + height, radius);
        this.arcTo(x, y + height, x, y, radius);
        this.arcTo(x, y, x + width, y, radius);
        this.closePath();
    };
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});
