import 'gsap/ScrollToPlugin';
import { forEach } from './utils';
import { TweenMax } from 'gsap';
import { easing, globalStyles } from './global';

const burgerHandler = () => {
    const accordions = document.querySelectorAll(
        '.wp-block-stereoberg-question-answer'
    );

    if (!accordions.length) return;

    forEach(accordions, accordion => {
        const title = accordion.querySelector('h3');

        title.addEventListener(
            'click',
            () => {
                const parent = title.parentElement;
                const answer = title.parentElement.querySelector('.js-answer');

                let maxHeight = 0;
                forEach(answer.children, child => {
                    maxHeight += child.getBoundingClientRect().height;
                });

                const alreadyActivated = parent.classList.contains('activated');

                forEach(accordions, resetParent => {
                    resetParent.classList.remove('activated');
                    TweenMax.to(resetParent.querySelector('.js-answer'), 0.3, {
                        maxHeight: 0,
                        opacity: 0,
                        ease: easing.easeFade,
                    });
                });

                if (!alreadyActivated) {
                    TweenMax.to(answer, 0.3, {
                        maxHeight,
                        opacity: 1,
                        ease: easing.easeFade,
                    });
                    parent.classList.add('activated');

                    setTimeout(() => {
                        const offset =
                            title.getBoundingClientRect().top + window.scrollY;
                        TweenMax.to(window, 0.5, {
                            scrollTo: {
                                y: offset,
                                offsetY: globalStyles.lineHeight,
                            },
                            ease: easing.easeFade,
                        });
                    }, 600);
                }
            },
            false
        );
    });
};

export default burgerHandler;
