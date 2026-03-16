document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. OVLÁDANIE SLIDEROV (Tlačidlá prev/next) ---
    document.querySelectorAll('.slider-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.target;
            const track = document.querySelector(`.slider-track[data-id="${id}"]`);
            
            // Dynamický výpočet: posunieme o šírku jednej fotky (vrátane medzery)
            const firstSlide = track.querySelector('.slide');
            const scrollAmount = firstSlide ? firstSlide.offsetWidth + 20 : 320;

            if (btn.classList.contains('next')) {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    });

    // --- 2. LIGHTBOX (Dynamický a inteligentný) ---
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    
    const lightboxImg = document.createElement('img');
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.classList.add('close-lightbox');

    lightbox.appendChild(closeBtn);
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    // Delegovanie udalostí: Počúvame na celom dokumente, 
    // takže to funguje aj na fotky vytvorené cyklom
    document.addEventListener('click', (e) => {
        // Otvorenie lightboxu
        const clickedImg = e.target.closest('.slide img');
        if (clickedImg) {
            lightboxImg.src = clickedImg.src;
            lightbox.classList.add('active');
            // Zákaz skrolovania pozadia pri otvorenom lightboxe
            document.body.style.overflow = 'hidden';
        }

        // Zatvorenie lightboxu (klik na krížik alebo mimo fotky)
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // --- 3. SKRYTIE TLAČIDIEL NA KONCI (Bonus pre Wow efekt) ---
    // Ak je užívateľ na konci, tlačidlo "next" môže jemne vyblednúť
    document.querySelectorAll('.slider-track').forEach(track => {
        track.addEventListener('scroll', () => {
            const id = track.dataset.id;
            const prevBtn = document.querySelector(`.slider-btn.prev[data-target="${id}"]`);
            
            if (track.scrollLeft > 10) {
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'all';
            } else {
                prevBtn.style.opacity = '0.3';
                prevBtn.style.pointerEvents = 'none';
            }
        });
    });
});
