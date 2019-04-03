import '../scss/main.scss';

import win from './utils/Window';
import io from './utils/io';
import scroll from './utils/Scroll';
import fallback from './utils/Fallback';

import burger from './burger';
import ioBorders from './ioBorders';

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
    ioBorders();
    burger();
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
