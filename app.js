// ==========================
// Helpers
// ==========================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// ==========================
// Mobile Menu (Hamburger)
// uses: .hamburger.active, ul.active, body.menu-open
// ==========================
function initMobileMenu() {
    const hamburger = $("#header .hamburger");
    const mobileMenu = $("#header .nav-list ul");

    if (!hamburger || !mobileMenu) return;

    const openMenu = () => {
        hamburger.classList.add("active");
        mobileMenu.classList.add("active");
        document.body.classList.add("menu-open");
        hamburger.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
        hamburger.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains("active");
        isOpen ? closeMenu() : openMenu();
    };

    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // close on link click
    $$("#header .nav-list ul li a").forEach((a) => {
        a.addEventListener("click", closeMenu);
    });

    // ESC closes
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    // click outside closes (only when open)
    document.addEventListener("click", (e) => {
        if (!mobileMenu.classList.contains("active")) return;
        const clickedInside = mobileMenu.contains(e.target) || hamburger.contains(e.target);
        if (!clickedInside) closeMenu();
    });
}

// ==========================
// Newsletter popup (only if exists)
// ==========================
function initNewsletterPopup() {
    const popup = $("#newsletter-popup");
    if (!popup) return;

    const closeBtn = $(".close-btn", popup);
    const form = $("#newsletter-form");

    const show = () => popup.classList.add("show");
    const hide = () => popup.classList.remove("show");

    // show after 3s
    setTimeout(show, 3000);

    if (closeBtn) closeBtn.addEventListener("click", hide);

    popup.addEventListener("click", (e) => {
        // click on overlay closes
        if (e.target === popup) hide();
    });

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Mulțumim că te-ai abonat!");
            hide();
            form.reset();
        });
    }
}

// ==========================
// Image protection (optional)
// ==========================
function initImageProtection() {
    document.addEventListener("contextmenu", (e) => {
        if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });

    document.addEventListener("dragstart", (e) => {
        if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });
}

// ==========================
// Init
// ==========================
window.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initNewsletterPopup();
    initImageProtection();
});