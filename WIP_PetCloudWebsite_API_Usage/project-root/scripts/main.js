document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav ul");
    const lazyImages = document.querySelectorAll("img.lazy");

    // Toggle Navigation Menu
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("active");
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Lazy Loading for Images
    if (lazyImages.length > 0) {
        const lazyLoad = function () {
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top < window.innerHeight && !img.classList.contains("loaded")) {
                    img.src = img.dataset.src;
                    img.classList.add("loaded");
                }
            });
        };

        window.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        lazyLoad(); // Initial load
    }

    // Responsive Navbar Closing on Link Click (for mobile)
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function () {
            if (nav.classList.contains("active")) {
                nav.classList.remove("active");
            }
        });
    });
});
