import React,{useEffect} from 'react';
import './Landingpage.css';
import gsap from 'gsap';
import { Flip } from 'gsap/all'; 

gsap.registerPlugin(Flip);

function Landingpage() {
    useEffect(() => {
        let layouts = ["final", "plain", "columns", "grid"],
		container = document.querySelector(".container"),
		curLayout = 0; // index of the current layout

        function nextState() {
        const state = Flip.getState(".letter, .for, .gsap", {props: "color,backgroundColor", simple: true}); // capture current state
        
        container.classList.remove(layouts[curLayout]); // remove old class
        curLayout = (curLayout + 1) % layouts.length;   // increment (loop back to the start if at the end)
        container.classList.add(layouts[curLayout]);    // add the new class

        Flip.from(state, { // animate from the previous state
            absolute: true,
            stagger: 0.07,
            duration: 0.7,
            ease: "power2.inOut",
            spin: curLayout === 0, // only spin when going to the "final" layout
            simple: true,
            onEnter: (elements, animation) => gsap.fromTo(elements, {opacity: 0}, {opacity: 1, delay: animation.duration() - 0.1}),
            onLeave: elements => gsap.to(elements, {opacity: 0})
        });

        gsap.delayedCall(curLayout === 0 ? 3.5 : 1.5, nextState);
        }

        gsap.delayedCall(1, nextState);
      }, []);

  return (
    
<div>
    
    <div class="x-section hero">
        <div class="x-heroparticles">
            <div class="x-herocard _3"><img src="https://assets.website-files.com/566bb476dd70a5ff30ddc006/5fdb2204448f421424670238_52A.png" loading="lazy" alt="" class="x-herocardimage" /></div>
            <div class="x-herocard _2"><img src="https://assets.website-files.com/566bb476dd70a5ff30ddc006/5fdb21f5451dbbe4ad80bbf4_6.png" loading="lazy" alt="" class="x-herocardimage" /></div>
            <div class="x-herocard _4"><img src="https://assets.website-files.com/566bb476dd70a5ff30ddc006/5fdb225edec20ff5f745fe2c_13.png" loading="lazy" alt="" class="x-herocardimage" /></div>
            <div class="x-herocard _5"><img src="https://assets.website-files.com/566bb476dd70a5ff30ddc006/5fdb227adf45b7079ceeaef5_42A.png" loading="lazy" alt="" class="x-herocardimage" /></div>
            <div class="x-herocard _6"><img src="https://assets.website-files.com/566bb476dd70a5ff30ddc006/5fdc8c89cf8bf2676d8235e9_36A.png" loading="lazy" alt="" class="x-herocardimage" /></div>
            <div class="x-herocard _7"><img src="https://assets.website-files.com/566bb476dd70a5ff30ddc006/5fdc8c132ad01959085c4cad_10.png" loading="lazy" alt="" class="x-herocardimage" /></div>
            <div class="x-herocard _8"><img src="https://assets.website-files.com/566bb476dd70a5ff30ddc006/5fdb223c4ffb41dbbea0eee0_36.png" loading="lazy" alt="" class="x-herocardimage" /></div>
            <div class="x-herocard"><img src="https://assets.website-files.com/566bb476dd70a5ff30ddc006/5fdb221fa703dc8336b586da_51.png" loading="lazy" alt="" class="x-herocardimage" /></div>
        </div>
        <div class="x-wrapper hero">
            <h1 class="x-title large">Open-sourcing<br/>Where even small contribution matters</h1>
            <div class="x-text">Discover ongoing GitHub open-source projects easily. Filter by language, activity, and more. Seamlessly explore repositories. Join us in open collaboration!</div>
            <a  href="/data" class="x-rainbowbutton w-inline-block">
                <div>See all projects</div>
                <div class="x-rainbowbuttonblur"></div>
            </a>
            <div class="x-buttondisclaimer">No Worries...it&#x27;s free </div>
        </div>
    </div>
    <div class="banner">
    <div class="container final">
            <div class="letter F">F</div>
            <div class="letter l">U</div>
            <div class="letter i">C</div>
            <div class="letter p">K</div>        
            <div class="gsap">OPEN-SOURCING</div>
        </div>
    </div>
    <div class="x-section">
        <div class="x-persontags">
            
            <div class="x-persontagsoverlay" style={{ paddingTop: '400px', paddingBottom: '300px' }}>
                <div class="x-wrapper thanks"><img src="https://assets.website-files.com/566bb476dd70a5ff30ddc006/5fdb433c05a8959163762f48_That%27s%20all.svg" loading="lazy" alt="" class="image-2" />
                    <h1 class="x-title large">Thanks to all backers and contributors.</h1>
                    <div class="text-block">Built by   &amp; </div>
                </div>
            </div>
            
        </div>
    
</div>
</div>

  );
}

export default Landingpage;