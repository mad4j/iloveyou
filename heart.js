// Heart curve based on the function (x^2 + y^2 - 1)^3 = x^2 * y^3
// Using parametric equations for a heart shape: x = sin(t)^3, y = (13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t))/16

const svg = document.getElementById('svg-container');
const backgroundRect = document.getElementById('background-rect');

// SVG dimensions - calculated from window size
let width, height, centerX, centerY, scale, strokeWidth;

function updateDimensions() {
    // Use window dimensions for the SVG
    width = window.innerWidth;
    height = window.innerHeight;
    
    // Update SVG dimensions
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    backgroundRect.setAttribute('width', width);
    backgroundRect.setAttribute('height', height);
    
    centerX = width / 2;
    centerY = height / 2;
    
    // Scale factor to fit the heart nicely in the SVG - based on smaller dimension
    const minDimension = Math.min(width, height);
    scale = minDimension * 0.40; // 40% of the smaller dimension
    
    // Responsive stroke width based on viewport size
    strokeWidth = Math.max(2, minDimension * 0.005); // 0.5% of smaller dimension, minimum 2px
}

// Initialize dimensions
updateDimensions();

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
let pathData = ''; // Accumulated path data
let animationId = null; // To track animation frame

// Create SVG path element
const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
pathElement.setAttribute('stroke', '#666666'); // Gray color
pathElement.setAttribute('stroke-linecap', 'round');
pathElement.setAttribute('stroke-linejoin', 'round');
pathElement.setAttribute('fill', 'none');
svg.appendChild(pathElement);

// Draw function with animation
function drawHeart() {
    // Draw next segment
    if (currentPoint < points.length) {
        // Append only new points to path data
        const endPoint = Math.min(currentPoint + pointsPerFrame, points.length);
        for (let i = currentPoint; i < endPoint; i++) {
            const point = points[i];
            
            // Transform coordinates to SVG space
            const svgX = centerX + point.x * scale;
            const svgY = centerY - point.y * scale; // Invert Y axis
            
            if (i === 0) {
                pathData += `M ${svgX} ${svgY} `;
            } else {
                pathData += `L ${svgX} ${svgY} `;
            }
        }
        
        pathElement.setAttribute('d', pathData);
        
        currentPoint = endPoint;
        
        // Continue animation
        animationId = requestAnimationFrame(drawHeart);
    }
    // Animation complete - do not restart
}

// Reset and restart animation
function restartAnimation() {
    // Cancel any ongoing animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Reset animation state
    currentPoint = 0;
    pathData = '';
    pathElement.setAttribute('d', '');
    
    // Update dimensions
    updateDimensions();
    
    // Update stroke width
    pathElement.setAttribute('stroke-width', strokeWidth);
    
    // Start animation
    drawHeart();
}

// Handle window resize
window.addEventListener('resize', restartAnimation);

// Set initial stroke width
pathElement.setAttribute('stroke-width', strokeWidth);

// Start the animation
drawHeart();
