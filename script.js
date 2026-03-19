document.addEventListener('DOMContentLoaded', () => {

    // --- 0. CONFIG ---
    const config = [
        { id: 'monika', count: 6, alt: 'Chata Monika' },
        { id: 'cast-a', count: 11, alt: 'Časť A' },
        { id: 'cast-b', count: 10, alt: 'Časť B' },
        { id: 'okolie', count: 1, alt: 'Okolie' }
    ];


    // --- 1. RENDER FOTIEK ---
    config.forEach(item => {

        const track = document.querySelector(`.slider-track[data-id="${item.id}"]`);

        if (track && item.count > 0) {

            const fragment = document.createDocumentFragment();

            for (let i = 1; i <= item.count; i++) {

                const slide = document.createElement('div');
                slide.className = 'slide';

                const img = document.createElement('img');
                img.src = `img/${item.id}-${i}.webp`;
                img.alt = `${item.alt} ${i}`;
                img.loading = 'lazy';

                img.onerror = () => slide.style.display = 'none';

                slide.appendChild(img);
                fragment.appendChild(slide);
            }

            track.replaceChildren(fragment);
        }

    });


    // --- 2. SLIDER BUTTONS ---
    document.querySelectorAll('.slider-btn').forEach(btn => {

        btn.addEventListener('click', () => {

            const id = btn.dataset.target;
            const track = document.querySelector(`.slider-track[data-id="${id}"]`);

            if (!track) return;

            const viewport = track.parentElement;

            const firstSlide = track.querySelector('.slide');
            const gap = parseInt(getComputedStyle(track).gap) || 20;

            const scrollAmount = firstSlide
                ? firstSlide.offsetWidth + gap
                : 320;

            viewport.scrollBy({
                left: btn.classList.contains('next') ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });

        });

    });


    // --- 3. SWIPE ---
    document.querySelectorAll('.slider-viewport').forEach(viewport => {

        let startX = 0;
        let isDown = false;

        viewport.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDown = true;
        });

        viewport.addEventListener('touchend', (e) => {

            if (!isDown) return;

            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                viewport.scrollBy({
                    left: diff > 0 ? 300 : -300,
                    behavior: 'smooth'
                });
            }

            isDown = false;
        });

    });


    // --- 4. LIGHTBOX ---
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


    // --- 5. ESC CLOSE ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        }
    });


    // --- 6. MENU (HAMBURGER) ---
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
