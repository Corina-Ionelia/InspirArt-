/* ===============================
   Helpers
================================*/

const qs = (s, p = document) => p.querySelector(s)
const qsa = (s, p = document) => [...p.querySelectorAll(s)]

/* ===============================
   MOBILE MENU
================================*/

const toggle = qs("[data-nav-toggle]")
const nav = qs("[data-nav]")

if (toggle && nav) {

    toggle.addEventListener("click", () => {

        const open = nav.classList.toggle("is-open")

        toggle.setAttribute(
            "aria-expanded",
            open
        )

    })

    qsa(".nav__link").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("is-open")
        })
    })

}

/* ===============================
   ACTIVE LINK
================================*/

const current = location.pathname.split("/").pop() || "index.html"

qsa(".nav__link").forEach(link => {
    if (link.getAttribute("href") === current) {
        link.classList.add("is-active")
    }
})

/* ===============================
   LIGHTBOX
================================*/

const lightbox = qs("[data-lightbox]")
const lightboxImg = qs("[data-lightbox-img]")
const lightboxCap = qs("[data-lightbox-caption]")
const closeBtn = qs("[data-lightbox-close]")

function openLightbox(src, cap) {

    lightbox.hidden = false

    lightboxImg.src = src
    lightboxCap.textContent = cap || ""

    document.body.style.overflow = "hidden"

}

function closeLightbox() {

    lightbox.hidden = true

    lightboxImg.src = ""
    lightboxCap.textContent = ""

    document.body.style.overflow = ""

}

qsa("[data-lightbox-item] img").forEach(img => {

    img.addEventListener("click", () => {

        const src = img.dataset.lightboxSrc || img.src
        const cap = img.dataset.lightboxCaption || img.alt

        openLightbox(src, cap)

    })

})

if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox)
}

if (lightbox) {

    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) closeLightbox()
    })

}

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !lightbox.hidden) {
        closeLightbox()
    }
})

/* ===============================
   IMAGE PROTECTION
================================*/

document.addEventListener("contextmenu", e => {
    if (e.target.tagName === "IMG") {
        e.preventDefault()
    }
})

document.addEventListener("dragstart", e => {
    if (e.target.tagName === "IMG") {
        e.preventDefault()
    }
})