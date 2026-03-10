document.addEventListener('DOMContentLoaded', () => {
    // 1. Lightbox vytvoríme raz a používame ho stále
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    // 2. Kliknutie na akúkoľvek fotku
    document.querySelectorAll('.slide img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.innerHTML = `<img src="${img.src}"><button class="close">&times;</button>`;
            lightbox.classList.add('active');
        });
    });

    // 3. Zatvorenie
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox || e.target.classList.contains('close')) {
            lightbox.classList.remove('active');
        }
    });
});
