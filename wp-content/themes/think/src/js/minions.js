import { TweenMax } from 'gsap';
import { offset } from './utils';
import { easing } from './global';

const minionsHandler = () => {
    const minions = document.querySelectorAll('.shape');

    if( !minions.length ) return;


    const video = document.getElementById('home-video');
    const tlPlayer = new TimelineMax();
    const wh = window.innerHeight;
    const easeIn = Power2.easeOut;
    
    const minionsTop = minions[2].getBoundingClientRect().top;
    const windowBottom = wh - minionsTop - window.scrollY;


    tlPlayer.to(minions, 0.3, {scale: 1, ease: easeIn})
        .to(minions[2], 0.3, {scale: 3, onComplete: () => {
            if( video ){
                video.classList.add('player-on');
                video.classList.add('on');
                TweenMax.set(video.querySelector('.iframe'), {opacity: 1, delay: 0.7});
            }
        }, ease: easeIn})
        .to(minions[2], 0.2, {scale: 2.15, ease: easeIn})
        .to(minions[2], 0.7, {y: windowBottom-40, rotation: 90, ease: easeIn, delay: 0.3})
        .to(minions[2], 0.4, {y: windowBottom-50, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[2], 0.4, {y: windowBottom-35, ease: easeIn}); 
        }, repeat: -1, repeatDelay: 3}); 

    TweenMax.to(minions[0], 1.4, {bezier: {curviness: 1, values: [{x: -100, y: -30}, {x: -200, y: 0}, {x: -250, y: windowBottom/3}, {x: -280, y: (windowBottom/3)*2}, {x: -290, y: windowBottom + 40}], autoRotate: true}, delay: 0.15, ease: easeIn, onComplete: () => { minions[0].style.display = 'none'; }});

    TweenMax.to(minions[1], 1.4, {bezier: {curviness: 1, values: [{x: -50, y: -70}, {x: -100, y: -50}, {x: -140, y: windowBottom/3}, {x: -170, y: (windowBottom/3)*2}, {x: -180, y: windowBottom + 20}], autoRotate: true}, delay: 0.15, ease: easeIn, onComplete: () => { minions[1].style.display = 'none'; }});

    TweenMax.to(minions[3], 1.4, {bezier: {curviness: 1, values: [{x: 50, y: -60}, {x: 100, y: -40}, {x: 140, y: windowBottom/3}, {x: 170, y: (windowBottom/3)*2}, {x: 180, y: windowBottom + 100}], autoRotate: true}, delay: 0.15, ease: easeIn, onComplete: () => { minions[3].style.display = 'none'; }});

    TweenMax.to(minions[4], 1.4, {bezier: {curviness: 1, values: [{x: 100, y: -10}, {x: 190, y: 10}, {x: 250, y: windowBottom/3}, {x: 280, y: (windowBottom/3)*2}, {x: 290, y: windowBottom + 70}], autoRotate: true}, delay: 0.15, ease: easeIn, onComplete: () => { minions[4].style.display = 'none'; }});
    
};

export default minionsHandler;
