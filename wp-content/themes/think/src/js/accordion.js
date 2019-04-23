import 'gsap/ScrollToPlugin';
import { forEach } from './utils';
import { TweenMax } from 'gsap';
import { easing, globalStyles } from './global';

const burgerHandler = () => {
    const accordions = document.querySelectorAll('.js-accordion-module');

    if (!accordions.length) return;

    forEach(accordions, accordion => {
        const titles = accordion.querySelectorAll('h3');
        forEach(titles, title => {
            title.addEventListener(
                'click',
                () => {
                    const parent = title.parentElement;
                    const answer = title.parentElement.querySelector(
                        '.js-answer'
                    );

                    let maxHeight = 0;
                    forEach(answer.children, child => {
                        maxHeight += child.getBoundingClientRect().height;
                    });

                    const alreadyActivated = parent.classList.contains(
                        'activated'
                    );

                    forEach(titles, tabToReset => {
                        const resetParents = tabToReset.parentElement;
                        resetParents.classList.remove('activated');
                        TweenMax.to(
                            resetParents.querySelector('.js-answer'),
                            0.3,
                            {
                                maxHeight: 0,
                                opacity: 0,
                                ease: easing.easeFade,
                            }
                        );
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
                                title.getBoundingClientRect().top +
                                window.scrollY;
                            TweenMax.to(window, 0.5, {
                                scrollTo: {
                                    y: offset,
                                    offsetY: globalStyles.lineHeight,
                                },
                                ease: easing.easeFade,
                            });
                        }, 500);
                    }
                },
                false
            );
        });
    });
};

// if (body.hasClass('single-job')) {
//     const tabs = $('.js-job-details-tab');
//     if (tabs.length) {
//         tabs.on('click', 'h2', function tabState() {
//             if (window.innerWidth <= 767) {
//                 const tab = $(this).parent();
//                 const currentIndex = tab.index();

//                 let height = 0;

//                 tabs.each((index, tabToReset) => {
//                     if (index !== currentIndex) {
//                         const jTabToReset = $(tabToReset);
//                         jTabToReset.css({
//                             maxHeight: jTabToReset.find('h2').outerHeight(true),
//                         });
//                         jTabToReset.removeClass('active');
//                     }
//                 });

//                 if (tab.hasClass('active')) {
//                     height = $(this).outerHeight(true);
//                 } else {
//                     tab.children().each((index, child) => {
//                         height += $(child).outerHeight(true);
//                     });
//                 }

//                 tab.css({ maxHeight: height });

//                 const duration = tab.css('transition-duration');
//                 let delay = 0;
//                 if (duration.indexOf('ms') !== -1) {
//                     delay += parseInt(duration.replace('ms'), 10);
//                 } else {
//                     delay += parseFloat(duration.replace('s')) * 1000;
//                 }

//                 setTimeout(() => {
//                     const offset = tab.offset().top - header.outerHeight();
//                     TweenMax.to(window, 0.5, {
//                         scrollTo: { y: offset },
//                         ease: Cubic.easeOut,
//                     });
//                 }, delay);

//                 tab.toggleClass('active');
//             }
//         });
//     }
// }

export default burgerHandler;
