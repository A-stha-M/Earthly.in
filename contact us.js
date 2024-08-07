window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
if (window.scrollY > 0) {
 navbar.style.display = 'flex';
 navbar.style.backgroundColor = '#011F35'; 
} else {
 navbar.style.display = 'flex'; 
 navbar.style.backgroundColor = 'transparent'; 
}
});

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
