import { TweenMax } from 'gsap';
import { easing } from './global';
import { forEach, roundNumbers } from './utils';
import scroll from './utils/Scroll';

const scrollBorders = () => {
    const { body } = document;
    const isHome = body.classList.contains('home');
    const bordersWrapper = document.getElementById('borders');

    if (!bordersWrapper && !isHome) return;
    const state = {
        activeId: '',
        observables: {},
    };

    const [mouseWrapper] = bordersWrapper.getElementsByClassName('mouse');
    const bordersMouse = mouseWrapper.children;
    const homeSections = [].slice.call(
        document.getElementsByClassName('js-home-section')
    );

    const samplesNumber = 1000;
    const borderMapping = {
        top: { index: 0, origin: '0% 50%' },
        right: { index: 1, origin: '50% 0%' },
        left: { index: 3, origin: '50% 100%' },
        bottom: { index: 2, origin: '100% 50%' },
    };

    const findActiveId = () => {
        [state.activeId] = Object.entries(state.observables).reduce(
            (acc, currentObservable) => {
                let biggestRatio = acc;
                if (currentObservable[1].ratio) {
                    biggestRatio = currentObservable;
                }
                return biggestRatio;
            },
            ['', { ratio: 0 }]
        );
    };

    const pathIntro = () => {};

    const animatePath = ({ borders }) => {
        const { ratio } = state.observables[state.activeId];
        const ratioFactor = borders.reduce(
            (acc, current) => acc + current.maxScale,
            0
        );
        let pathRatio = 0;

        forEach(borders, border => {
            const scale =
                ratio > pathRatio / ratioFactor
                    ? Math.min(
                          border.maxScale,
                          (ratio - pathRatio / ratioFactor) * ratioFactor
                      )
                    : 0;
            TweenMax.set(bordersMouse[borderMapping[border.position].index], {
                transformOrigin: borderMapping[border.position].origin,
                scaleX:
                    border.position === 'top' || border.position === 'bottom'
                        ? scale
                        : 1,
                scaleY:
                    border.position === 'left' || border.position === 'right'
                        ? scale
                        : 1,
            });
            pathRatio += border.maxScale;
        });
    };

    const selectPath = () => {
        switch (state.activeId) {
            case 'home-intro':
                animatePath({
                    borders: [
                        { position: 'left', maxScale: 0 },
                        { position: 'top', maxScale: 1 },
                        { position: 'right', maxScale: 1 },
                        { position: 'bottom', maxScale: 0.5 },
                    ],
                });
                break;
            case 'home-learning-experience':
                animatePath({
                    borders: [
                        { position: 'right', maxScale: 0 },
                        { position: 'bottom', maxScale: 1 },
                        { position: 'left', maxScale: 1 },
                        { position: 'top', maxScale: 0.25 },
                    ],
                });
                break;
            case 'home-offers':
                animatePath({
                    borders: [
                        { position: 'left', maxScale: 0 },
                        { position: 'top', maxScale: 1 },
                        { position: 'right', maxScale: 1 },
                        { position: 'bottom', maxScale: 0.75 },
                    ],
                });
                break;
            case 'home-about-us':
                animatePath({
                    borders: [
                        { position: 'right', maxScale: 0 },
                        { position: 'bottom', maxScale: 1 },
                        { position: 'left', maxScale: 1 },
                        { position: 'top', maxScale: 1 },
                    ],
                });
                break;
            case 'home-experiences':
                animatePath({
                    borders: [
                        { position: 'left', maxScale: 0 },
                        { position: 'top', maxScale: 0 },
                        { position: 'right', maxScale: 1 },
                        { position: 'bottom', maxScale: 1 },
                    ],
                });
                break;
            default:
                break;
        }
    };

    const thresholdSamples = [];

    for (let index = 0; index <= samplesNumber; index += 1) {
        thresholdSamples.push(index / samplesNumber);
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: thresholdSamples,
    };

    const intersectionCallback = entries => {
        forEach(entries, entry => {
            const ratio = roundNumbers(entry.intersectionRatio, 5);
            if (ratio > 0) {
                state.observables[entry.target.id].ratio = ratio;
            } else {
                state.observables[entry.target.id].ratio = 0;
            }
        });
    };

    const observer = new IntersectionObserver(
        intersectionCallback,
        observerOptions
    );

    forEach(homeSections, section => {
        state.observables[section.id] = { ratio: 0 };
        observer.observe(section);
    });

    scroll.addScrollFunction(() => {
        findActiveId();
        if (state.activeId) {
            selectPath();
        }
    });
};

export default scrollBorders;
