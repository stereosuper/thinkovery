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
import search from './search';

import collant from 'collant';
import imagesLoaded from 'imagesloaded';

// IE11 closest polyfill
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;

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

    if( readyState !== 'interactive' && readyState !== 'complete' ) return;

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
    search();
    newsletter();
    video();
};

const animationHandler = () => {
    drawBorders();
    minions();
    learningAnim();
};

const load = () => {
    if( document.readyState !== 'complete' ) return;

    state.loaded = true;
    makeBorders();

    if( sessionStorage.getItem('loaded') ){
        animationHandler();
    }

    // blog sticky share
    if( document.getElementById('article') ){
        imagesLoaded( document.getElementById('article'), () => {
            collant(document.getElementById('share'), 0, {
                minimumWidth: 1100
            });
        } );
    }

    const cats = document.getElementById('blog-cats');
    if( cats ){
        cats.addEventListener('click', () => {
            cats.classList.toggle('on');
        });
    }
};


preload();
load();

document.addEventListener('readystatechange', () => {

    if( !state.preloaded ) preload();
    if( !state.loaded ) load();

}, false);

document.addEventListener('loaderHidden', animationHandler, false);
