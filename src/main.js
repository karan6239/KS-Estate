/*==================================================
        PROPERTY CARD ANIMATION (HOME PAGE)
==================================================*/

const cards = document.querySelectorAll(".card1");

if (cards.length) {

    cards.forEach(card => {

        card.addEventListener("click", function () {

            cards.forEach(c => {

                if (c !== this) {

                    c.classList.remove("active");

                }

            });

            this.classList.toggle("active");

        });

    });

}

/*==================================================
                NAVBAR
==================================================*/

const navbar = document.getElementById("navbar");

const navLinks = document.querySelectorAll(".nav-link");

function changeNavbar() {

    if (!navbar) return;

    if (window.scrollY > 550) {

        navbar.classList.add("bg-white/90", "shadow-lg");

        navbar.classList.remove("bg-transparent");

        navLinks.forEach(link => {

            link.classList.remove("text-white");

            link.classList.add("text-gray-800");

        });

    }

    else {

        navbar.classList.add("bg-transparent");

        navbar.classList.remove("bg-white/90", "shadow-lg");

        navLinks.forEach(link => {

            link.classList.remove("text-gray-800");

            link.classList.add("text-white");

        });

    }

}

changeNavbar();

window.addEventListener("scroll", changeNavbar);

/*==================================================
                FAQ
==================================================*/

document.querySelectorAll(".faq-item").forEach(item => {

    let timer;

    item.addEventListener("mouseenter", () => {

        clearTimeout(timer);

        item.setAttribute("open", "");

    });

    item.addEventListener("mouseleave", () => {

        timer = setTimeout(() => {

            item.removeAttribute("open");

        }, 500);

    });

});

/*==================================================
            SELL PAGE MULTI STEP FORM
==================================================*/

const steps = document.querySelectorAll(".step");

if (steps.length) {

    const nextBtns = document.querySelectorAll(".next-btn");

    const prevBtns = document.querySelectorAll(".prev-btn");

    const progressBar = document.querySelector(".progress-bar");

    const submitBtn = document.querySelector(".submit-btn");

    let currentStep = 0;

    function showStep(index) {

        steps.forEach(step => step.classList.remove("active"));

        steps[index].classList.add("active");

        progressBar.style.width =
            ((index + 1) / steps.length) * 100 + "%";

        window.scrollTo({

            top: document.querySelector(".form-section").offsetTop - 100,

            behavior: "smooth"

        });

    }

    function validateStep(stepIndex) {

        let valid = true;

        const inputs = steps[stepIndex].querySelectorAll("input,select,textarea");

        inputs.forEach(input => {

            if (input.type === "checkbox" || input.type === "file") return;

            if (input.value.trim() === "") {

                input.style.border = "2px solid red";

                valid = false;

            }

            else {

                input.style.border = "";

            }

        });

        if (!valid) {

            alert("Please complete all required fields.");

        }

        return valid;

    }

    nextBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            if (!validateStep(currentStep)) return;

            if (currentStep < steps.length - 1) {

                currentStep++;

                showStep(currentStep);

            }

        });

    });

    prevBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            if (currentStep > 0) {

                currentStep--;

                showStep(currentStep);

            }

        });

    });

    showStep(currentStep);

    /*==========================
            IMAGE PREVIEW
    ==========================*/

    const imageInput = document.getElementById("propertyImages");

    const preview = document.getElementById("previewContainer");

    if (imageInput && preview) {

        imageInput.addEventListener("change", function () {

            preview.innerHTML = "";

            [...this.files].forEach(file => {

                if (!file.type.startsWith("image")) return;

                const reader = new FileReader();

                reader.onload = function (e) {

                    const img = document.createElement("img");

                    img.src = e.target.result;

                    preview.appendChild(img);

                }

                reader.readAsDataURL(file);

            });

        });

    }

    /*==========================
            DRAG DROP
    ==========================*/

    const uploadBox = document.querySelector(".upload-box");

    if (uploadBox && imageInput) {

        uploadBox.addEventListener("dragover", e => {

            e.preventDefault();

            uploadBox.classList.add("drag");

        });

        uploadBox.addEventListener("dragleave", () => {

            uploadBox.classList.remove("drag");

        });

        uploadBox.addEventListener("drop", e => {

            e.preventDefault();

            uploadBox.classList.remove("drag");

            imageInput.files = e.dataTransfer.files;

            imageInput.dispatchEvent(new Event("change"));

        });

    }

    /*==========================
            SUBMIT
    ==========================*/

    if (submitBtn) {

        submitBtn.addEventListener("click", () => {

            if (!validateStep(currentStep)) return;

            alert("🎉 Property Published Successfully!");

            location.reload();

        });

    }

}

/*==================================================
        SCROLL ANIMATION
==================================================*/

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll(".stat-card,.why-card,.preview-card,.card,.card1").forEach(el => {

    observer.observe(el);

});