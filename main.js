import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.onload = (event) => {

    console.clear();

    let initExpandableCards = false;

    // Expandable Cards -- START
    let active;
    let expanders = gsap.utils.toArray(".expandable-card");

    expanders.forEach((expander, index) => {

        let close = expander.querySelector(".close");
        let cardCover = expander.querySelector(".expandable-card-cover");
        let cardCoverContent = expander.querySelector(".expandable-card-cover-content");
        let cardContentTitle = expander.querySelector(".expandable-card-title");
        let cardContentDescription = expander.querySelector(".expandable-card-description");
        let cardContentList = expander.querySelector(".expandable-card__list");
        let expandableAnimation = gsap.timeline({paused:true});

        expandableAnimation.to(expander, {
            duration: .35,
            width: "44rem",
            ease: "power1.inOut",
        }).to(cardCoverContent, {
            autoAlpha: 0,
            scale: 0,
            duration: 0.3,
            ease: "back.in(1.7)",
        },"<").to(cardCover, {
            autoAlpha: 0,
        },"<73%").from(cardContentTitle, {
            autoAlpha: 0,
            x: 80,
        }).from(cardContentDescription, {
            autoAlpha: 0,
            x: 80,
        }, "<8%").from(cardContentList, {
            autoAlpha: 0,
            x: 80,
        }, "<8%")

        expander.animation = expandableAnimation;

        expander.addEventListener("click", function(){
            if(active){
                active.animation.reverse();
            }
            expander.animation.play();
            active = expander;
        })

        close.addEventListener("click", function(event){
            event.stopPropagation();
            expander.animation.reverse();
        });

        console.log(expander.animation);

    });

    if(!initExpandableCards) {
        expanders[0].animation.play();
        active = expanders[0];
    }
    initExpandableCards = true;

    // Expandable Cards -- END



    // ------------------------------------------------------------------ //
    //                            SCROLL SLIDER                           //
    // ------------------------------------------------------------------ //

    let scrollSliderContainer = document.querySelector('.activities-scroll-slider');
    console.log(scrollSliderContainer.offsetWidth);

    function getScrollAmount() {
        let scrollSliderContainerWidth = scrollSliderContainer.scrollWidth;
        console.log("---- getScrollAmount ----");
        console.log(-(scrollSliderContainerWidth - window.innerWidth / 2))
        return -(scrollSliderContainerWidth);
    }


    const tween = gsap.fromTo(scrollSliderContainer , {
        x: () => window.innerWidth,
        }, {
            x: getScrollAmount,
            duration: 3,
            ease: "none",
        });

    ScrollTrigger.create({
        trigger: ".activities-gallery",
        start: "top top",
        end: () => `+=${(getScrollAmount()) * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: true
    });


    const sections = gsap.utils.toArray(".activities-scroll-slider  div");

    sections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            containerAnimation: tween,
            animation: gsap.to(section, {
                scale: 0.5,
                opacity: 0,
            }),
            scrub: true,
            // pin: true,
            start: "left 30%",
            markers: true
        });
    });

};







// TODO: Obtener el ancho del slider en 'onload'. Crear una funcion
















