import { TweenMax, TimelineMax } from 'gsap';
import { colors, easing } from './global';
import { createNewEvent } from './utils';

const scrollBorders = () => {
    const { body } = document;
    const isHome = body.classList.contains('home');
    const bordersWrapper = document.getElementById('borders');

    if (!bordersWrapper && !isHome) return;
    const [mouseWrapper] = bordersWrapper.getElementsByClassName('mouse');
    const bordersMouse = mouseWrapper.children;
};

export default scrollBorders;
