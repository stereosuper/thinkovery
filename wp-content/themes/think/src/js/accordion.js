import 'gsap/ScrollToPlugin';
import { forEach, query } from './utils';
import { TweenMax } from 'gsap';
import { easing, globalStyles } from './global';

const accordionHandler = () => {
    const accordions = query({
        selector: '.wp-block-stereoberg-question-answer',
    });

    if (!accordions.length) return;

    forEach(accordions, accordion => {
        const [title] = query({ selector: 'h3', ctx: accordion });

        title.addEventListener(
            'click',
            () => {
                const parent = title.parentElement;
                const answer = query({
                    selector: '.js-answer',
                    ctx: title.parentElement,
                });
                const alreadyActivated = parent.classList.contains('activated');
                const [answerContent] = query({
                    selector: '.answer-content',
                    ctx: title.parentElement,
                });
                const maxHeight = answerContent.getBoundingClientRect().height;

                forEach(accordions, resetParent => {
                    resetParent.classList.remove('activated');
                    TweenMax.to(
                        query({ selector: '.js-answer', ctx: resetParent }),
                        0.3,
                        {
                            maxHeight: 0,
                            opacity: 0,
                            ease: easing.easeFade,
                        }
                    );
                });

                if (alreadyActivated) return;

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
            },
            false
        );
    });
};

export default accordionHandler;
