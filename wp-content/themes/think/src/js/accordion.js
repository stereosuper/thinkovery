import { forEach } from './utils';

const burgerHandler = () => {
    const state = {
        burgerActivated: false,
    };

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
                        resetParents.querySelector(
                            '.js-answer'
                        ).style.maxHeight = 0;
                    });

                    if (!alreadyActivated) {
                        answer.style.maxHeight = `${maxHeight}px`;
                        parent.classList.add('activated');
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
