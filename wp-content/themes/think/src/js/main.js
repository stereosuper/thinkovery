import '../scss/main.scss';

import win from './utils/Window';
import io from './utils/io';
import scroll from './utils/Scroll';
import fallback from './utils/Fallback';

import accordion from './accordion';
import offersMenu from './offersMenu';
import shareSidebar from './shareSidebar';
import form from './form';
import newsletter from './newsletter';
import makeBorders from './makeBorders';
import drawBorders from './drawBorders';
import video from './video';
import videoVimeo from './videoVimeo';
import minions from './minions';
import learningAnim from './learningAnim';
import search from './search';
import memory from './memory';
import burger from './burger';

// Dynamic imports
// const burger = () => import('./burger');

// IE11 closest polyfill
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function closestPolyfill(s) {
        let el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);

        return null;
    };
}

const state = {
    preloaded: false,
    loaded: false,
};

const preload = () => {
    const { readyState } = document;

    if (readyState !== 'interactive' && readyState !== 'complete') return;

    const noTransElem = [].slice.call(
        document.getElementsByClassName('element-without-transition-on-resize')
    );

    state.preloaded = true;

    // Stéréosuper js library init
    scroll.init();
    win.setNoTransitionElts(noTransElem);
    win.init();
    io.init();
    fallback.init();

    // Custom scripts
    burger();
    accordion();
    offersMenu();
    shareSidebar();
    form();
    search();
    newsletter();
    video();
    videoVimeo();
    memory();
};

const animationHandler = () => {
    minions();
    drawBorders();
    learningAnim();
};

const load = () => {
    if (document.readyState !== 'complete') return;

    state.loaded = true;
    makeBorders();

    if (sessionStorage.getItem('loaded')) {
        animationHandler();
    }

    // blog categories
    const cats = document.getElementById('blog-cats');
    if (cats) {
        cats.addEventListener('click', () => {
            cats.classList.toggle('on');
        });
    }
};

preload();
load();

document.addEventListener(
    'readystatechange',
    () => {
        if (!state.preloaded) preload();
        if (!state.loaded) load();
    },
    false
);

document.addEventListener('loaderHidden', animationHandler, false);
