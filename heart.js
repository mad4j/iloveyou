// Heart curve based on the function (x^2 + y^2 - 1)^3 = x^2 * y^3
// Using parametric equations for a heart shape: x = sin(t)^3, y = (13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t))/16

const svg = document.getElementById('svg-container');

// SVG dimensions
const width = 800;
const height = 800;
const centerX = width / 2;
const centerY = height / 2;

// Scale factor to fit the heart nicely in the SVG
const scale = 180;

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

// Create SVG path element
const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
pathElement.setAttribute('stroke', '#ff0000'); // Red color
pathElement.setAttribute('stroke-width', '3');
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
        requestAnimationFrame(drawHeart);
    }
    // Animation complete - do not restart
}

// Start the animation
drawHeart();
