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

const emissionFactors = {
    photos: { co2: 10, energy: 5, water: 2, waste: 1 },
    videos: { co2: 200, energy: 100, water: 40, waste: 20 },
    emails: { co2: 4, energy: 2, water: 1, waste: 0.5 },
    chats: { co2: 1, energy: 0.5, water: 0.2, waste: 0.1 },
    documents: { co2: 15, energy: 8, water: 3, waste: 2 },
    music: { co2: 50, energy: 25, water: 10, waste: 5 },
    cloudStorage: { co2: 25, energy: 12, water: 5, waste: 2.5 },
    socialMedia: { co2: 30, energy: 15, water: 6, waste: 3 },
    onlineShopping: { co2: 100, energy: 50, water: 20, waste: 10 }
};

let selectedAspects = {};
let cumulativeEmissions = { co2: 0, energy: 0, water: 0, waste: 0 };

document.addEventListener("DOMContentLoaded", function () {
    const blocks = document.querySelectorAll(".block");
    const inputBox = document.getElementById("input-box");
    const quantityInput = document.getElementById("quantity");
    const submitButton = document.getElementById("submit-button");

    blocks.forEach(block => {
        block.addEventListener("click", function () {
            const item = block.getAttribute("data-item");

            // Toggle selection
            block.classList.toggle("selected");

            if (block.classList.contains("selected")) {
                selectedAspects[item] = 0;
                inputBox.style.display = "block";
                quantityInput.value = ""; // Clear the input field
            } else {
                updateCumulativeEmissions(item, -selectedAspects[item]);
                delete selectedAspects[item];
                inputBox.style.display = "none";
                updateIndividualResults({ co2: 0, energy: 0, water: 0, waste: 0 });
            }

            console.log("Selected aspects:", selectedAspects);
        });
    });

    submitButton.addEventListener("click", function () {
        const item = document.querySelector(".block.selected").getAttribute("data-item");
        const quantity = parseInt(quantityInput.value);

        selectedAspects[item] = quantity;

        const individualEmissions = calculateEmissions(item, quantity);
        updateIndividualResults(individualEmissions);

        // Update cumulative emissions
        updateCumulativeEmissions(item, quantity);

        console.log("Individual emissions:", individualEmissions);
        console.log("Cumulative emissions:", cumulativeEmissions);
    });

    document.getElementById("calculate-button").addEventListener("click", function () {
        document.getElementById("total-footprint").style.display = "block";
        document.getElementById("total-co2").textContent = `Total Green House Gases Emitted: ${cumulativeEmissions.co2 + 10000}g`;

    });
});

function calculateEmissions(item, quantity) {
    const factor = emissionFactors[item];
    return {
        co2: factor.co2 * quantity,
        energy: factor.energy * quantity,
        water: factor.water * quantity,
        waste: factor.waste * quantity
    };
}

function updateIndividualResults(emissions) {
    document.getElementById("individual-co2").textContent = `CO2: ${emissions.co2}g`;
    document.getElementById("individual-energy").textContent = `Energy: ${emissions.energy}kWh`;
    document.getElementById("individual-water").textContent = `Water: ${emissions.water}L`;
    document.getElementById("individual-waste").textContent = `Waste: ${emissions.waste}g`;
}

function updateCumulativeEmissions(item, quantity) {
    const factor = emissionFactors[item];
    cumulativeEmissions.co2 += factor.co2 * quantity;
    cumulativeEmissions.energy += factor.energy * quantity;
    cumulativeEmissions.water += factor.water * quantity;
    cumulativeEmissions.waste += factor.waste * quantity;

    document.getElementById("cumulative-co2").textContent = `CO2: ${cumulativeEmissions.co2}g`;
    document.getElementById("cumulative-energy").textContent = `Energy: ${cumulativeEmissions.energy}kWh`;
    document.getElementById("cumulative-water").textContent = `Water: ${cumulativeEmissions.water}L`;
    document.getElementById("cumulative-waste").textContent = `Waste: ${cumulativeEmissions.waste}g`;
}


const menuBtn = document.getElementById('menu-btn')
menuBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').style.display='block';
})
const closeBtn = document.getElementById('close-btn')
closeBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').style.display='none';
})

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
