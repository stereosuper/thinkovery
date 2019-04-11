import { TweenMax } from 'gsap';
import { forEach } from './utils';
//import { easing } from './global';
import win from './utils/Window';

const minionsHandler = () => {
    const homeSections = [].slice.call(
        document.getElementsByClassName('js-home-section')
    );
    const minions = homeSections[0].querySelectorAll('.shape');

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
        const windowBottom = homeSections[1].offsetHeight - 100;
        const duration = 1.4;

        animsDone['home-learning-experience'].running = true;

        TweenMax.to(minions[2], 0.3, {y: headerBottom + 100, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[0], 1, {bezier: {curviness: 1, values: [{x: '+=60', y: '+=' + windowBottom/2}, {x: '+=200', y: '+=' + (windowBottom - 100)}]}, ease: easeIn});

            TweenMax.to(minions[1], duration, {bezier: {curviness: 1, values: [{y: '+=' + windowBottom/2}, {x: '+=10', y: '+=' + (windowBottom + 110)}]}, ease: easeIn});

            TweenMax.to(minions[2], duration, {rotation: 0, bezier: {curviness: 1, values: [{y: '+=' + windowBottom/2}, {y: '+=' + (windowBottom + 140)}]}, ease: easeIn});

            TweenMax.to(minions[3], duration, {bezier: {curviness: 1, values: [{x: '+=80', y: '+=' + windowBottom/2}, {x: '-=10', y: '+=' + (windowBottom + 170)}]}, ease: easeIn});

            TweenMax.to(minions[4], duration, {bezier: {curviness: 1, values: [{x: '+=80', y: '+=' + windowBottom/2}, {x: '-=20', y: '+=' + (windowBottom + 200)}]}, ease: easeIn, onComplete: () => {
                animsDone['home-learning-experience'].done = true;
            }});
        }});
    };

    const offersAnim = () => {
        const duration = 0.3;
        const delay = 0.05;

        animsDone['home-offers'].running = true;
        
        TweenMax.to(minions[3], duration, {y: '+=30', ease: easeIn});
        TweenMax.to(minions[2], duration, {y: '+=60', ease: easeIn, delay: delay});
        TweenMax.to(minions[1], duration, {y: '+=90', ease: easeIn, delay: delay*2});
        TweenMax.to(minions[0], duration, {bezier: {curviness: 1, values: [{x: '-=60', y: '+=150'}, {x: '-=200', y: '+=300'}]}, ease: easeIn, delay: delay/*, onComplete: () => {
            animsDone['home-offers'].done = true;
        }*/});
    };

    const aboutAnim = () => {
        const minions = homeSections[3].querySelectorAll('.shape');
        const windowBottom = homeSections[3].offsetHeight - 300;
        const duration = 0.8;
        const durationSmall = 0.2;
        const delay = 0.2;

        animsDone['home-about-us'].running = true;

        // arrow  1
        TweenMax.to(minions[9], durationSmall, {scale: 1, opacity: 1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[9], duration, {y: windowBottom, rotation: -110, ease: easeIn});
        }});
        // triangle 1
        TweenMax.to(minions[3], durationSmall, {scale: 1, opacity: 1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[3], duration, {y: windowBottom, rotation: -90, ease: easeIn});
        }, delay: delay});
        // drop
        TweenMax.to(minions[0], durationSmall, {scale: 1, opacity: 1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[0], duration, {y: windowBottom, ease: easeIn});
        }, delay: delay*2});
        //square 1
        TweenMax.to(minions[1], durationSmall, {scale: 1, opacity: 1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[1], duration, {y: windowBottom + 5, rotation: 45, ease: easeIn});
        }, delay: delay*3});
        // rectangle 1
        TweenMax.to(minions[7], durationSmall, {scale: 1, opacity: 1, scaleX: -1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[7], duration, {y: windowBottom, ease: easeIn});
        }, delay: delay*4});
        //triangle 2
        TweenMax.to(minions[5], durationSmall, {scale: 1, opacity: 1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[5], duration, {y: windowBottom, rotation: -90, ease: easeIn});
        }, delay: delay*5});
        //square 2
        TweenMax.to(minions[2], durationSmall, {scale: 1, opacity: 1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[2], duration, {y: windowBottom - 31, rotation: -7, ease: easeIn});
        }, delay: delay*6});
        // rectangle 2
        TweenMax.to(minions[8], durationSmall, {scale: 1, opacity: 1, scaleX: -1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[8], duration, {y: windowBottom - 75, ease: easeIn});
        }, delay: delay*7});
        // arrow  2
        TweenMax.to(minions[10], durationSmall, {scale: 1, opacity: 1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[10], duration, {y: windowBottom - 65, rotation: -140, ease: easeIn});
        }, delay: delay*8});
        //triangle 3
        TweenMax.to(minions[4], durationSmall, {scale: 1, opacity: 1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[4], duration, {y: windowBottom - 55, rotation: -135, ease: easeIn});
        }, delay: delay*9});
        // rectangle 3
        TweenMax.to(minions[6], durationSmall, {scale: 1, opacity: 1, scaleX: -1, ease: easeIn, onComplete: () => {
            TweenMax.to(minions[6], duration, {y: windowBottom - 59, ease: easeIn/*, onComplete: () => {
                animsDone['home-about-us'].done = true;
            }*/});
        }, delay: delay*10});
    };

    const intersectionCallback = entries => {
        forEach( entries, entry => {
            if( entry.intersectionRatio < 0.7 || animsDone[entry.target.id].running ) return;

            switch( entry.target.id ){
                case 'home-intro':
                    headerAnim();
                    break;
                case 'home-learning-experience':
                    if( animsDone['home-intro'].done ) learningAnim();
                    break;
                case 'home-offers':
                    if( animsDone['home-learning-experience'].done ) offersAnim();
                    break;
                case 'home-about-us':
                    aboutAnim();
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
