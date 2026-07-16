// ==============================
// Multi Step Form
// ==============================

const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progressBar = document.querySelector(".progress-bar");
const submitBtn = document.querySelector(".submit-btn");

let currentStep = 0;

// Show current step
function showStep(index) {

    steps.forEach((step) => {

        step.classList.remove("active");

    });

    steps[index].classList.add("active");

    updateProgress();

    window.scrollTo({
        top: document.querySelector(".form-section").offsetTop - 80,
        behavior: "smooth"
    });

}

// Progress Bar
function updateProgress() {

    let progress = ((currentStep + 1) / steps.length) * 100;

    progressBar.style.width = progress + "%";

}

// Next Buttons

nextBtns.forEach((button) => {

    button.addEventListener("click", () => {

        if (!validateStep(currentStep))
            return;

        if (currentStep < steps.length - 1) {

            currentStep++;

            showStep(currentStep);

        }

    });

});

// Previous Buttons

prevBtns.forEach((button) => {

    button.addEventListener("click", () => {

        if (currentStep > 0) {

            currentStep--;

            showStep(currentStep);

        }

    });

});

showStep(currentStep);

// ==============================
// Validation
// ==============================

function validateStep(stepIndex) {

    const currentInputs = steps[stepIndex].querySelectorAll("input, select, textarea");

    let valid = true;

    currentInputs.forEach(input => {

        if (input.type === "file")
            return;

        if (input.type === "checkbox")
            return;

        if (input.value.trim() === "") {

            input.style.border = "2px solid red";

            valid = false;

        }

        else {

            input.style.border = "1px solid rgba(255,255,255,.12)";

        }

    });

    if (!valid) {

        alert("Please complete all required fields.");

    }

    return valid;

}

// ==============================
// Image Upload Preview
// ==============================

const imageInput = document.getElementById("propertyImages");

const previewContainer = document.getElementById("previewContainer");

if (imageInput) {

    imageInput.addEventListener("change", function () {

        previewContainer.innerHTML = "";

        [...this.files].forEach(file => {

            if (!file.type.startsWith("image"))
                return;

            const reader = new FileReader();

            reader.onload = function (e) {

                const img = document.createElement("img");

                img.src = e.target.result;

                previewContainer.appendChild(img);

            }

            reader.readAsDataURL(file);

        });

    });

}

// ==============================
// Publish Property
// ==============================

if (submitBtn) {

    submitBtn.addEventListener("click", function () {

        if (!validateStep(currentStep))
            return;

        alert("🎉 Congratulations!\n\nYour property has been submitted successfully.\n\nOur team will review your listing within 24 hours.");

        location.reload();

    });

}

// ==============================
// Navbar Shadow
// ==============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.background = "#08111f";

        header.style.boxShadow = "0 15px 35px rgba(0,0,0,.35)";

    }

    else {

        header.style.background = "rgba(8,17,31,.55)";

        header.style.boxShadow = "none";

    }

});

// ==============================
// Button Hover Animation
// ==============================

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-3px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0px)";

    });

});

// ==============================
// Fade Animation on Scroll
// ==============================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = 1;

            entry.target.style.transform = "translateY(0px)";

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll(".stat-card,.why-card,.preview-card,.upload-box").forEach(card => {

    card.style.opacity = 0;

    card.style.transform = "translateY(40px)";

    card.style.transition = ".6s";

    observer.observe(card);

});

// ==============================
// Drag & Drop Upload
// ==============================

const uploadBox = document.querySelector(".upload-box");

if (uploadBox) {

    uploadBox.addEventListener("dragover", (e) => {

        e.preventDefault();

        uploadBox.style.borderColor = "#D4AF37";

        uploadBox.style.background = "rgba(212,175,55,.08)";

    });

    uploadBox.addEventListener("dragleave", () => {

        uploadBox.style.borderColor = "rgba(212,175,55,.5)";

        uploadBox.style.background = "rgba(255,255,255,.03)";

    });

    uploadBox.addEventListener("drop", (e) => {

        e.preventDefault();

        imageInput.files = e.dataTransfer.files;

        imageInput.dispatchEvent(new Event("change"));

        uploadBox.style.borderColor = "rgba(212,175,55,.5)";

        uploadBox.style.background = "rgba(255,255,255,.03)";

    });

}

// ==============================
// Current Year (Optional)
// ==============================

const year = document.querySelector(".year");

if (year) {

    year.textContent = new Date().getFullYear();

}