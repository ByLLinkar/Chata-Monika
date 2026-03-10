document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // --- 1. FUNKCIA FILTROVANIA ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Zmena aktívneho tlačidla (vizuálne)
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                // "Wow" efekt: Najprv skryjeme s animáciou
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.5s ease';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 2. MODERNY LIGHTBOX (KLIK NA FOTKU) ---
    // Vytvoríme lightbox dynamicky cez JS, aby si ho nemusel písať do HTML
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        display: none; position: fixed; z-index: 2000; inset: 0;
        background: rgba(0,0,0,0.9); align-items: center; justify-content: center;
        backdrop-filter: blur(8px); cursor: zoom-out;
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = 'max-width: 90%; max-height: 80%; border-radius: 10px; box-shadow: 0 0 30px rgba(0,0,0,0.5);';
    lightbox.appendChild(lightboxImg);

    // Otvorenie lightboxu
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                // Animácia vynorenia
                lightboxImg.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    lightboxImg.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    lightboxImg.style.transform = 'scale(1)';
                }, 50);
            }
        });
    });

    // Zatvorenie lightboxu
    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
});

