document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const dotsNav = document.querySelector('.carousel-nav');
    const toggleButtons = Array.from(document.querySelectorAll('.toggle-button'));

    // Generate dynamic dots based on the number of slides
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Slide ${index + 1}`);
        dot.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.active');
            const targetSlide = slides[index];

            moveToSlide(currentSlide, targetSlide);
            updateDots(currentDot, dot);
            resetToggleImages();
        });
        dotsNav.appendChild(dot);
    });

    const moveToSlide = (currentSlide, targetSlide) => {
        const targetIndex = slides.indexOf(targetSlide);
        track.style.transform = 'translateX(-' + targetIndex * 100 + '%)';

        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('active');
        targetDot.classList.add('active');
    };

    const resetToggleImages = () => {
        slides.forEach(slide => {
            const mainImage = slide.querySelector('.main-image');
            const toggleImage = slide.querySelector('.toggle-image');
            mainImage.classList.remove('hidden');
            toggleImage.classList.remove('active');
        });
        toggleButtons.forEach(button => button.classList.remove('active'));
    };

    toggleButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const mainImage = slides[index].querySelector('.main-image');
            const toggleImage = slides[index].querySelector('.toggle-image');

            if (toggleImage.classList.contains('active')) {
                toggleImage.classList.remove('active'); // Hide toggle image
                mainImage.classList.remove('hidden'); // Show main image
            } else {
                mainImage.classList.add('hidden'); // Hide main image
                toggleImage.classList.add('active'); // Show toggle image
            }
        });
    });

    // Autoscroll logic
    let autoScrollInterval;
    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling || slides[0];
            moveToSlide(currentSlide, nextSlide);
            resetToggleImages();
            updateDots(dotsNav.querySelector('.active'), dotsNav.children[slides.indexOf(nextSlide)]);
        }, 5000); // Change interval as needed
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    // Start auto-scroll on load
    startAutoScroll();

    // Stop auto-scroll on user interaction
    track.addEventListener('mouseover', stopAutoScroll);
    track.addEventListener('mouseout', startAutoScroll);
});
