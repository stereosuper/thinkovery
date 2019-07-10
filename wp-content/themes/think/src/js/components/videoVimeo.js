import VimeoPlayer from '@vimeo/player';
import { TweenMax } from 'gsap';
import { forEach, query } from '../utils';

const videoHandler = () => {
    const videos = document.querySelectorAll('.js-video-vimeo');

    if (!videos.length) return;

    const players = [];

    const onPlayerReady = ({ id, videoElement }) => {
        const [cover] = query({ selector: '.cover', ctx: videoElement });
        const [wrapperPlayer] = query({
            selector: '.wrapper-player',
            ctx: videoElement,
        });
        const crosses = query({ selector: '.js-cross', ctx: videoElement });

        const videoElementsOpacity = ({ opacity }) => {
            TweenMax.to([cover, wrapperPlayer], 0.3, { opacity });
        };

        cover.addEventListener(
            'click',
            () => {
                videoElementsOpacity({ opacity: 0 });

                players[id].play();
                videoElement.classList.add('playing');
            },
            false
        );

        forEach(crosses, cross => {
            cross.addEventListener(
                'click',
                () => {
                    players[id].pause();
                    videoElement.classList.remove('playing');

                    videoElementsOpacity({ opacity: 1 });
                },
                false
            );
        });
    };

    forEach(videos, videoElement => {
        const id = videoElement.getAttribute('data-id');
        const playerWidth = videoElement.getAttribute('data-width');

        players[id] = new VimeoPlayer(`vimeo-id-${id}`, {
            id,
            width: playerWidth || 1920,
        });
        players[id].on('loaded', () => {
            onPlayerReady({ id, videoElement });
        });
    });
};

export default videoHandler;
