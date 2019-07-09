import '@babel/polyfill';
import '../scss/main.scss';

import { query } from './utils';

import win from './utils/Window';
import io from './utils/io';
import scroll from './utils/Scroll';
import fallback from './utils/Fallback';

import accordion from './accordion';
import offersMenu from './offersMenu';
import shareSidebar from './shareSidebar';
import form from './form';
import newsletter from './newsletter';
import minions from './minions';
import makeBorders from './makeBorders';
import drawBorders from './drawBorders';
import video from './video';
import videoVimeo from './videoVimeo';
import learningAnim from './learningAnim';
import search from './search';
import memory from './memory';
import burger from './burger';
import customCheckbox from './customCheckbox';

// Dynamic imports
// const dynamicLoading = importPath => async () => {
//     const { default: defaultFunction } = await import(`./${importPath}`);
//     defaultFunction();
// };

// const minions = dynamicLoading('minions');

const state = {
    preloaded: false,
    loaded: false,
};

const preload = () => {
    const { readyState } = document;

    if (readyState !== 'interactive' && readyState !== 'complete') return;

    const noTransElem = query({
        selector: '.element-without-transition-on-resize',
    });

    state.preloaded = true;

    // Stéréosuper js library init
    scroll.init();
    win.setNoTransitionElts(noTransElem);
    win.init();
    io.init();
    fallback.init();

    // Custom scripts
    burger();
    customCheckbox();
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
    const [cats] = query({ selector: '#blog-cats' });
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
