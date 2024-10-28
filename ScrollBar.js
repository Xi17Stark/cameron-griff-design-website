
window.addEventListener("scroll", function () {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const scrollPosition = window.scrollY;
    const fadeStart = 100; // Scroll position at which the fade starts
    const fadeEnd = 500; // Scroll position at which the indicator becomes completely transparent

    // Calculate the new opacity based on scroll position
    if (scrollPosition <= fadeStart) {
        scrollIndicator.style.opacity = 0.7; // Full opacity before fade starts
    } else if (scrollPosition >= fadeEnd) {
        scrollIndicator.style.opacity = 0; // Fully transparent after fade ends
    } else {
        // Gradually fade out based on scroll position
        const opacity = 0.7 * (1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart));
        scrollIndicator.style.opacity = opacity;
    }
});
