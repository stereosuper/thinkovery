import { TweenMax } from 'gsap';

const minionsHandler = () => {
    const minions = document.querySelectorAll('.shape');
    const video = document.getElementById('home-video');
    const tl = new TimelineMax();

    if( !minions.length ) return;

    tl.add([
        TweenMax.to(minions, 0.3, {scale: 1}),
        TweenMax.to(minions[0], 0.3, {x: '-200px'}),
        TweenMax.to(minions[1], 0.3, {x: '-100px', y: '-50px'}),
        TweenMax.to(minions[3], 0.3, {x: '100px', y: '-40px'}),
        TweenMax.to(minions[4], 0.3, {x: '190px', y: '10px'})
    ]).to(minions[2], 0.3, {scale: 2, onComplete: () => {
        if( video ) video.classList.add('on');
    }});
    
};

export default minionsHandler;
