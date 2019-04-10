import { TweenMax } from 'gsap';
import { forEach } from './utils';
//import { easing } from './global';
import win from './utils/Window';

const minionsHandler = () => {
    const homeSections = [].slice.call(
        document.getElementsByClassName('js-home-section')
    );

    if( !homeSections.length ) return;

    const easeIn = Power2.easeOut;
    let wh = window.innerHeight;
    let animsDone = [];
    
    // Constants used to create the intersection observer threshold array
    const samplesNumber = 1000;
    const thresholdSamples = [];
    let index = 0;
    let observer = null;


    const headerAnim = () => {
        const minions = homeSections[0].querySelectorAll('.shape');
        const video = document.getElementById('home-video');

        if( !video || !minions.length ) return;

        const minionsTop = minions[2].getBoundingClientRect().top;
        const windowBottom = wh - minionsTop - window.scrollY;
        const tlPlayer = new TimelineMax();

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

        TweenMax.to(minions[0], 1.4, {bezier: {curviness: 1, values: [{x: -100, y: -30}, {x: -200, y: 0}, {x: -250, y: windowBottom/3}, {x: -280, y: (windowBottom/3)*2}, {x: -290, y: windowBottom + 40}], autoRotate: true}, delay: 0.15, ease: easeIn, onComplete: () => { TweenMax.to(minions[0], 0.3, {opacity: 0}); }});

        TweenMax.to(minions[1], 1.4, {bezier: {curviness: 1, values: [{x: -50, y: -70}, {x: -100, y: -50}, {x: -140, y: windowBottom/3}, {x: -170, y: (windowBottom/3)*2}, {x: -180, y: windowBottom + 20}], autoRotate: true}, delay: 0.15, ease: easeIn, onComplete: () => { TweenMax.to(minions[1], 0.3, {opacity: 0}); }});

        TweenMax.to(minions[3], 1.4, {bezier: {curviness: 1, values: [{x: 50, y: -60}, {x: 100, y: -40}, {x: 140, y: windowBottom/3}, {x: 170, y: (windowBottom/3)*2}, {x: 180, y: windowBottom + 100}], autoRotate: true}, delay: 0.15, ease: easeIn, onComplete: () => { TweenMax.to(minions[3], 0.3, {opacity: 0}); }});

        TweenMax.to(minions[4], 1.4, {bezier: {curviness: 1, values: [{x: 100, y: -10}, {x: 190, y: 10}, {x: 250, y: windowBottom/3}, {x: 280, y: (windowBottom/3)*2}, {x: 290, y: windowBottom + 70}], autoRotate: true}, delay: 0.15, ease: easeIn, onComplete: () => { TweenMax.to(minions[4], 0.3, {opacity: 0}); }});

        animsDone['home-intro'] = true;
    };

    const learningAnim = () => {
        const minions = homeSections[1].querySelectorAll('.shape');

        if( !minions.length ) return;

        const minionsTop = minions[2].getBoundingClientRect().top;

        animsDone['home-learning-experience'] = true;
    };

    const intersectionCallback = entries => {
        forEach( entries, entry => {
            if( entry.intersectionRatio <= 0 || animsDone[entry.target.id] ) return;

            switch( entry.target.id ){
                case 'home-intro':
                    headerAnim();
                    break;
                case 'home-learning-experience':
                    learningAnim();
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
        animsDone[section.id] = false;
    } );

    win.addResizeFunction(() => {
        wh = window.innerHeight;
    });
    
};

export default minionsHandler;
