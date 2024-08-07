document.addEventListener('DOMContentLoaded', function () {
    const fullname = localStorage.getItem('fullname');
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');

    document.getElementById('fullname').textContent = "Full Name: " + fullname;
    document.getElementById('email').textContent = "Email: " + email;
    document.getElementById('username').textContent = "Username: " + username;
});


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

document.addEventListener('DOMContentLoaded', function () {
    const element = document.querySelector('.underline-animation');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-underline');
            }
        });
    });

    observer.observe(element);
});

document.addEventListener('DOMContentLoaded', () => {
    const selectedExercises = JSON.parse(localStorage.getItem('selectedExercises')) || [];
    const selectedExercisesContainer = document.querySelector('.selected-exercises');

    if (selectedExercises.length === 0) {
        const noExerciseMessage = document.createElement('div');
        noExerciseMessage.classList.add('no-exercise');
        noExerciseMessage.textContent = 'Nothing selected yet';
        selectedExercisesContainer.appendChild(noExerciseMessage);
    } else {
        selectedExercises.forEach(exercise => {
            const exerciseItem = document.createElement('div');
            exerciseItem.classList.add('exercise-item');
            exerciseItem.innerHTML = `<p>${exercise}</p>`;
            selectedExercisesContainer.appendChild(exerciseItem);
        });
    }
});


const menuBtn = document.getElementById('menu-btn')
menuBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').style.display='block';
})
const closeBtn = document.getElementById('close-btn')
closeBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').style.display='none';
})