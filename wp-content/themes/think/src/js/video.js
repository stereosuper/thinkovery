import { TweenMax } from 'gsap';
import { forEach } from './utils';

const videoHandler = () => {
    const tag = document.createElement('script');
    const firstScriptTag = document.getElementsByTagName('script')[0];
    const videos = document.querySelectorAll('.js-video');

    if (!videos.length) return;

    const players = [];

    global.onYouTubeIframeAPIReady = () => {
        const onPlayerReady = wrapper => {
            wrapper.addEventListener('click', () => {
                TweenMax.to(
                    [
                        wrapper.querySelector('.cover'),
                        wrapper.querySelector('.wrapper-player'),
                    ],
                    0.2,
                    { opacity: 0, display: 'none' }
                );
                players[wrapper.getAttribute('data-id')].playVideo();
                document
                    .querySelector(
                        `[data-id="${wrapper.getAttribute('data-id')}"]`
                    )
                    .classList.add('playing');
            });
        };

        forEach(videos, elt => {
            players[elt.getAttribute('data-id')] = new YT.Player(
                elt.querySelector('.iframe'),
                {
                    videoId: elt.getAttribute('data-id'),
                    events: {
                        onReady: onPlayerReady(elt),
                    },
                }
            );
        });
    };

    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

export default videoHandler;
