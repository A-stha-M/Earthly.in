// Function to show the modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Function to close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Add event listeners after DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Show the signup modal if it hasn't been shown before
    if (!sessionStorage.getItem('signupShown')) {
        setTimeout(function () {
            showModal('signupModal');
            sessionStorage.setItem('signupShown', 'true');
        }, 3000);
    }

    // Add event listener for the signup form submission
    document.getElementById('signupForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get values from the form
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;

        // Store values in localStorage
        localStorage.setItem('fullname', fullname);
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);

        // Notify the user and close the modal
        alert('Sign up successful! Data saved to profile.');
        closeModal('signupModal');
    });
});

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    const modals = ['signupModal', 'signinModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            closeModal(modalId);
        }
    });
}


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

function animateValue(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(function() {
        current += increment;
        obj.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.api-container');
    let lastScrollTop = 0;
    
    window.addEventListener("scroll", function() {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            // downscroll code
            const rect = container.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                console.log('Container is in view');
                animateValue("volunteers", 0, 600, 1000);
                animateValue("camps", 0, 25, 4000);
                animateValue("activities", 0, 320, 3000);
                // Remove the event listener after starting the animation
                window.removeEventListener("scroll", arguments.callee);
            }
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
});


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
                let currentStep = 0;

                const startNextAnimation = (index) => {
                    if (index >= steps.length) {
                        // Restart the animation loop after a short delay
                        setTimeout(() => {
                            currentStep = 0;
                            startNextAnimation(currentStep);
                        }, 200); // Adjust the delay as needed
                        return;
                    }

                    steps[index].classList.add('active');

                    // Remove the 'active' class and trigger the next animation when the current one ends
                    steps[index].addEventListener('animationend', () => {
                        steps[index].classList.remove('active');
                        startNextAnimation(index + 1); // Start next animation
                    }, { once: true });
                };

                // Start the animation loop
                startNextAnimation(currentStep);

                // Disconnect observer after starting the animation loop
                observer.disconnect();
            }
        });
    }, options);

    let target = document.querySelector('.container');
    observer.observe(target);
});


/*const menuBtn = document.getElementById('menu-btn')
menuBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').style.display='block';
})
const closeBtn = document.getElementById('close-btn')
closeBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').style.display='none';
})*/

const menuBtn = document.getElementById('menu-btn');
        menuBtn.addEventListener('click', () => {
            document.getElementById('mobile-menu').style.display = 'block';
        });

        const closeBtn = document.getElementById('close-btn');
        closeBtn.addEventListener('click', () => {
            document.getElementById('mobile-menu').style.display = 'none';
        });

        
        document.addEventListener("DOMContentLoaded", function() {
    var menuButton = document.getElementById("menu-button");
    var closeButton = document.getElementById("close-btn");
    var mobileMenu = document.getElementById("mobile-menu");

    menuButton.addEventListener("click", function() {
        mobileMenu.style.display = "block";
    });

    closeButton.addEventListener("click", function() {
        mobileMenu.style.display = "none";
    });
});