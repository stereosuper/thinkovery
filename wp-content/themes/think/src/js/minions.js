import { TweenMax } from 'gsap';
import { forEach } from './utils';
//import { easing } from './global';
import win from './utils/Window';

const minionsHandler = () => {
    const homeSections = [].slice.call(
        document.getElementsByClassName('js-home-section')
    );
    const minions = document.querySelectorAll('.shape');

    if( !homeSections.length || !minions.length ) return;

    const easeIn = Power2.easeOut;
    let wh = window.innerHeight;
    let ww = window.innerWidth;
    let animsDone = [];
    const headerBottom = wh - minions[2].getBoundingClientRect().top - window.scrollY;
    
    // Constants used to create the intersection observer threshold array
    const samplesNumber = 10;
    const thresholdSamples = [];
    let index = 0;
    let observer = null;


    const headerAnim = () => {
        const video = document.getElementById('home-video');

        animsDone['home-intro'].running = true;

        if( !video ){
            // todo: placer les truc au bon endroit en set, au cas ou l'utilisateur arrive ailleurs sur la page
            animsDone['home-intro'].done = true;
            return;
        }
        
        const tlPlayer = new TimelineMax();
        const tl = new TimelineMax();

        tlPlayer.to(minions[2], 0.3, {scale: 1, ease: easeIn})
        .to(minions[2], 0.3, {scale: 4, onComplete: () => {
            if( video ){
                video.classList.add('player-on');
                video.classList.add('on');
                TweenMax.set(video.querySelector('.iframe'), {opacity: 1, delay: 0.7});
            }
        }, ease: easeIn})
        .to(minions[2], 0.2, {scale: 3, ease: easeIn})
        .to(minions[2], 0.7, {y: headerBottom-40, rotation: 90, ease: easeIn, delay: 0.3})
        .to(minions[2], 0.4, {y: headerBottom-50, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[2], 0.4, {y: headerBottom-35, ease: easeIn}); 
        }, repeat: -1, repeatDelay: 3});

        tl
        .add([
            TweenMax.to(minions, 0.3, {scale: 1, ease: easeIn}),
            TweenMax.to(minions[0], 1.4, {bezier: {curviness: 1, values: [{x: -100, y: -30}, {x: -200, y: 0}, {x: -250, y: headerBottom/3}, {x: -280, y: (headerBottom/3)*2}, {x: -240, y: headerBottom + 100}]}, delay: 0.15, ease: easeIn}),
            TweenMax.to(minions[1], 1.4, {bezier: {curviness: 1, values: [{x: -50, y: -70}, {x: -100, y: -50}, {x: -140, y: headerBottom/3}, {x: -170, y: (headerBottom/3)*2}, {x: -130, y: headerBottom + 100}]}, delay: 0.15, ease: easeIn}),
            TweenMax.to(minions[3], 1.4, {bezier: {curviness: 1, values: [{x: 50, y: -60}, {x: 100, y: -40}, {x: 140, y: headerBottom/3}, {x: 170, y: (headerBottom/3)*2}, {x: 130, y: headerBottom + 100}]}, delay: 0.15, ease: easeIn}),
            TweenMax.to(minions[4], 1.4, {bezier: {curviness: 1, values: [{x: 100, y: -10}, {x: 190, y: 10}, {x: 250, y: headerBottom/3}, {x: 280, y: (headerBottom/3)*2}, {x: 240, y: headerBottom + 100}]}, delay: 0.15, ease: easeIn})
        ])
        .to(minions, 0.3, {scale: 3, onComplete: () => {
            animsDone['home-intro'].done = true;
        }, ease: easeIn});
    };

    const learningAnim = () => {
        const windowBottom = homeSections[1].getBoundingClientRect().top + window.pageYOffset;

        console.log(window.pageYOffset);

        animsDone['home-learning-experience'].running = true;

        TweenMax.to(minions[2], 0.3, {y: headerBottom + 100, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[0], 1.4, {bezier: {curviness: 1, values: [{x: -20, y: windowBottom/2}, {x: 200, y: windowBottom - 40}]}, ease: easeIn});
        }});

        // TweenMax.to(minions[0], 1.4, {bezier: {curviness: 1, values: [{x: -20, y: windowBottom/2}, {x: 200, y: windowBottom - 40 + 'px'}]}, ease: easeIn});
        // TweenMax.to(minions[1], 1.4, {bezier: {curviness: 1, values: [{x: -120, y: windowBottom/2}, {x: -100, y: windowBottom + 100 + 'px'}]}, ease: easeIn, onComplete: () => {  
        //     TweenMax.to(minions[1], 0.3, {opacity: 0});
        // }});
        // TweenMax.to(minions[2], 1.4, {bezier: {curviness: 1, values: [{x: 20, y: windowBottom/2}, {x: 100, y: windowBottom + 70 + 'px'}]}, ease: easeIn, onComplete: () => {  
        //     TweenMax.to(minions[2], 0.3, {opacity: 0});
        // }});
        // TweenMax.to(minions[3], 1.4, {bezier: {curviness: 1, values: [{x: 40, y: windowBottom/2}, {x: 150, y: windowBottom + 120 + 'px'}]}, ease: easeIn, onComplete: () => {  
        //     TweenMax.to(minions[3], 0.3, {opacity: 0});
        // }});
        // TweenMax.to(minions[4], 1.4, {bezier: {curviness: 1, values: [{x: 30, y: windowBottom/2}, {x: 130, y: windowBottom + 100 + 'px'}]}, ease: easeIn, onComplete: () => {  
        //     TweenMax.to(minions[4], 0.3, {opacity: 0});
        // }});
    };

    const intersectionCallback = entries => {
        forEach( entries, entry => {
            if( entry.intersectionRatio < 0.85 || animsDone[entry.target.id].running ) return;

            switch( entry.target.id ){
                case 'home-intro':
                    headerAnim();
                    break;
                case 'home-learning-experience':
                    if( animsDone['home-intro'].done ) learningAnim();
                    break;
                case 'home-offers':
                    break;
                case 'home-about-us':
                    break;
                case 'home-experiences':
                    break;
                default:
                    break;
            }
        } );
    };


    for( index; index <= samplesNumber; index ++ ){
        thresholdSamples[index] = index / samplesNumber;
    }

    observer = new IntersectionObserver(intersectionCallback, {
        root: null,
        rootMargin: '0px',
        threshold: thresholdSamples,
    });

    forEach( homeSections, section => {
        observer.observe(section);
        animsDone[section.id] = {running: false, done: false};
    } );

    win.addResizeFunction(() => {
        wh = window.innerHeight;
        ww = window.innerWidth;
    });
    
};

export default minionsHandler;
