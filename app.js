(function() {
    "use strict";

    const header = document.querySelector("#header .header");
    const hamburger = document.querySelector("#header .hamburger");
    const mobileMenu = document.querySelector("#header .nav-list ul");
    const menuLinks = document.querySelectorAll(".header .nav-bar .nav-list ul li a");

    const popup = document.getElementById("newsletter-popup");
    const popupClose = document.querySelector("#newsletter-popup .close-btn");
    const popupForm = document.getElementById("newsletter-form");

    // ---------- Menu helpers ----------
    function openMenu() {
        if (!hamburger || !mobileMenu) return;
        hamburger.classList.add("active");
        mobileMenu.classList.add("active");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        if (!hamburger || !mobileMenu) return;
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
    }

    function toggleMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
    }

    // ---------- Hamburger click ----------
    if (hamburger) {
        hamburger.addEventListener("click", toggleMenu);

        // suport Enter/Space (accesibilitate)
        hamburger.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    // ---------- Close menu on link click ----------
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => closeMenu());
    });

    // ---------- Close menu on ESC ----------
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
            if (popup) popup.classList.remove("show");
        }
    });

    // ---------- Header scroll class (nu strică gradientul din CSS) ----------
    if (header) {
        const onScroll = () => {
            header.classList.toggle("scrolled", window.scrollY > 50);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    // ---------- Newsletter popup (safe) ----------
    if (popup) {
        window.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => popup.classList.add("show"), 3000);
        });

        if (popupClose) {
            popupClose.addEventListener("click", () => popup.classList.remove("show"));
        }

        popup.addEventListener("click", (e) => {
            if (e.target === popup) popup.classList.remove("show");
        });

        if (popupForm) {
            popupForm.addEventListener("submit", (e) => {
                e.preventDefault();
                alert("Mulțumim că te-ai abonat!");
                popup.classList.remove("show");
                popupForm.reset();
            });
        }
    }

    // ---------- Image protection ----------
    document.addEventListener("contextmenu", (e) => {
        if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });

    document.addEventListener("dragstart", (e) => {
        if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });
})();