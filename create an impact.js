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

let currentQuestion = 0;
const totalQuestions = 5;
let score = 0;

const questions = [
    {
        text: 'How do you usually commute to work or school?',
        image: "index images/question1.jpg",
        options: [
            { text: 'Walking/Biking', value: 10 },
            { text: 'Public Transportation', value: 8 },
            { text: 'Carpooling', value: 4 },
            { text: 'Driving Alone', value: 1 }
        ]
    },
    {
        text: 'How often do you use energy-efficient appliances at home?',
        image: "index images/question2.jpg",
        options: [
            { text: 'Always', value: 10 },
            { text: 'Often', value: 7 },
            { text: 'Sometimes', value: 3 },
            { text: 'Rarely', value: 1 }
        ]
    },
    {
        text: 'How do you usually shop for groceries?',
        image: "index images/question3.jpg",
        options: [
            { text: 'Bring reusable bags, buy local and seasonal', value: 10 },
            { text: 'Bring reusable bags, but buy anything available', value: 7 },
            { text: 'Use plastic bags, buy anything available', value: 3 },
            { text: 'Use plastic bags, buy a lot of processed and out-of-season items', value: 1 }
        ]
    },
    {
        text: 'How do you manage waste at home?',
        image: "index images/question4.avif",
        options: [
            { text: 'Compost and Recycle', value: 10 },
            { text: 'Recycle Only', value: 7 },
            { text: 'Minimal Recycling', value: 3 },
            { text: 'Do Not Recycle', value: 1 }
        ]
    },
    {
        text: 'How do you typically shop for clothing?',
        image: "index images/question5.jpg",
        options: [
            { text: 'Buy Secondhand or Sustainable Brands', value: 10 },
            { text: 'Occasionally Buy Sustainable Brands', value: 7 },
            { text: 'Regular Brands, but Infrequently', value: 3 },
            { text: 'Frequently Buy Fast Fashion', value: 1 }
        ]
    }
];

function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function loadQuestion() {
    if (currentQuestion >= totalQuestions) {
        showResult();
        return;
    }

    const question = questions[currentQuestion];
    document.querySelector('.question-number').innerText = `Question ${currentQuestion + 1} out of ${totalQuestions}`;
    document.querySelector('.question-text').innerText = question.text;
    document.getElementById('question-image').src = question.image;

    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.innerText = option.text;
        button.dataset.value = option.value;
        button.addEventListener('click', selectOption);
        optionsContainer.appendChild(button);
    });

    updateProgress();
}

function selectOption(event) {
    const selectedValue = parseInt(event.target.dataset.value);
    score += selectedValue;

    currentQuestion++;
    loadQuestion();
}

function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');

    const percentage = (score / (totalQuestions * 10)) * 100;
    document.querySelector('.score').innerText = `${percentage}%`;

    let resultText = '';
    let resultClass = '';

    if (percentage >= 80) {
        resultText = 'Excellent';
        resultClass = 'green';
    } else if (percentage >= 60) {
        resultText = 'Good';
        resultClass = 'light-green';
    } else if (percentage >= 40) {
        resultText = 'Fair';
        resultClass = 'yellow';
    } else if (percentage >= 20) {
        resultText = 'Poor';
        resultClass = 'orange';
    } else {
        resultText = 'Very Poor';
        resultClass = 'red';
    }

    document.querySelector('.result-text').innerText = resultText;
    const meterBar = document.querySelector('.meter-bar');
    meterBar.classList.add(resultClass);
    document.querySelector('.arrow').style.setProperty('--arrow-position', `${percentage}%`);

    setTimeout(() => {
        document.querySelector('.package').classList.remove('hidden');
        document.querySelector('.package').style.opacity = 1;
    }, 1500);

    loadPackages(percentage);
}

function loadPackages(score) {
    const packages = [
        {
            image: 'index images/collaboration.webp',
            description: 'Looks like you struggle with finding sustainable brands. Do not worry! We have the best collaborations offering quality at affordable prices!'
        },
        {
            image: 'index images/wasteseg.png',
            description: 'Waste segregation is a challenge right? We have association with the municipality and send collector vans which keep your waste sorted!'
        },
        {
            image: 'index images/tree-plant.jpg',
            description: 'Our Earth is struggling with lack of trees. Why not consider our monthly tree plantation drive?? Participate in our go green initiatives today!'
        }
    ];

    const packageContainer = document.querySelector('.package');
    packageContainer.innerHTML = '';

    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.innerText = 'Here are some packages for you:';
    packageContainer.appendChild(textElement);


    packages.forEach(pkg => {
        const packageItem = document.createElement('div');
        packageItem.classList.add('package-item');

        const img = document.createElement('img');
        img.src = pkg.image;
        img.alt = pkg.description;

        const p = document.createElement('p');
        p.innerText = pkg.description;

        packageItem.appendChild(img);
        packageItem.appendChild(p);
        packageContainer.appendChild(packageItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});


        document.addEventListener('DOMContentLoaded', () => {
            const exerciseItems = document.querySelectorAll('.exercise-item');

            exerciseItems.forEach(item => {
                item.addEventListener('click', () => {
                    item.classList.toggle('selected');
                    saveSelectedExercises();
                });
            });

            loadSelectedExercises();
        });

        function saveSelectedExercises() {
            const selectedExercises = [];
            document.querySelectorAll('.exercise-item.selected').forEach(item => {
                selectedExercises.push(item.dataset.exercise);
            });
            localStorage.setItem('selectedExercises', JSON.stringify(selectedExercises));
        }

        function loadSelectedExercises() {
            const selectedExercises = JSON.parse(localStorage.getItem('selectedExercises')) || [];
            document.querySelectorAll('.exercise-item').forEach(item => {
                if (selectedExercises.includes(item.dataset.exercise)) {
                    item.classList.add('selected');
                }
            });
        }

        const menuBtn = document.getElementById('menu-btn')
menuBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').style.display='block';
})
const closeBtn = document.getElementById('close-btn')
closeBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').style.display='none';
})