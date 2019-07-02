import collant from 'collant';
import imagesLoaded from 'imagesloaded';
import { TweenMax } from 'gsap';
import 'gsap/ScrollToPlugin';

import { easing, globalStyles } from './global';
import win from './utils/Window';
import { forEach, query } from './utils';

const offersMenuHandler = () => {
    const offersMenu = document.getElementById('offers-menu');

    if (!offersMenu) return;
    const [offers] = query('#offers');
    let menuHeight = offersMenu.getBoundingClientRect().height;
    const anchors = [...offersMenu.getElementsByTagName('a')];

    imagesLoaded(offers, () => {
        collant(offersMenu, 0, {
            minimumWidth: 960,
        });
    });

    forEach(anchors, anchor => {
        anchor.addEventListener(
            'click',
            event => {
                event.preventDefault();

                const sectionId = anchor.href
                    .split('/')
                    .pop()
                    .slice(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    setTimeout(() => {
                        const offset =
                            section.getBoundingClientRect().top +
                            window.scrollY -
                            menuHeight;
                        TweenMax.to(window, 0.5, {
                            scrollTo: {
                                y: offset,
                                offsetY: globalStyles.lineHeight,
                            },
                            ease: easing.easeFade,
                        });
                    }, 100);
                }
            },
            false
        );
    });

    win.addResizeFunction(() => {
        menuHeight = offersMenu.getBoundingClientRect().height;
    });
};

export default offersMenuHandler;
