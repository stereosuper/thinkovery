import '@babel/polyfill';
import '../scss/main.scss';

import { query, bodyRouter } from './utils';

import win from './utils/Window';
import io from './utils/io';
import scroll from './utils/Scroll';
import fallback from './utils/Fallback';

import accordion from './components/accordion';
import form from './components/form';
import newsletter from './components/newsletter';
import makeBorders from './components/makeBorders';
import video from './components/video';
import videoVimeo from './components/videoVimeo';
import burger from './components/burger';
import customCheckbox from './components/customCheckbox';
import drawBorders from './components/drawBorders';

// ⚠️ DO NOT REMOVE ⚠️
// Dynamic imports function
const dynamicLoading = ({ name }) => async () => {
    // Do not use multiple variables for the import path, otherwise the chunck name will be composed of all the variables (and not the last one)
    const {
        default: defaultFunction,
    } = await import(/* webpackChunkName: "[request]" */ `./components/${name}`);
    defaultFunction();
};
// ⚠️ DO NOT REMOVE ⚠️

// Dynamic imports
const offersMenu = dynamicLoading({ name: 'offersMenu' });
const shareSidebar = dynamicLoading({ name: 'shareSidebar' });
const search = dynamicLoading({ name: 'search' });
const contactSidebar = dynamicLoading({ name: 'contactSidebar' });
const memory = dynamicLoading({ name: 'memory' });
const minions = dynamicLoading({ name: 'minions' });
const learningAnim = dynamicLoading({ name: 'learningAnim' });

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

    // Components with global use
    burger();
    customCheckbox();
    accordion();
    video();
    videoVimeo();
    newsletter();
    form();

    // Offers template route
    bodyRouter({ identifier: '.page-template-offers', callback: offersMenu });

    // Single post template route
    bodyRouter({ identifier: '.single-post', callback: shareSidebar });

    // Blog search template route
    bodyRouter({ identifier: '#searchform', callback: search });

    // Contact template route
    bodyRouter({
        identifier: '.page-template-contact',
        callback: contactSidebar,
    });

    // 404 template route
    bodyRouter({ identifier: '.error404', callback: memory });
};

const animationHandler = () => {
    drawBorders();

    // Home route
    bodyRouter({
        identifier: '.home',
        callback: minions,
    });

    // Learning template route
    bodyRouter({
        identifier: '.page-template-learning',
        callback: learningAnim,
    });
};

const load = () => {
    if (document.readyState !== 'complete') return;

    state.loaded = true;
    makeBorders();

    if (sessionStorage.getItem('loaded')) {
        animationHandler();
    }

    // blog categories
    bodyRouter({ identifier: '#blog-cats' }, () => {
        const [cats] = query({ selector: '#blog-cats' });
        if (cats) {
            cats.addEventListener('click', () => {
                cats.classList.toggle('on');
            });
        }
    });
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
