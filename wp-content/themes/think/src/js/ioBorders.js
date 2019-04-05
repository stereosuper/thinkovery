import { TweenMax, TimelineMax } from 'gsap';
import { createNewEvent } from './utils';
import win from './utils/Window';
import { colors, easing } from './global';

const ioBorders = () => {
    const { body } = document;
    const isHome = body.classList.contains('home');
    const bordersWrapper = document.getElementById('borders');

    if (!bordersWrapper && !isHome) return;
    const state = {
        display: false,
        isMoving: false,
        queue: [],
        nextSection: null,
        speedFactor: 1,
    };

    const borderMapping = {
        top: { index: 0, origin: '0% 50%' },
        right: { index: 1, origin: '50% 0%' },
        left: { index: 3, origin: '50% 100%' },
        bottom: { index: 2, origin: '100% 50%' },
    };

    const bordersAnimations = {
        intro: {
            borders: [
                {
                    position: 'top',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
                {
                    position: 'all',
                    duration: 0.5,
                    color: colors.funGreen,
                    easing: 'out',
                    nestNext: false,
                },
                {
                    position: 'right',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'y',
                    easing: 'out',
                },
                {
                    position: 'bottom',
                    duration: 0.5,
                    maxScale: 0.5,
                    axis: 'x',
                    easing: 'out',
                },
            ],
        },
        learningExperience: {
            borders: [
                {
                    position: 'bottom',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
                {
                    position: 'all',
                    color: colors.pictonBlue,
                    duration: 0.5,
                    easing: 'out',
                    nestNext: false,
                },
                {
                    position: 'left',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'y',
                    easing: 'out',
                },
                {
                    position: 'top',
                    duration: 0.5,
                    maxScale: 0.25,
                    axis: 'x',
                    easing: 'out',
                },
            ],
        },
        offers: {
            borders: [
                {
                    position: 'top',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
                {
                    position: 'all',
                    color: colors.funGreen,
                    duration: 0.5,
                    easing: 'out',
                    nestNext: false,
                },
                {
                    position: 'right',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'y',
                    easing: 'out',
                },
                {
                    position: 'top',
                    duration: 0.5,
                    maxScale: 0,
                    axis: 'x',
                    origin: '100% 50%',
                    easing: 'out',
                    nestNext: false,
                },
                {
                    position: 'bottom',
                    duration: 0.5,
                    maxScale: 0.75,
                    axis: 'x',
                    easing: 'out',
                },
            ],
        },
        aboutUs: {
            borders: [
                {
                    position: 'bottom',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
                {
                    position: 'all',
                    color: colors.persimmon,
                    duration: 0.5,
                    easing: 'out',
                    nestNext: false,
                },
                {
                    position: 'left',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'y',
                    easing: 'out',
                },
                {
                    position: 'bottom',
                    duration: 0.5,
                    maxScale: 0.25,
                    axis: 'x',
                    origin: '0% 50%',
                    easing: 'out',
                    nestNext: false,
                },
                {
                    position: 'top',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
            ],
        },
        experiences: {
            borders: [
                {
                    position: 'top',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
                {
                    position: 'all',
                    color: colors.darkOrange,
                    duration: 0.5,
                    easing: 'out',
                    nestNext: false,
                },
                {
                    position: 'right',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'y',
                    easing: 'out',
                },
                {
                    position: 'top',
                    duration: 0.5,
                    maxScale: 0.25,
                    axis: 'x',
                    origin: '100% 0%',
                    easing: 'out',
                    nestNext: false,
                },
                {
                    position: 'bottom',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
            ],
        },
    };

    const [catWrapper] = bordersWrapper.getElementsByClassName('cat');
    const bordersCat = catWrapper.children;

    const handleDisplay = () => {
        const { display } = getComputedStyle(bordersWrapper);

        state.display = display !== 'none';
    };

    handleDisplay();

    const processQueue = () => {
        state.isMoving = false;
        if (!state.queue.length) return;

        const event = createNewEvent('updateQueue');
        [state.nextSection] = state.queue;

        state.queue.shift();
        bordersWrapper.dispatchEvent(event);
    };

    const animateBorder = ({ borders }) => {
        const [
            {
                position,
                duration,
                color,
                maxScale,
                axis,
                origin,
                nestNext = true,
            },
            nextBorder,
        ] = borders;

        let ease = '';
        if (easing === 'in') {
            ease = easing.catMouseEaseIn;
        } else if (easing === 'out') {
            ease = easing.catMouseEaseOut;
        }

        const isAll = position === 'all';

        let scaleX = null;
        let scaleY = null;
        if (!isAll) {
            scaleX = axis === 'x' ? maxScale : 1;
            scaleY = axis === 'y' ? maxScale : 1;
        }

        const tweenParams = {
            transformOrigin:
                origin || (!isAll ? borderMapping[position].origin : ''),
            scaleX,
            scaleY,
            ease,
            onComplete: () => {
                if (!nestNext) return;
                if (nextBorder) {
                    borders.shift();
                    animateBorder({ borders });
                } else {
                    processQueue();
                }
            },
        };

        if (color) {
            tweenParams.backgroundColor = color;
        }

        TweenMax.to(
            isAll ? bordersCat : bordersCat[borderMapping[position].index],
            duration / state.speedFactor,
            tweenParams
        );
        if (!nestNext && nextBorder) {
            borders.shift();
            animateBorder({ borders });
        }
    };

    const updateBorder = () => {
        if (state.isMoving) return;

        state.isMoving = true;
        switch (state.nextSection) {
            case 'home-intro':
                animateBorder(bordersAnimations.intro);
                break;
            case 'home-learning-experience':
                animateBorder(bordersAnimations.learningExperience);
                break;
            case 'home-offers':
                animateBorder(bordersAnimations.offers);
                break;
            case 'home-about-us':
                animateBorder(bordersAnimations.aboutUs);
                break;
            case 'home-experiences':
                animateBorder(bordersAnimations.experiences);
                break;
            default:
                break;
        }
    };

    bordersWrapper.addEventListener(
        'updateBorders',
        () => {
            const borderNextSection = bordersWrapper.getAttribute(
                'data-next-section'
            );

            if (state.isMoving) {
                state.queue.push(borderNextSection);
                state.speedFactor = Math.max(1, state.queue.length * 0.75);
            } else {
                state.nextSection = borderNextSection;
                updateBorder();
            }
        },
        false
    );

    bordersWrapper.addEventListener('updateQueue', updateBorder, false);

    win.addResizeFunction(() => {
        handleDisplay();
        if (state.display && state.queue.length) {
            processQueue();
        }
    });
};

export default ioBorders;
