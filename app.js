const background = document.querySelector(".background");



/*
    تبدیل عنوان به span
*/

const titles = document.querySelectorAll(".content h1");


titles.forEach((title) => {

    const text = title.textContent.trim();

    title.innerHTML = "";


    [...text].forEach((char) => {

        const span = document.createElement("span");

        span.textContent =
            char === " "
                ? "\u00A0"
                : char;

        title.appendChild(span);

    });

});



/*
    ساخت Swiper
*/

const swiper = new Swiper(".mySwiper", {

    effect: "coverflow",

    grabCursor: true,

    centeredSlides: true,

    slidesPerView: 3,

    spaceBetween: 30,

    loop: true,

    speed: 1000,


    autoplay: {

        delay: 3500,

        disableOnInteraction: false,

    },


    coverflowEffect: {

        rotate: 35,

        stretch: 0,

        depth: 250,

        modifier: 1,

        slideShadows: true,

    },


    pagination: {

        el: ".swiper-pagination",

        clickable: true,

    },


    navigation: {

        nextEl: ".swiper-button-next",

        prevEl: ".swiper-button-prev",

    },


    breakpoints: {

        320: {

            slidesPerView: 1,

        },


        768: {

            slidesPerView: 1,

        },


        1100: {

            slidesPerView: 2,

        }

    },


    on: {

        init() {

            animateSlide(
                this.slides[this.activeIndex]
            );

        },


        slideChangeTransitionStart() {

            animateSlide(
                this.slides[this.activeIndex]
            );

        }

    }

});



/*
    Animation
*/

function animateSlide(slide) {


    if (!slide) return;



    const img =
        slide.querySelector("img");


    const title =
        slide.querySelectorAll("h1 span");


    const paragraph =
        slide.querySelector("p");


    const button =
        slide.querySelector("button");



    /*
        Background
    */

    changeBackground(slide);



    /*
        Kill previous animation
    */

    gsap.killTweensOf([

        img,

        title,

        paragraph,

        button

    ]);



    /*
        Image initial state
    */

    gsap.set(img, {

        scale: 1.25,

        x: -50,

    });



    /*
        Title initial state
    */

    gsap.set(title, {

        opacity: 0,

        y: 60,

    });



    /*
        Paragraph initial state
    */

    gsap.set(paragraph, {

        opacity: 0,

        y: 30,

    });



    /*
        Button initial state
    */

    gsap.set(button, {

        opacity: 0,

        y: 20,

    });



    /*
        Timeline
    */

    const tl = gsap.timeline();



    /*
        Image
    */

    tl.to(img, {

        scale: 1,

        x: 0,

        duration: 1.2,

        ease: "power3.out",

    });



    /*
        Title
        حرف به حرف
    */

    tl.to(title, {

        opacity: 1,

        y: 0,

        duration: .7,

        stagger: .04,

        ease: "power3.out",

    }, "-=.7");



    /*
        Paragraph
    */

    tl.to(paragraph, {

        opacity: 1,

        y: 0,

        duration: .6,

        ease: "power3.out",

    }, "-=.4");



    /*
        Button
    */

    tl.to(button, {

        opacity: 1,

        y: 0,

        duration: .5,

        ease: "back.out(1.7)",

    }, "-=.3");

}



/*
    تغییر Background
*/

function changeBackground(slide) {


    const bg =
        slide.dataset.bg;


    if (!bg) return;



    gsap.to(background, {

        opacity: 0,

        duration: .4,

        onComplete: () => {

            background.style.backgroundImage =
                `url("${bg}")`;


            gsap.to(background, {

                opacity: 1,

                duration: .8,

            });

        }

    });

}