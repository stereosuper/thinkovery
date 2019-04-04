import { TweenMax, TimelineMax } from 'gsap';

const videoHandler = () => {
    const tag = document.createElement('script');
    const firstScriptTag = document.getElementsByTagName('script')[0];
    const videos = document.querySelectorAll('.js-video');

    if( !videos.length ) return;
    
    let players = [];

    global.onYouTubeIframeAPIReady = () => {
        const onPlayerReady = (wrapper) => {
            wrapper.addEventListener('click', () => {
                TweenMax.to(wrapper.querySelector('.cover'), 0.5, {opacity: 0, display: 'none'});
                players[wrapper.getAttribute('data-id')].playVideo();
            });
            
            wrapper.querySelector('.cover').classList.add('on');
        };

        videos.forEach(elt => {
            players[elt.getAttribute('data-id')] = new YT.Player(elt.querySelector('.iframe'), {
                videoId: elt.getAttribute('data-id'),
                events: {
                    'onReady': onPlayerReady(elt)
                }
            });
        });
    };

    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

export default videoHandler;
