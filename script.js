document.querySelectorAll(".slider-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        const id = btn.dataset.target
        const track = document.querySelector(`.slider-track[data-id="${id}"]`)
        const container = track.parentElement

        const scrollAmount = 320

        if(btn.classList.contains("next")){
            container.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            })
        }

        if(btn.classList.contains("prev")){
            container.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            })
        }

    })

})



/* LIGHTBOX */

const slides = document.querySelectorAll(".slide img")

const lightbox = document.createElement("div")
lightbox.classList.add("lightbox")

const lightboxImg = document.createElement("img")

lightbox.appendChild(lightboxImg)
document.body.appendChild(lightbox)



slides.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.classList.add("active")
        lightboxImg.src = img.src

    })

})


lightbox.addEventListener("click", () => {

    lightbox.classList.remove("active")

})
