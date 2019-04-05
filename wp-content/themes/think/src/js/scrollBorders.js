import { TweenMax } from 'gsap';
import { forEach } from './utils';
import scroll from './utils/Scroll';
import win from './utils/Window';

const scrollBorders = () => {
    const bordersWrapper = document.getElementById('borders');

    if ( !bordersWrapper && !document.body.classList.contains('home') ) return;

    const state = {
        display: false,
        activeId: '',
        activeSection: { id: '', ratio: 0 },
    };

    const bordersMouse = bordersWrapper.querySelector('.mouse').children;
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

    const thresholdSamples = [];

    let index = 0;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: thresholdSamples,
    };
    let observer;


    const handleDisplay = () => {
        state.display = getComputedStyle(bordersWrapper).display !== 'none';
    };

    const animatePath = ({ borders }) => {
        const { ratio } = state.activeSection;
        const ratioFactor = borders.reduce(
            (acc, current) => acc + current.maxScale,
            0
        );
        let pathRatio = 0;
        let scale = 0;

        forEach(borders, border => {
            scale =
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
        switch (state.activeSection.id) {
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

    const intersectionCallback = entries => {
        if ( !state.display ) return;

        forEach(entries, entry => {
            if ( entry.intersectionRatio <= 0 ) return;
            
            state.activeSection.id = entry.target.id;
            state.activeSection.ratio = entry.intersectionRatio;
        });
    };

    
    for (index; index <= samplesNumber; index += 1) {
        thresholdSamples[index] = index / samplesNumber;
    }

    observer = new IntersectionObserver(
        intersectionCallback,
        observerOptions
    );

    forEach(homeSections, section => {
        observer.observe(section);
    });

    handleDisplay();

    scroll.addScrollFunction(() => {
        if ( !state.display && !state.activeSection.id ) return;
        selectPath();
    });

    win.addResizeFunction(() => {
        handleDisplay();
    });
};

export default scrollBorders;