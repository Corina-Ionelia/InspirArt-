/* ===============================
   HELPERS
================================ */
const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/* ===============================
   MOBILE MENU
================================ */
const hamburger = qs(".hamburger");
const navMenu = qs("#header .nav-list ul");

if (hamburger && navMenu) {
    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle("active");
        hamburger.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    };

    hamburger.addEventListener("click", toggleMenu);

    hamburger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMenu();
        }
    });

    qsa("#header .nav-list ul a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        });
    });

    document.addEventListener("click", (e) => {
        const clickedInsideMenu = e.target.closest(".nav-list");
        if (!clickedInsideMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        }
    });
}

/* ===============================
   ACTIVE LINK
================================ */
const currentPage = window.location.pathname.split("/").pop() || "index.html";

qsa("#header .nav-list ul a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
        link.classList.add("is-active");
    }
});

/* ===============================
   FOOTER YEAR
================================ */
const yearEl = qs("#year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

/* ===============================
   LIGHTBOX
================================ */
const lb = qs("[data-lb]");
const lbImg = qs("[data-lb-img]");
const lbCap = qs("[data-lb-cap]");
const lbCloseBtns = qsa("[data-lb-close]");
const lbPrev = qs("[data-lb-prev]");
const lbNext = qs("[data-lb-next]");
const lbItems = qsa("[data-lightbox-item] img");

let currentIndex = 0;

function openLightbox(index) {
    if (!lb || !lbItems.length) return;

    currentIndex = index;

    const img = lbItems[currentIndex];
    const src = img.dataset.lightboxSrc || img.src;
    const caption = img.dataset.lightboxCaption || img.alt || "";

    lb.hidden = false;
    lbImg.src = src;
    lbImg.alt = img.alt || "";
    lbCap.textContent = caption;
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    if (!lb) return;

    lb.hidden = true;
    lbImg.src = "";
    lbImg.alt = "";
    lbCap.textContent = "";
    document.body.style.overflow = "";
}

function showPrev() {
    if (!lbItems.length) return;
    currentIndex = (currentIndex - 1 + lbItems.length) % lbItems.length;
    openLightbox(currentIndex);
}

function showNext() {
    if (!lbItems.length) return;
    currentIndex = (currentIndex + 1) % lbItems.length;
    openLightbox(currentIndex);
}

lbItems.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
});

lbCloseBtns.forEach((btn) => {
    btn.addEventListener("click", closeLightbox);
});

if (lbPrev) lbPrev.addEventListener("click", showPrev);
if (lbNext) lbNext.addEventListener("click", showNext);

document.addEventListener("keydown", (e) => {
    if (!lb || lb.hidden) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
});

/* ===============================
   NEWSLETTER POPUP
   rulează doar dacă există pe pagină
================================ */
const newsletterPopup = qs("#newsletter-popup");
const newsletterClose = qs("#newsletter-popup .close-btn");
const newsletterForm = qs("#newsletter-form");

if (newsletterPopup) {
    window.addEventListener("load", () => {
        setTimeout(() => {
            newsletterPopup.classList.add("show");
        }, 1800);
    });

    if (newsletterClose) {
        newsletterClose.addEventListener("click", () => {
            newsletterPopup.classList.remove("show");
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            newsletterPopup.classList.remove("show");
            newsletterForm.reset();
        });
    }
}

/* ===============================
   IMAGE PROTECTION
================================ */
document.addEventListener("contextmenu", (e) => {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }
});

document.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }
});