window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.style.display = 'flex';
        navbar.style.backgroundColor = 'black'; // Change to black on scroll
    } else {
        navbar.style.display = 'flex'; // Keep the navbar visible
        navbar.style.backgroundColor = 'transparent'; // Revert to transparent if desired
    }
});

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

// Modal functionality
let modal = document.getElementById("infoModal");
let modalContent = document.getElementById("imageInfo");
let span = document.getElementsByClassName("close")[0];

document.querySelectorAll('.mySlides img').forEach(img => {
    img.onclick = function() {
        let infoText = this.getAttribute('data-info');
        // Split the data into sections based on the prefix (Objective, Details, Outcome)
        let sections = {
            Objective: '',
            Details: '',
            Outcome: ''
        };

        infoText.split(',').forEach(item => {
            if (item.startsWith('Objective:')) {
                sections.Objective = item.replace('Objective:', '').trim();
            } else if (item.startsWith('Details:')) {
                sections.Details = item.replace('Details:', '').trim();
            } else if (item.startsWith('Outcome:')) {
                sections.Outcome = item.replace('Outcome:', '').trim();
            }
        });

        // Construct HTML for the modal content
        modalContent.innerHTML = `
            <h3>Objective</h3>
            <p>${sections.Objective}</p>
            <h3>Details</h3>
            <p>${sections.Details}</p>
            <h3>Outcome</h3>
            <p>${sections.Outcome}</p>
        `;
        modal.style.display = "block";
    };
});

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
