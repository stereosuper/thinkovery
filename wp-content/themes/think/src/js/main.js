import '../scss/main.scss';

import win from './utils/Window';
import io from './utils/io';
import scroll from './utils/Scroll';
import fallback from './utils/Fallback';

import burger from './burger';
import accordion from './accordion';
import form from './form';
import newsletter from './newsletter';
import makeBorders from './makeBorders';
import drawBorders from './drawBorders';
import video from './video';
import minions from './minions';
import learningAnim from './learningAnim';

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
    form();
    newsletter();
    video();
};

const animationHandler = () => {
    drawBorders();
    minions();
    learningAnim();
};

const load = () => {
    if (document.readyState !== 'complete') return;

    state.loaded = true;
    makeBorders();

    if (sessionStorage.getItem('loaded')) {
        animationHandler();
    }
};

preload();
load();

document.addEventListener(
    'readystatechange',
    () => {
        if (!state.preloaded) {
            preload();
        }

        if (!state.loaded) {
            load();
        }
    },
    false
);

document.addEventListener('loaderHidden', animationHandler, false);
