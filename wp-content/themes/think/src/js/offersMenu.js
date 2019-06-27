import 'gsap/ScrollToPlugin';
import { forEach } from './utils';
import { TweenMax } from 'gsap';
import { easing, globalStyles } from './global';

const offersMenuHandler = () => {
    const offersMenu = document.getElementById('offers-menu');

    if (!offersMenu) return;
    const menuHeight = offersMenu.getBoundingClientRect().height;
    const anchors = [...offersMenu.getElementsByTagName('a')];

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
};

export default offersMenuHandler;
