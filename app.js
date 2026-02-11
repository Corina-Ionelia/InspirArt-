const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const meniu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

// Popup apare după 3 secunde
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('newsletter-popup').classList.add('show');
    }, 3000);
});

// Închidere popup la click pe X
document.querySelector('#newsletter-popup .close-btn').addEventListener('click', () => {
    document.getElementById('newsletter-popup').classList.remove('show');
});

// Închidere la click în afara popup-ului
document.getElementById('newsletter-popup').addEventListener('click', (e) => {
    if (e.target.id === 'newsletter-popup') {
        document.getElementById('newsletter-popup').classList.remove('show');
    }
});

// Submit form
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Mulțumim că te-ai abonat!");
    document.getElementById('newsletter-popup').classList.remove('show');
});

// Protecție imagini
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
});

document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
});



document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 250) {
        header.style.backgroundColor = "#29323c";
    } else {
        header.style.backgroundColor = "transparent";
    }
});

meniu_item.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    })
})