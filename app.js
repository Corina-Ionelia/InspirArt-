const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/* ===============================
   MOBILE MENU
================================ */
const hamburger = qs(".hamburger");
const navMenu = qs("#header .nav-list > ul");

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
}

/* ===============================
   SUBMENUS
================================ */
const submenuParents = qsa(".has-submenu");

submenuParents.forEach((parent) => {
    const toggle = qs(".submenu-toggle", parent);

    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
        e.preventDefault();

        submenuParents.forEach((item) => {
            if (item !== parent) item.classList.remove("open");
        });

        parent.classList.toggle("open");
        toggle.classList.toggle("is-active", parent.classList.contains("open"));
    });
});

/* close menu on link click */
qsa("#header a").forEach((link) => {
    link.addEventListener("click", () => {
        if (navMenu) navMenu.classList.remove("active");
        if (hamburger) {
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        }
        document.body.classList.remove("menu-open");
        submenuParents.forEach((item) => item.classList.remove("open"));
    });
});

/* click outside submenu */
document.addEventListener("click", (e) => {
    const insideNav = e.target.closest(".nav-list");
    if (!insideNav) {
        submenuParents.forEach((item) => item.classList.remove("open"));
    }
});

/* ===============================
   ACTIVE LINKS
================================ */
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const currentHash = window.location.hash || "";

qsa("#header a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const [pagePart, hashPart] = href.split("#");

    const samePage = pagePart === currentPage || (pagePart === "" && currentPage === "index.html");
    const sameHash = hashPart ? `#${hashPart}` === currentHash : true;

    if ((pagePart === currentPage && !hashPart) || (pagePart === currentPage && sameHash)) {
        link.classList.add("is-active");
    }
});

/* mark parent submenu active if child active */
submenuParents.forEach((parent) => {
    const toggle = qs(".submenu-toggle", parent);
    const activeChild = qs(".submenu a.is-active", parent);
    if (toggle && activeChild) {
        toggle.classList.add("is-active");
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

lbCloseBtns.forEach((btn) => btn.addEventListener("click", closeLightbox));
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