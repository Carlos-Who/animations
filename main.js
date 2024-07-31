import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { gsap } from "gsap";

let active;
let expanders = gsap.utils.toArray(".expander");
gsap.set(".expander", { backgroundColor:gsap.utils.wrap(["#987408", "#880570", "#05606a"])});
console.log("--------------------")
console.log(expanders);
console.log("--------------------")

let close = document.querySelector(".close");
console.log(close);

expanders.forEach((expander, index) => {
    console.log(index);
    // let close = expander.querySelector(".close");
    // console.log(close);
    let animation = gsap.timeline({paused:true});

    animation.to(expander, {
        width:250,
        duration:0.4
    }).from(close, {
        opacity:0,
        scale:0.4,
        duration:0.1,
        x:"-=10"
    }, "-=0.1");

    expander.animation = animation; // assign the animation to the current element

    expander.addEventListener("click", function(){
        if(active){
            active.animation.reverse(); // reverse (close) active element's animation
        }
        expander.animation.play(); // play (open) the clicked element's animation
        active = expander;
    })

    close.addEventListener("click", function(event){
        event.stopPropagation();
        expander.animation.reverse();
    });

    console.log(expander);

});



