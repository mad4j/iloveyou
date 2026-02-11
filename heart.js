// Heart curve based on the function (x^2 + y^2 - 1)^3 = x^2 * y^3
// Using parametric equations for a heart shape: x = sin(t)^3, y = (13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t))/16

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { alpha: false });

// High quality rendering settings with antialiasing
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

// Canvas dimensions
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

// Scale factor to fit the heart nicely in the canvas
const scale = 180;

// Clear canvas with white background
function clearCanvas() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
}

// Generate points for the heart curve
// Parametric form: x = sin(t)^3, y = (13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t))/16
function generateHeartPoints(numPoints = 1000) {
    const points = [];
    
    for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * 2 * Math.PI;
        
        // Parametric equations for heart curve
        const x = Math.pow(Math.sin(t), 3);
        const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
        
        points.push({ x, y });
    }
    
    return points;
}

// Animation variables
let currentPoint = 0;
const points = generateHeartPoints(1000);
let pointsPerFrame = 2; // number of points to draw per frame

// Draw function with animation
function drawHeart() {
    if (currentPoint === 0) {
        clearCanvas();
        
        // Setup drawing style with improved antialiasing
        ctx.strokeStyle = '#ff0000'; // Red color
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Enable antialiasing for smoother lines
        ctx.globalCompositeOperation = 'source-over';
        
        // Begin path
        ctx.beginPath();
    }
    
    // Draw next segment
    if (currentPoint < points.length) {
        const point = points[currentPoint];
        
        // Transform coordinates to canvas space
        const canvasX = centerX + point.x * scale;
        const canvasY = centerY - point.y * scale; // Invert Y axis
        
        if (currentPoint === 0) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
        
        ctx.stroke();
        
        currentPoint = Math.floor(currentPoint + pointsPerFrame);
        
        // Continue animation
        requestAnimationFrame(drawHeart);
    }
    // Animation complete - do not restart
}

// Start the animation
drawHeart();
