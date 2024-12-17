document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    // Form Validation
    if (form) {
        form.addEventListener("submit", function (e) {
            const emailField = form.querySelector('input[type="email"]');
            if (emailField) {
                const email = emailField.value;

                if (!validateEmail(email)) {
                    e.preventDefault();
                    alert("Please enter a valid email address.");
                }
            }
        });
    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
});
