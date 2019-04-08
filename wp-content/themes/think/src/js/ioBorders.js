import { TweenMax } from 'gsap';
import { createNewEvent } from './utils';
import win from './utils/Window';
import { colors, easing } from './global';

const ioBorders = () => {
    const bordersWrapper = document.getElementById('borders');

    if (!bordersWrapper && !document.body.classList.contains('home')) return;
    
    // Borders html elements
    const bordersCat = bordersWrapper.querySelector('.cat').children;

    // Borders animations state
    const state = {
        display: false,
        isMoving: false,
        queue: [],
        nextSection: null,
        speedFactor: 1,
    };

    // Borders transformations data
    const borderMapping = {
        top: { index: 0, origin: '0% 50%' },
        right: { index: 1, origin: '50% 0%' },
        left: { index: 3, origin: '50% 100%' },
        bottom: { index: 2, origin: '100% 50%' },
        reset: {
            top: { origin: '100% 50%' },
            right: { origin: '50% 100%' },
            bottom: { origin: '0% 50%' },
            left: { origin: '50% 0%' },
        },
    };

    // Borders reset sequences
    const bordersAnimationsReset = {
        intro: {
            borders: [
                { position: 'bottom', duration: 0.5 },
                { position: 'left', duration: 0.5 },
            ],
        },
        learningExperience: {
            borders: [
                { position: 'top', duration: 0.5 },
                { position: 'right', duration: 0.5 },
            ],
        },
        offers: {
            borders: [
                { position: 'bottom', duration: 0.5 },
                { position: 'left', duration: 0.5 },
            ],
        },
        aboutUs: {
            borders: [
                { position: 'top', duration: 0.5 },
                { position: 'right', duration: 0.5 },
            ],
        },
        experiences: {
            borders: [
                { position: 'bottom', duration: 0.5 },
                { position: 'left', duration: 0.5 },
            ],
        },
    };

    // Borders update sequences
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

    /**
     * @description updates display state depending on borders style
     */
    const handleDisplay = () => {
        state.display = getComputedStyle(bordersWrapper).display !== 'none';
    };

    /**
     * @description queuing process if a border animation is currently playing
     */
    const processQueue = () => {
        state.isMoving = false;
        
        if (!state.queue.length) return;

        const event = createNewEvent('updateQueue');

        [state.nextSection] = state.queue;
        state.queue.shift();
        bordersWrapper.dispatchEvent(event);
    };

    /**
     * @description reset previous animation
     * @param {array} { borders }
     * @param {function} cb
     */
    const resetBorders = ({ borders }, cb) => {
        const [{ position, duration }, nextBorder] = borders;
        
        TweenMax.to(bordersCat[borderMapping[position].index], duration, {
            transformOrigin: borderMapping.reset[position].origin,
            scaleX: position === 'top' || position === 'bottom' ? 0 : 1,
            scaleY: position === 'left' || position === 'right' ? 0 : 1,
            onComplete: () => {
                nextBorder ?
                    resetBorders(
                        { borders: borders.slice(1, borders.length) },
                        cb
                    );
                : cb();
            }
        });
    };

    /**
     * @description update next section borders
     * @param {array} { borders }
     */
    const animateBorder = ({ borders }) => {
        const [{
                position,
                duration,
                color,
                maxScale,
                axis,
                origin,
                nestNext = true,
            }, nextBorder] = borders;
        
        const isAll = position === 'all';

        let ease = '';
        if (easing === 'in') {
            ease = easing.catMouseEaseIn;
        } else if (easing === 'out') {
            ease = easing.catMouseEaseOut;
        }

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

                nextBorder ?
                    animateBorder({
                        borders: borders.slice(1, borders.length),
                    });
                : processQueue();
            }
        };

        if (color) {
            tweenParams.backgroundColor = color;
        }

        TweenMax.to(
            isAll ? bordersCat : bordersCat[borderMapping[position].index],
            duration / state.speedFactor,
            tweenParams
        );

        if (nestNext || !nextBorder) return;

        borders.shift();
        animateBorder({ borders });
    };

    /**
     * @description border sections animation controller
     */
    const updateBorder = () => {
        if (state.isMoving) return;

        state.isMoving = true;

        switch (state.nextSection) {
            case 'home-intro':
                resetBorders(bordersAnimationsReset.intro, () => {
                    animateBorder(bordersAnimations.intro);
                });
                break;
            case 'home-learning-experience':
                resetBorders(bordersAnimationsReset.learningExperience, () => {
                    animateBorder(bordersAnimations.learningExperience);
                });
                break;
            case 'home-offers':
                resetBorders(bordersAnimationsReset.offers, () => {
                    animateBorder(bordersAnimations.offers);
                });
                break;
            case 'home-about-us':
                resetBorders(bordersAnimationsReset.aboutUs, () => {
                    animateBorder(bordersAnimations.aboutUs);
                });
                break;
            case 'home-experiences':
                resetBorders(bordersAnimationsReset.experiences, () => {
                    animateBorder(bordersAnimations.experiences);
                });
                break;
            default:
                break;
        }
    };

    // Main calls
    handleDisplay();

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
        
        if (!state.display || !state.queue.length) return;
        processQueue();
    });
};

export default ioBorders;
