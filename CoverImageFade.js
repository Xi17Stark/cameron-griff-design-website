document.addEventListener("DOMContentLoaded", function () {
    // Define arrays with image URLs
    const leftImages = [
        "images/LaserCutter/OpenLid.png",
        "images/LaserCutter/SidePanel2.png",
        "images/TVCabinate/CabinateRender2_Close_min.jpg"
    ];

    const rightImages = [
        "images/TVCabinate/CabinateRender2_Close_min.jpg",
        "images/LaserCutter/Scene-12.png",
        "images/TVCabinate/Scene8_min.jpg"
    ];

    let leftIndex = 0;
    let rightIndex = 0;
    const fadeTime = 1500;
    
    
    const leftImageElement = document.getElementById('left-image');
    const rightImageElement = document.getElementById('right-image');

    // Function to cycle left image
    function cycleLeftImage() {
        leftImageElement.classList.add('hidden');

        setTimeout(() => {
            leftImageElement.src = leftImages[leftIndex];
            leftImageElement.onload = () => leftImageElement.classList.remove('hidden');

            leftIndex = (leftIndex + 1) % leftImages.length;
        }, fadeTime); // Match CSS transition duration
    }

    // Function to cycle right image
    function cycleRightImage() {
        rightImageElement.classList.add('hidden');

        setTimeout(() => {
            rightImageElement.src = rightImages[rightIndex];
            rightImageElement.onload = () => rightImageElement.classList.remove('hidden');

            rightIndex = (rightIndex + 1) % rightImages.length;
        }, fadeTime); // Match CSS transition duration
    }

    // Cycle left image every 5 seconds, right image every 7 seconds
    setInterval(cycleLeftImage, 7000);
    setInterval(cycleRightImage, 11000);
});