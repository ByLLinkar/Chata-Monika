document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. CYKLUS NA VYTVORENIE FOTIEK ---
    const config = [
        { id: 'monika', count: 6, alt: 'Chata Monika' },
        { id: 'cast-a', count: 11,  alt: 'Cast A' },
        { id: 'cast-b', count: 10,  alt: 'Cast B' },
        { id: 'okolie', count: 0,  alt: 'Okolie' }
    ];

    config.forEach(item => {
        const track = document.querySelector(`.slider-track[data-id="${item.id}"]`);
        if (track && item.count > 0) {
            let imagesHtml = '';
            for (let i = 1; i <= item.count; i++) {
                imagesHtml += `
                    <div class="slide">
                        <img src="img/${item.id}-${i}.webp" alt="${item.alt}" loading="lazy">
                    </div>`;
            }
            track.innerHTML = imagesHtml;
        }
    });

    // --- 1. OVLADANIE SLIDEROV (OPRAVENE PRE VIEWPORT) ---
    document.querySelectorAll('.slider-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.target;
            const track = document.querySelector(`.slider-track[data-id="${id}"]`);
            
            if (track) {
                // DOLEZITE: Skrolujeme viewport (rodic tracku), nie track samotny
                const viewport = track.parentElement; 
                const scrollAmount = 320; 

                viewport.scrollBy({ 
                    left: btn.classList.contains('next') ? scrollAmount : -scrollAmount, 
                    behavior: 'smooth' 
                });
            }
        });
    });

    // --- 2. LIGHTBOX ---
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    const lightboxImg = document.createElement('img');
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'close-lightbox';

    lightbox.appendChild(closeBtn);
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    document.addEventListener('click', (e) => {
        const clickedImg = e.target.closest('.slide img');
        if (clickedImg) {
            lightboxImg.src = clickedImg.src;
            lightbox.classList.add('active');
        }
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.classList.remove('active');
        }
    });
});

    // --- 3. MENU (HAMBURGER) ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        const menuIcon = mobileMenu.querySelector('i');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
            });
        });
    }
});
