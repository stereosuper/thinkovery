import '../scss/main.scss';

import win from './utils/Window';
import io from './utils/io';
import scroll from './utils/Scroll';
import fallback from './utils/Fallback';

import form from './form';
import burger from './burger';
import newsletter from './newsletter';
import ioBorders from './ioBorders';
import homeBorders from './homeBorders';


const loadHandler = () => {
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
    form();
    burger();
    newsletter();
    homeBorders();
    ioBorders();
};


if (document.readyState === 'complete') {
    loadHandler();
} else {
    document.addEventListener(
        'readystatechange',
        () => {
            if (document.readyState === 'complete') {
                loadHandler();
            }
        },
        false
    );
}
