// Select the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Load character and enemy images
const girlImage = new Image();
girlImage.src = 'girl.png'; // Add a simple girl image

const antImage = new Image();
antImage.src = 'ant.png'; // Add a simple ant image

// Girl Character Object
const girl = {
    x: 100,
    y: 400,
    width: 50,
    height: 100,
    speed: 5,
    isGrowing: false,
    growRate: 0.02,
    sizeMultiplier: 1,

    // Draw the girl on the canvas
    draw() {
        ctx.drawImage(girlImage, this.x, this.y, this.width * this.sizeMultiplier, this.height * this.sizeMultiplier);
    },

    // Move the girl based on user input
    move(direction) {
        if (direction === 'left' && this.x > 0) this.x -= this.speed;
        if (direction === 'right' && this.x < canvas.width - this.width * this.sizeMultiplier) this.x += this.speed;
    },

    // Make the girl grow larger
    grow() {
        if (this.sizeMultiplier < 3) {
            this.sizeMultiplier += this.growRate;
        }
    }
};

// Enemy Ant Object
class Ant {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = 30;
        this.height = 30;
        this.speed = Math.random() * 2 + 1;
    }

    // Draw the ant
    draw() {
        ctx.drawImage(antImage, this.x, this.y, this.width, this.height);
    }

    // Move the ant downwards
    move() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.height;
            this.x = Math.random() * canvas.width;
        }
    }
}

// Create multiple ants
let ants = [];
for (let i = 0; i < 5; i++) {
    ants.push(new Ant());
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update the girl
    girl.draw();
    if (girl.isGrowing) {
        girl.grow();
    }

    // Draw and update each ant
    ants.forEach(ant => {
        ant.draw();
        ant.move();

        // Collision detection between girl and ant
        if (girl.x < ant.x + ant.width &&
            girl.x + girl.width * girl.sizeMultiplier > ant.x &&
            girl.y < ant.y + ant.height &&
            girl.y + girl.height * girl.sizeMultiplier > ant.y) {
            console.log('Ant squashed!');
            // Respawn the ant
            ant.y = -ant.height;
            ant.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(gameLoop);
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        girl.move('left');
    } else if (e.code === 'ArrowRight') {
        girl.move('right');
    } else if (e.code === 'Space') {
        girl.isGrowing = true; // Start growing when spacebar is pressed
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        girl.isGrowing = false; // Stop growing when spacebar is released
    }
});

// Start the game loop
gameLoop();
