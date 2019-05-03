import { TweenMax } from 'gsap';
import { forEach } from './utils';

const videoHandler = () => {
    const tag = document.createElement('script');
    const firstScriptTag = document.getElementsByTagName('script')[0];
    const videos = document.querySelectorAll('.js-video');

    if (!videos.length) return;

    const players = [];

    window.onYouTubeIframeAPIReady = () => {
        const onPlayerReady = ({ id, videoElement }) => {
            const cover = videoElement.querySelector('.cover');
            const wrapperPlayer = videoElement.querySelector('.wrapper-player');
            const crosses = videoElement.querySelectorAll('.js-cross');

            const videoElementsOpacity = ({ opacity }) => {
                TweenMax.to([cover, wrapperPlayer], 0.3, { opacity });
            };

            cover.addEventListener(
                'click',
                () => {
                    videoElementsOpacity({ opacity: 0 });

                    players[id].playVideo();
                    videoElement.classList.add('playing');
                },
                false
            );

            forEach(crosses, cross => {
                cross.addEventListener(
                    'click',
                    () => {
                        players[id].pauseVideo();
                        videoElement.classList.remove('playing');

                        videoElementsOpacity({ opacity: 1 });
                    },
                    false
                );
            });
        };

        forEach(videos, videoElement => {
            const id = videoElement.getAttribute('data-id');
            players[id] = new window.YT.Player(
                videoElement.querySelector('.iframe'),
                {
                    videoId: id,
                    events: {
                        onReady: onPlayerReady({ videoElement, id }),
                    },
                }
            );
        });
    };

    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

export default videoHandler;
