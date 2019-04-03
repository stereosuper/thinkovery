import { TweenMax, TimelineMax } from 'gsap';
import { colors, easing } from './global';
import scroll from './utils/Scroll';
import { forEach } from './utils';

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

    const test = homeSections.map(border => ({
        top: border.getBoundingClientRect().top,
        height: border.getBoundingClientRect().height,
    }));

    scroll.addScrollFunction(() => {
        const { scrollTop } = scroll;

        // for
        // if (scrollTop+window.innerHeight >= ) {
        // }
    });
};

export default scrollBorders;
