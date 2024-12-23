const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ripples = [];

canvas.addEventListener('mousemove', createRipple);
canvas.addEventListener('click', createRipple);

function createRipple(event) {
    const x = event.clientX;
    const y = event.clientY;
    const ripple = {
        x: x,
        y: y,
        radius: 0,
        alpha: 1
    };
    ripples.push(ripple);
}

function drawRipples() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < ripples.length; i++) {
        const ripple = ripples[i];
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = `rgba(0, 0, 255, ${ripple.alpha})`;
        ctx.stroke();
        ripple.radius += 2;
        ripple.alpha -= 0.01;
        if (ripple.alpha <= 0) {
            ripples.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(drawRipples);
}

drawRipples();