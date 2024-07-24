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


let currentQuestion = 1;
const totalQuestions = 5;
let score = 0;

const questions = [
    {
        text: 'How do you usually commute to work or school?',
        options: [
            { text: 'Walking/Biking', value: 10 },
            { text: 'Public Transportation', value: 8 },
            { text: 'Carpooling', value: 4 },
            { text: 'Driving Alone', value: 1 }
        ]
    },
    {
        text: 'How often do you use energy-efficient appliances at home?',
        options: [
            { text: 'Always', value: 10 },
            { text: 'Often', value: 7 },
            { text: 'Sometimes', value: 3 },
            { text: 'Rarely', value: 1 }
        ]
    },
    {
        text: 'How do you usually shop for groceries?',
        options: [
            { text: 'Bring reusable bags, buy local and seasonal', value: 10 },
            { text: 'Bring reusable bags, but buy anything available', value: 7 },
            { text: 'Use plastic bags, buy anything available', value: 3 },
            { text: 'Use plastic bags, buy a lot of processed and out-of-season items', value: 1 }
        ]
    },
    {
        text: 'How do you manage waste at home?',
        options: [
            { text: 'Compost and Recycle', value: 10 },
            { text: 'Recycle Only', value: 7 },
            { text: 'Minimal Recycling', value: 3 },
            { text: 'Do Not Recycle', value: 1 }
        ]
    },
    {
        text: 'How do you typically shop for clothing?',
        options: [
            { text: 'Buy Secondhand or Sustainable Brands', value: 10 },
            { text: 'Occasionally Buy Sustainable Brands', value: 7 },
            { text: 'Regular Brands, but Infrequently', value: 3 },
            { text: 'Frequently Buy Fast Fashion', value: 1 }
        ]
    }
];

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', (e) => {
        score += parseInt(e.target.getAttribute('data-value'));
        showNextQuestion();
    });
});

document.querySelector('.next-button').addEventListener('click', () => {
    showNextQuestion();
});

function showNextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        updateQuestion();
        updateProgress();
    } else {
        calculateScore();
    }
}

function updateQuestion() {
    const question = questions[currentQuestion - 1];
    document.querySelector('.question-number').textContent = `Question ${currentQuestion} out of ${totalQuestions}`;
    document.querySelector('.question-text').textContent = question.text;
    document.querySelector('.options').innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.setAttribute('data-value', option.value);
        button.textContent = option.text;
        document.querySelector('.options').appendChild(button);
        button.addEventListener('click', (e) => {
            score += parseInt(e.target.getAttribute('data-value'));
            showNextQuestion();
        });
    });
}

function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function calculateScore() {
    const percentage = (score / (totalQuestions * 10)) * 100;
    document.querySelector('.score').textContent = `${percentage.toFixed(2)}%`;
    updateResultText(percentage);
    document.querySelector('.arrow').style.left = `${percentage}%`;
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
}

function updateResultText(percentage) {
    let resultText;
    if (percentage > 80) {
        resultText = 'Excellent';
        updatePackageText('Excellent');
    } else if (percentage > 60) {
        resultText = 'Good';
        updatePackageText('Good');
    } else if (percentage > 40) {
        resultText = 'Average';
        updatePackageText('Average');
    } else {
        resultText = 'Poor';
        updatePackageText('Poor');
    }
    document.querySelector('.result-text').textContent = resultText;
}

function updatePackageText(resultText) {
    const packageItems = document.querySelectorAll('.package-item p');
    packageItems[0].textContent = `${resultText} Package 1: Detailed description of package 1.`;
    packageItems[1].textContent = `${resultText} Package 2: Detailed description of package 2.`;
    packageItems[2].textContent = `${resultText} Package 3: Detailed description of package 3.`;
}
