import '../scss/main.scss';

import win from './utils/Window';
import io from './utils/io';
import scroll from './utils/Scroll';
import fallback from './utils/Fallback';

import form from './form';
import burger from './burger';
import newsletter from './newsletter';
import makeBorders from './makeBorders';
import scrollBorders from './scrollBorders';
import ioBorders from './ioBorders';
import video from './video';

const state = {
    preloaded: false,
    loaded: false,
};

const preloadHandler = () => {
    const noTransElem = [].slice.call(
        document.getElementsByClassName('element-without-transition-on-resize')
    );

    // Stéréosuper js library init
    scroll.init();
    win.setNoTransitionElts(noTransElem);
    win.init();
    io.init();
    fallback.init();

    // Custom scripts
    burger();
    form();
    newsletter();
    video();
};

const loadHandler = () => {
    makeBorders();
};

const animationHandler = () => {
    scrollBorders();
    ioBorders();
};

const preload = () => {
    const { readyState } = document;
    if (readyState === 'interactive' || readyState === 'complete') {
        state.preloaded = true;
        preloadHandler();
    }
};

const load = () => {
    const { readyState } = document;
    if (readyState === 'complete') {
        state.loaded = true;
        loadHandler();
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
