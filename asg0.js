// DrawTriangle.js (c) 2012 matsuda
function main() {  
    // Retrieve <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
    }

    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    // Draw a blue rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color
    // Instantiate vector v1 using the Vector3 class
    let v1 = new Vector3([2, 2, 0]); // Set z = 0
    
    // Draw the vector v1 in red
    drawVector(v1, "red");
}

function drawVector(v, color) {
    // Retrieve <canvas> element
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    
    // Scale the vector for better visualization
    const scale = 20;
    
    // Set the drawing color
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    // Draw the vector from the center of the canvas (200, 200)
    ctx.beginPath();
    ctx.moveTo(200, 200); // Canvas center
    ctx.lineTo(200 + v.elements[0] * scale, 200 - v.elements[1] * scale); // Scale vector
    ctx.stroke();
    
}
function handleDrawEvent() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Refill the canvas background
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Read the values of the input fields for v1
    let x = parseFloat(document.getElementById('xCoord').value);
    let y = parseFloat(document.getElementById('yCoord').value);
    
    // Read the values of the input fields for v2
    let x2 = parseFloat(document.getElementById('xCoord2').value);
    let y2 = parseFloat(document.getElementById('yCoord2').value);
    
    // Create vector v1
    let v1 = new Vector3([x, y, 0]);
    let v2 = new Vector3([x2, y2, 0]);

    // Draw the vector in red
    drawVector(v1, "red");
    drawVector(v2, "blue"); // v2 in blue
}

function handleDrawOperationEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Refill the canvas background
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Read the values of the input fields for v1 and v2
    let x = parseFloat(document.getElementById('xCoord').value);
    let y = parseFloat(document.getElementById('yCoord').value);
    let x2 = parseFloat(document.getElementById('xCoord2').value);
    let y2 = parseFloat(document.getElementById('yCoord2').value);
    
    // Create vectors v1 and v2
    let v1 = new Vector3([x, y, 0]);
    let v2 = new Vector3([x2, y2, 0]);
    
    // Draw the vectors
    drawVector(v1, "red");
    drawVector(v2, "blue");
    
    // Get the selected operation
    let operation = document.getElementById("operation").value;
    
    if (operation === "add") {
        // Add v1 and v2
        let v3 = new Vector3(v1.elements).add(v2);
        drawVector(v3, "green");
    } else if (operation === "sub") {
        // Subtract v2 from v1
        let v3 = new Vector3(v1.elements).sub(v2);
        drawVector(v3, "green");
    } else if (operation === "mul") {
        // Multiply v1 and v2 by the scalar
        let scalar = parseFloat(document.getElementById("scalar").value);
        let v3 = new Vector3(v1.elements).mul(scalar);
        let v4 = new Vector3(v2.elements).mul(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (operation === "div") {
        // Divide v1 and v2 by the scalar
        let scalar = parseFloat(document.getElementById("scalar").value);
        if (scalar === 0) {
            console.log("Division by zero is not allowed.");
            return;
        }
        let v3 = new Vector3(v1.elements).div(scalar);
        let v4 = new Vector3(v2.elements).div(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (operation === "magnitude") {
        // Print the magnitude of v1 and v2 to the console
        console.log(`Magnitude of v1: ${v1.magnitude()}`);
        console.log(`Magnitude of v2: ${v2.magnitude()}`);
    } else if (operation === "normalize") {
        // Normalize v1 and v2 and draw them in green
        let v3 = new Vector3(v1.elements).normalize();
        let v4 = new Vector3(v2.elements).normalize();
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (operation === "angle") {
        // Calculate the angle between v1 and v2
        const angle = angleBetween(v1, v2);
        
        if (angle !== null) {
            console.log(`Angle between v1 and v2: ${angle.toFixed(2)} degrees`);
        }
    } else if (operation === "area") {
        // Calculate the area of the triangle formed by v1 and v2
        const area = areaTriangle(v1, v2);
        
        if (area !== null) {
            console.log(`Area of triangle formed by v1 and v2: ${area.toFixed(2)}`);
        }
    }
}

function angleBetween(v1, v2) {
    // Calculate the dot product
    const dotProduct = Vector3.dot(v1, v2);
    
    // Calculate the magnitudes
    const magnitudeV1 = v1.magnitude();
    const magnitudeV2 = v2.magnitude();
    
    if (magnitudeV1 === 0 || magnitudeV2 === 0) {
        console.log("Cannot calculate angle with a zero-magnitude vector.");
        return null;
    }
    
    // Calculate the angle in radians
    const cosTheta = dotProduct / (magnitudeV1 * magnitudeV2);
    
    // Check that cosTheta is in the range [-1, 1]
    const clampedCosTheta = Math.max(-1, Math.min(1, cosTheta));
        
    // Convert angle to degrees
    const angleInDegrees = Math.acos(clampedCosTheta) * (180 / Math.PI);
    
    // Print the angle to the console
    console.log(`Angle between vectors: ${angleInDegrees.toFixed(2)} degrees`);
    
    return angleInDegrees;
}

function areaTriangle(v1, v2) {
    // Compute the cross product
    const crossProduct = Vector3.cross(v1, v2);
    // Compute the magnitude of the cross product
    const magnitude = crossProduct.magnitude();
    // Area is half the magnitude of the cross product
    const area = 0.5 * magnitude;
    
    // Print the area to the console
    console.log(`Area of triangle: ${area.toFixed(2)}`);
    
    return area;

}
