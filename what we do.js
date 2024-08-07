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

let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }

    function plusSlides(n) {
        slideIndex += n;
        if (slideIndex > document.getElementsByClassName("mySlides").length) {
            slideIndex = 1;
        } else if (slideIndex < 1) {
            slideIndex = document.getElementsByClassName("mySlides").length;
        }
        showSlides();
    }

    function currentSlide(n) {
        slideIndex = n;
        showSlides();
    }
        function animateValue(id, start, end, duration) {
            let range = end - start;
            let current = start;
            let increment = end > start ? 1000 : -1000;
            let stepTime = Math.abs(Math.floor(duration / (range / 1000)));
            let obj = document.getElementById(id);
            let timer = setInterval(function() {
                current += increment;
                obj.textContent = current;
                if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                    clearInterval(timer);
                    obj.textContent = end; // Ensure the end value is displayed
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
                        animateValue("volunteers", 0, 30000, 2000, 1000);
                        animateValue("camps", 0, 10000, 1000, 2000);
                        animateValue("activities", 0, 250000, 2000, 1000);
                        // Remove the event listener after starting the animation
                        window.removeEventListener("scroll", arguments.callee);
                    }
                }
                lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
            }, false);
        });


        const predefinedValues = [
            { CO2: '400 ppm', O2: '20.5%', AQI: 'Poor', PM2_5: '180 µg/m³', PM10: '220 µg/m³' },
            { CO2: '350 ppm', O2: '21.0%', AQI: 'Moderate', PM2_5: '100 µg/m³', PM10: '150 µg/m³' },
            { CO2: '370 ppm', O2: '20.8%', AQI: 'Good', PM2_5: '90 µg/m³', PM10: '120 µg/m³' },
            { CO2: '380 ppm', O2: '20.6%', AQI: 'Moderate', PM2_5: '110 µg/m³', PM10: '160 µg/m³' },
            { CO2: '390 ppm', O2: '20.7%', AQI: 'Unhealthy', PM2_5: '130 µg/m³', PM10: '180 µg/m³' }
        ];

        const idealValues = { CO2: '300 ppm', O2: '21%', AQI: 'Good', PM2_5: '12 µg/m³', PM10: '50 µg/m³' };

        let searchCount = 0;

        function updateMeter(aqi) {
            const meter = document.getElementById('pointer');
            const label = document.getElementById('pointer-label');
            let percentage = 0;
            let status = '';

            switch(aqi) {
                case 'Good':
                    percentage = 60;
                    status = 'Good';
                    break;
                case 'Moderate':
                    percentage = 40;
                    status = 'Moderate';
                    break;
                case 'Unhealthy':
                    percentage = 80;
                    status = 'Unhealthy';
                    break;
                case 'Poor':
                    percentage = 20;
                    status = 'Poor';
                    break;
                default:
                    percentage = 0;
                    status = 'N/A';
                    break;
            }

            meter.style.left = `${percentage}%`;
            label.textContent = `${percentage}% - ${status}`;
        }

        document.getElementById('submitButton').addEventListener('click', function() {
            const resultsContainer = document.getElementById('results');
            const infoSection = document.querySelector('.info-section');

            searchCount++;

            if (searchCount <= predefinedValues.length) {
                const values = predefinedValues[searchCount - 1];
                const resultText = `
                    <div class="result-line">
                        <strong>CO2:</strong> ${values.CO2} <br>
                        <strong>O2:</strong> ${values.O2} <br>
                        <strong>AQI:</strong> ${values.AQI} <br>
                        <strong>PM2.5:</strong> ${values.PM2_5} <br>
                        <strong>PM10:</strong> ${values.PM10}
                    </div>
                `;
                resultsContainer.innerHTML = resultText;
                updateMeter(values.AQI);
                infoSection.style.display = 'block'; // Show the info section with messages and ideal values
            } else {
                resultsContainer.innerHTML = '<div class="result-line">Search limit reached. Please refresh the page to start again.</div>';
                infoSection.style.display = 'none'; // Hide the info section
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