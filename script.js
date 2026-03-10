document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // --- 1. VYLEPŠENÉ FILTROVANIE ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                // Skrytie položky (nastavíme nulovú priehľadnosť a zmenšenie)
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'inline-block'; // Dôležité pre Masonry
                        // Malé oneskorenie pre "vynorenie"
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300); // Čas animácie schovávania
            });
        });
    });

    // --- 2. LIGHTBOX ---
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        display: none; position: fixed; z-index: 2000; inset: 0;
        background: rgba(0,0,0,0.95); align-items: center; justify-content: center;
        backdrop-filter: blur(10px); cursor: zoom-out;
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = 'max-width: 90%; max-height: 80%; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); transform: scale(0.9); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);';
    lightbox.appendChild(lightboxImg);

    // Otvorenie
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                // "Wow" efekt: spustenie transformácie po vykreslení
                requestAnimationFrame(() => {
                    lightboxImg.style.transform = 'scale(1)';
                });
            }
        });
    });

    // Zatvorenie
    lightbox.addEventListener('click', () => {
        lightboxImg.style.transform = 'scale(0.9)';
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    });
});
