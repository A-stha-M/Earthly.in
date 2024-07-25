let slideIndex = 0;
let autoSlideTimeout;

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    clearTimeout(autoSlideTimeout);
    autoSlideTimeout = setTimeout(autoShowSlides, 5000); // Change image every 5 seconds
}

function autoShowSlides() {
    slideIndex++;
    showSlides(slideIndex);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Initialize the slideshow
showSlides(slideIndex = 1);
autoSlideTimeout = setTimeout(autoShowSlides, 5000); // Change image every 5 seconds

// Modal handling
function showInfo(imgElement) {
    let modal = document.getElementById("infoModal");
    let span = document.getElementsByClassName("close")[0];
    let imageInfo = document.getElementById("imageInfo");

    // Get the description from the data-info attribute
    let info = imgElement.getAttribute('data-info');

    imageInfo.textContent = info;
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}