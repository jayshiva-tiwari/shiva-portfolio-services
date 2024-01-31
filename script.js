
const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const gradientX = (mouseX / card.offsetWidth) * 100 + '%';
        const gradientY = (mouseY / card.offsetHeight) * 100 + '%';

        card.style.setProperty('--gradient-center', `at ${gradientX} ${gradientY}`);
    });
});

const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}
