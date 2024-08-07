window.addEventListener('DOMContentLoaded', (event) => {
    // Navbar scroll functionality
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 0) {
            navbar.style.display = 'flex';
            navbar.style.backgroundColor = '#011F35'; // Change to black on scroll
        } else {
            navbar.style.display = 'flex'; // Keep the navbar visible
            navbar.style.backgroundColor = 'transparent'; // Revert to transparent if desired
        }
    });

    // Slideshow functionality
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slidesContainer = document.querySelector('.slides');

    // Clone the first slide and append it to the end
    const firstSlideClone = slides[0].cloneNode(true);
    slidesContainer.appendChild(firstSlideClone);

    function showNextSlide() {
        currentIndex++;
        slidesContainer.style.transition = 'transform 1s ease';
        const offset = -currentIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;

        // When the last slide (clone of the first slide) is reached
        if (currentIndex === totalSlides) {
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                slidesContainer.style.transform = 'translateX(0)';
                currentIndex = 0;
            }, 1000); // This timeout should match the transition duration
        }
    }

    let autoSlideInterval = setInterval(showNextSlide, 3000);

    // Arrow functionality
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(showNextSlide, 3000);
    }

    arrowRight.addEventListener('click', () => {
        stopAutoSlide();
        showNextSlide();
        setTimeout(startAutoSlide, 3000);
    });

    arrowLeft.addEventListener('click', () => {
        stopAutoSlide();
        showPreviousSlide();
        setTimeout(startAutoSlide, 3000);
    });

    function showPreviousSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
            slidesContainer.style.transition = 'none';
            const offset = -currentIndex * 100;
            slidesContainer.style.transform = `translateX(${offset}%)`;
            setTimeout(() => {
                slidesContainer.style.transition = 'transform 1s ease';
                showNextSlide();
            }, 10);
        } else {
            slidesContainer.style.transition = 'transform 1s ease';
            const offset = -currentIndex * 100;
            slidesContainer.style.transform = `translateX(${offset}%)`;
        }
    }

    // Menu functionality
    const menuBtn = document.getElementById('menu-btn');
    menuBtn.addEventListener('click', () => {
        document.getElementById('mobile-menu').style.display = 'block';
    });
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
        document.getElementById('mobile-menu').style.display = 'none';
    });

    // Review submission functionality
    document.getElementById('submitReview').addEventListener('click', function() {
        // Get review details
        const name = document.getElementById('reviewName').value.trim();
        const reviewText = document.getElementById('reviewText').value.trim();
        const rating = document.querySelector('input[name="rating"]:checked');
        const reviewsContainer = document.getElementById('reviewsContainer');

        if (!name || !reviewText || !rating) {
            alert('Please fill in all fields and select a rating.');
            return;
        }

        // Create review element
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        const stars = '★'.repeat(parseInt(rating.value)) + '☆'.repeat(5 - parseInt(rating.value));

        reviewElement.innerHTML = `
            <div class="stars">${stars}</div>
            <div class="name">${name}</div>
            <div class="comment">${reviewText}</div>
        `;

        // Append review to container
        reviewsContainer.prepend(reviewElement);

        // Clear the form
        document.getElementById('reviewName').value = '';
        document.getElementById('reviewText').value = '';
        document.querySelector('input[name="rating"]:checked').checked = false;
    });
});
