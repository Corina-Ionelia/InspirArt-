// ===== Menu (Hamburger) =====
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobileMenu = document.querySelector('.header .nav-bar .nav-list ul');
const menuLinks = document.querySelectorAll('.header .nav-bar .nav-list ul li a');

function openMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('active');
    if (isOpen) closeMenu();
    else openMenu();
}

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMenu);

    // click pe link => închide
    menuLinks.forEach(a => a.addEventListener('click', closeMenu));

    // ESC => închide
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // click în afară => închide (doar când e deschis)
    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('active')) return;
        const clickedInside = mobileMenu.contains(e.target) || hamburger.contains(e.target);
        if (!clickedInside) closeMenu();
    });
}

// ===== Newsletter popup (doar dacă există pe pagină) =====
window.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('newsletter-popup');
    if (!popup) return;

    setTimeout(() => popup.classList.add('show'), 3000);

    const closeBtn = popup.querySelector('.close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => popup.classList.remove('show'));

    popup.addEventListener('click', (e) => {
        if (e.target.id === 'newsletter-popup') popup.classList.remove('show');
    });

    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Mulțumim că te-ai abonat!");
            popup.classList.remove('show');
        });
    }
});

// ===== Protecție imagini =====
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});

document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});


// Mobile menu toggle (keeps your existing class names)
const hamburger = document.querySelector('#header .hamburger');
const mobileMenu = document.querySelector('#header .nav-list ul');
const body = document.body;

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
}