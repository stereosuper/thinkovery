import { TweenMax } from 'gsap';
import { offset } from './utils';

const minionsHandler = () => {
    const minions = document.querySelectorAll('.shape');

    if( !minions.length ) return;


    const video = document.getElementById('home-video');
    const tl = new TimelineMax();
    const wh = window.innerHeight;
    
    const minionsTop = offset(minions[2]).top;
    const windowBottom = wh - minionsTop;


    tl.add([

        TweenMax.to(minions, 0.3, {scale: 1}),
        TweenMax.to(minions[0], 0.5, {x: '-200px'}),
        TweenMax.to(minions[1], 0.5, {x: '-100px', y: '-50px'}),
        TweenMax.to(minions[3], 0.5, {x: '100px', y: '-40px'}),
        TweenMax.to(minions[4], 0.5, {x: '190px', y: '10px'})

    ]).add([

        TweenMax.to(minions[2], 0.3, {scale: 2.35, onComplete: () => {
            if( video ){
                video.classList.add('player-on');
                video.classList.add('on');
                TweenMax.set(video.querySelector('.iframe'), {opacity: 1, delay: 0.5});
            }

            TweenMax.to(minions[2], 0.2, {scale: 2.15, delay: 0.5, onComplete: () => {
                TweenMax.to(minions[2], 1, {y: windowBottom-40 + 'px', rotation: 90});
            }});
        }}),
        TweenMax.to(minions[0], 1, {y: windowBottom + 40 + 'px', onComplete: () => {
            minions[0].style.display = 'none';
        }}),
        TweenMax.to(minions[1], 1, {y: windowBottom + 20 + 'px', onComplete: () => {
            minions[0].style.display = 'none';
        }}),
        TweenMax.to(minions[3], 1, {y: windowBottom + 100 + 'px', onComplete: () => {
            minions[0].style.display = 'none';
        }}),
        TweenMax.to(minions[4], 1, {y: windowBottom + 70 + 'px', onComplete: () => {
            minions[0].style.display = 'none';
        }})

    ]);
    
};

export default minionsHandler;
