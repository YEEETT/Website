const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const mouse = {
    x: 0,
    y: 0,
};

const particles = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = ctx.fillStyle;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        particles[i].x += Math.random() + particles[i].vx;
        particles[i].y += Math.random() + particles[i].vy;
        if (particles[i].x > canvas.width) particles[i].x = 0;
        if (particles[i].x < 0) particles[i].x = canvas.width;
        if (particles[i].y > canvas.height) particles[i].y = 0;
        if (particles[i].y < 0) particles[i].y = canvas.height;
    }
    requestAnimationFrame(this.draw);
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i <= canvas.width; i += canvas.width / 8) {
        for (let j = 0; j <= canvas.height; j += canvas.height / 6) {
            particles.push({
                x: i,
                y: j,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1
            });
        }
    }
    draw();
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

init();

document.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', (event) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
