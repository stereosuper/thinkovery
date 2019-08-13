// @babel/polyfill is necessary for async imports
import '@babel/polyfill';
import { query, bodyRouter, superLoad, superWindow } from '@stereorepo/sac';

import { Accordion } from '@stereorepo/accordion';

import '../scss/main.scss';
import { globalStyles, easing } from './global';

import io from './utils/io';

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

const preloadCallback = () => {
    superWindow.setBreakpoints({
        horizontal: {
            xs: 0,
            s: 400,
            m: 580,
            l: 780,
            xl: 960,
            xxl: 1100,
        },
        vertical: {
            xs: 550,
            xxl: 960,
        },
    });

    // Stéréosuper js library init
    io.init();

    // Stereorepo components init
    const accordion = new Accordion({
        containerSelector: '.wp-block-stereoberg-question-answer',
        clickedSelector: 'h3',
        contentSelector: '.answer-content',
        contentWrapperSelector: '.js-answer',
        offsetY: globalStyles.lineHeight,
        ease: easing.easeFade,
        scrollDelay: 600,
    });

    accordion.initializeAccordions();

    // Components with global use
    burger();
    customCheckbox();
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

const animationsHandler = () => {
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

const loadCallback = () => {
    makeBorders();

    if (sessionStorage.getItem('loaded')) {
        animationsHandler();
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

document.addEventListener('loaderHidden', animationsHandler, false);

superLoad.initializeLoadingShit({
    preloadCallback,
    loadCallback,
    noTransElementsClass: '.element-without-transition-on-resize',
    initFallbacks: true,
});
