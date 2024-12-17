document.addEventListener("DOMContentLoaded", function () {
    const petSpotlights = document.querySelectorAll(".pet-spotlight");
    let currentIndex = 0;

    // Pet Spotlight Carousel
    if (petSpotlights.length > 0) {
        function showPet(index) {
            petSpotlights.forEach((pet, i) => {
                pet.style.display = i === index ? "block" : "none";
            });
        }

        function nextPet() {
            currentIndex = (currentIndex + 1) % petSpotlights.length;
            showPet(currentIndex);
        }

        setInterval(nextPet, 5000); // Change pet every 5 seconds
        showPet(currentIndex); // Initial pet display
    }
});
