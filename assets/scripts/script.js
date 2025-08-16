const curves = [
    { path: document.getElementById('curve-right'), angle: 0, step: 0.02, amplitude: 8, dir: 1 },
    { path: document.getElementById('curve-left'), angle: 0, step: 0.018, amplitude: 6, dir: -1 }
];

function animateCurves() {
    curves.forEach(curve => {
        curve.angle += curve.step;
        const offset = Math.sin(curve.angle) * curve.amplitude;

        if (curve.path.id === 'curve-right') {
            curve.path.setAttribute('d', `M90 90 C60 ${40 + offset}, 40 ${10 + offset}, 10 0`);
        } else {
            curve.path.setAttribute('d', `M10 90 C40 ${40 + offset}, 60 ${10 + offset}, 90 0`);
        }
    });

    requestAnimationFrame(animateCurves);
}

animateCurves();

const circles = [
    { el: document.querySelector('.bottom-right-circle'), amplitude: 16, step: 0.01, phase: 0 },
    { el: document.querySelector('.bottom-left-circle'), amplitude: 15, step: 0.008, phase: Math.PI / 2 }
];

function animateCircles() {
    circles.forEach(c => {
        c.phase += c.step;
        const offset = Math.sin(c.phase) * c.amplitude;
        c.el.style.transform = `translateY(${offset}px)`;
    });
    requestAnimationFrame(animateCircles);
}

animateCircles();

document.addEventListener('DOMContentLoaded', () => {
    // Select all sections with a "data-animate-container" attribute
    const sections = document.querySelectorAll("[data-animate-container]");

    sections.forEach(section => {
        const animatedElements = section.querySelectorAll("[data-animate]");

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Stagger animation in
                        animatedElements.forEach((el, i) => {
                            setTimeout(() => el.classList.add("show"), i * 100);
                        });
                    } else {
                        // Reset animation when leaving viewport
                        animatedElements.forEach(el => el.classList.remove("show"));
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(section);
    });
});