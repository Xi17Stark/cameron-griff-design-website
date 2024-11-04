document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.steps-carousel-wrapper');
    const items = document.querySelectorAll('.steps-carousel-item');

    const scrollSpeed = 550;
    const getOffsetAdjustment = () => window.innerWidth * 0.23;

    // Center radius for scroll detection (used only for scrolling effect)
    const centerRadius = 10;

    // Enable scrolling with mouse wheel
    wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        wrapper.scrollBy({
            left: e.deltaY < 0 ? -scrollSpeed : scrollSpeed,
            behavior: 'smooth'
        });
    });

    let isScrolling;
    wrapper.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
            const scrollLeft = wrapper.scrollLeft;
            const offsetAdjustment = getOffsetAdjustment();
            let closestIndex = 0;
            let closestDistance = Infinity;

            items.forEach((item, index) => {
                const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                const distance = Math.abs(itemCenter - (scrollLeft + wrapper.offsetWidth / 2));
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            const closestItem = items[closestIndex];
            if (closestItem) {
                const scrollDirection = scrollLeft - wrapper.scrollLeft;
                let snapPosition = closestItem.offsetLeft + (scrollDirection > 0 ? offsetAdjustment : -offsetAdjustment);

                if (closestIndex === 0) {
                    const secondCardPosition = items[1].offsetLeft - (wrapper.offsetWidth / 2) + (items[1].offsetWidth / 2);
                    wrapper.scrollTo({
                        left: secondCardPosition,
                        behavior: 'smooth'
                    });
                } else {
                    wrapper.scrollTo({
                        left: snapPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }, 400);

        const carouselRect = wrapper.getBoundingClientRect();
        const center = carouselRect.left + carouselRect.width / 2;

        items.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(cardCenter - center);

            // Center detection for scroll, with an expanded radius
            const maxDistance = (carouselRect.width / 2) + centerRadius;
            const opacity = Math.max(0.2, 1 - distance / maxDistance);
            const scale = Math.max(0.8, 1 - distance / maxDistance * 0.2);

            card.style.opacity = opacity;
            card.style.transform = `scale(${scale})`;
        });
    });

    // Scroll to the second card on load
    if (items.length > 1) {
        const secondCardPosition = items[1].offsetLeft - (wrapper.offsetWidth / 2) + (items[1].offsetWidth / 2);
        wrapper.scrollTo({
            left: secondCardPosition,
            behavior: 'smooth'
        });
    }

    // Hover image swap delay functionality
    const hoverDelay = 1000; // Delay time in milliseconds
    let hoverTimeout;

    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hoverTimeout = setTimeout(() => {
                item.classList.add('hover-active'); // Add class after delay
            }, hoverDelay);
        });

        item.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout); // Clear the timeout if hover ends early
            item.classList.remove('hover-active'); // Remove class immediately
        });
    });
});
