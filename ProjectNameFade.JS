 window.addEventListener('scroll', function() {
        const glassyContainer = document.querySelector('.glassy-container');
        const scrollPosition = window.scrollY;

        // Control how much the text moves and fades
        const moveAmount = 100; // How high the text should move upward
        const fadeOutStart = 300; // Start fading at 300px scroll
        const fadeOutEnd = 600; // Fully fade out by 600px scroll

        // Move the text upward from its original position
        const translateY = Math.max(0, (scrollPosition - fadeOutStart) * (moveAmount / (fadeOutEnd - fadeOutStart))); // Move upward as you scroll down
        glassyContainer.style.transform = `translateY(-${translateY}px)`; // Move upward

        // Handle opacity
        if (scrollPosition > fadeOutStart && scrollPosition < fadeOutEnd) {
            const opacity = 1 - (scrollPosition - fadeOutStart) / (fadeOutEnd - fadeOutStart);
            glassyContainer.style.opacity = opacity;
        } else if (scrollPosition >= fadeOutEnd) {
            glassyContainer.style.opacity = 0; // Fully transparent
        } else {
            glassyContainer.style.opacity = 1; // Fully visible
        }
    });





