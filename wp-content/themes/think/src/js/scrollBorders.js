import { TweenMax, TimelineMax } from 'gsap';
import { colors, easing } from './global';
import scroll from './utils/Scroll';
import { forEach, roundNumbers } from './utils';

const scrollBorders = () => {
    const { body } = document;
    const isHome = body.classList.contains('home');
    const bordersWrapper = document.getElementById('borders');

    if (!bordersWrapper && !isHome) return;

    const [mouseWrapper] = bordersWrapper.getElementsByClassName('mouse');
    const bordersMouse = mouseWrapper.children;
    const homeSections = [].slice.call(
        document.getElementsByClassName('js-home-section')
    );

    // const test = homeSections.map(border => ({
    //     top: border.getBoundingClientRect().top,
    //     height: border.getBoundingClientRect().height,
    // }));

    // scroll.addScrollFunction(() => {
    //     const { scrollTop } = scroll;

    //     // for
    //     // if (scrollTop+window.innerHeight >= ) {
    //     // }
    // });

    const thresholdSamples = [];

    for (let index = 0; index <= 100; index += 1) {
        thresholdSamples.push(index / 100);
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: thresholdSamples,
    };

    const intersectionCallback = entries => {
        forEach(entries, entry => {
            const ratio = roundNumbers(entry.intersectionRatio, 2);
            entry.target.innerText = ratio;
        });
    };

    const observer = new IntersectionObserver(
        intersectionCallback,
        observerOptions
    );

    forEach(homeSections, section => {
        observer.observe(section);
    });
};

export default scrollBorders;
