// Heart curve: (x^2 + y^2 - 1)^3 = x^2 * y^3
// This is an implicit equation, so we'll use parametric approach

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// High quality rendering settings
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

// Canvas dimensions
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

// Scale factor to fit the heart nicely in the canvas
const scale = 200;

// Clear canvas with white background
function clearCanvas() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
}

// Generate points for the heart curve using parametric equations
// For the curve (x^2 + y^2 - 1)^3 = x^2 * y^3
// We can use: x = sin(t)^3, y = (13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t))/16
function generateHeartPoints(numPoints = 1000) {
    const points = [];
    
    for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * 2 * Math.PI;
        
        // Parametric equations for heart curve
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        
        points.push({ x, y });
    }
    
    return points;
}

// Animation variables
let currentPoint = 0;
const points = generateHeartPoints(1000);
let animationSpeed = 2; // points to draw per frame

// Draw function with animation
function drawHeart() {
    if (currentPoint === 0) {
        clearCanvas();
        
        // Setup drawing style
        ctx.strokeStyle = '#ff0000'; // Red color
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Begin path
        ctx.beginPath();
    }
    
    // Draw next segment
    if (currentPoint < points.length) {
        const point = points[currentPoint];
        
        // Transform coordinates to canvas space
        const canvasX = centerX + point.x * scale / 16;
        const canvasY = centerY - point.y * scale / 16; // Invert Y axis
        
        if (currentPoint === 0) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
        
        ctx.stroke();
        
        currentPoint += animationSpeed;
        
        // Continue animation
        requestAnimationFrame(drawHeart);
    } else {
        // Animation complete, restart after a delay
        setTimeout(() => {
            currentPoint = 0;
            requestAnimationFrame(drawHeart);
        }, 2000);
    }
}

// Start the animation
drawHeart();
