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
showSlides();

document.addEventListener("DOMContentLoaded", function() {
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };

    let observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.container').classList.add('in-view');
                let steps = document.querySelectorAll('.step');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('active');
                        setTimeout(() => {
                            step.classList.remove('active');
                        }, 3000);
                    }, index * 3000);
                });
            }
        });
    }, options);

    let target = document.querySelector('.container');
    observer.observe(target);
});


function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function plusSlides(n) {
    slideIndex += n;
    showSlides();
}