window.addEventListener("load", function() {
            // Fade out the preloader only
            setTimeout(() => {
                document.getElementById("preloader").style.animation = "fadeOut 1s forwards"; // Fade out preloader
            }, 2000); // Duration to wait before starting the fade out (match the fade-in time of the logo)

            // Hide the preloader after fading out
            document.getElementById("preloader").addEventListener("animationend", () => {
                document.getElementById("preloader").style.display = "none"; // Hide preloader after fade out completes
            });
        });