import { superWindow } from '@stereorepo/sac';
import { Collant } from '@stereorepo/collant';
import imagesLoaded from 'imagesloaded';
import { TweenMax } from 'gsap';
import 'gsap/ScrollToPlugin';

import { easing, globalStyles } from '../global';
import { forEach, query } from '../utils';

const offersMenuHandler = () => {
    const [offersMenu] = query({ selector: '#offers-menu' });

    if (!offersMenu) return;
    const state = {
        collant: false
    };

    const [offers] = query({ selector: '#offers' });
    let menuHeight = offersMenu.getBoundingClientRect().height;
    const anchors = [...offersMenu.getElementsByTagName('a')];


    const collant = new Collant({
        selector: '#offers-menu',
        box: '#offers',
        offsetTop: '0px',
    });
    collant.stickIt();
    state.collant = true;

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

    superWindow.addResizeFunction(() => {
        menuHeight = offersMenu.getBoundingClientRect().height;
        if (!state.collant && superWindow.windowWidth < 960) {
            collant.ripIt();
            state.collant = false;
        } else if (state.collant) {
            collant.stickIt();
            state.collant = true;
        }
    });
};

export default offersMenuHandler;
