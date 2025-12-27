const cards = document.querySelectorAll('.float');

cards.forEach((card, index) => {
    card.style.animation = `float ${4 + index}s ease-in-out infinite`;
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 80) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Mouse parallax for floating shapes
document.addEventListener('mousemove', e => {
    const shapes = document.querySelectorAll('.float-shape');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    shapes.forEach(shape => {
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

const hero = document.querySelector('.hero-content');

document.addEventListener('mousemove', e => {
    if (!hero) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 6;
    const y = (e.clientY / window.innerHeight - 0.5) * 6;

    hero.style.transform = `translate(${x}px, ${y}px)`;
});

// Hover Effect for Technical Specification bars
document.querySelectorAll('.spec-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.fill').style.background = '#4f46e5';
    });
    item.addEventListener('mouseleave', () => {
        item.querySelector('.fill').style.background = '#121212';
    });
});

// Parallax effect for the background elements
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.hero-main').style.transform = `translate(${moveX}px, ${moveY}px)`;
});

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Animate Skill Bars
            const fills = entry.target.querySelectorAll('.meter-fill');
            fills.forEach(fill => fill.style.transform = 'scaleX(1)');
        }
    });
}, observerOptions);

document.querySelectorAll('.about-container').forEach(el => observer.observe(el));

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Active button toggle
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        const projects = document.querySelectorAll('.project-card');

        projects.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 400);
            }
        });
    });
});
const canvas = document.getElementById('structural-nodes');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 60;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 1.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = 'rgba(79, 70, 229, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(79, 70, 229, ${1 - distance/150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter cards
        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});