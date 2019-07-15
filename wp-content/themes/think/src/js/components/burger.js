import { superWindow } from '@stereorepo/sac';

const burgerHandler = () => {
    const state = {
        burgerActivated: false,
    };

    const burger = document.getElementById('burger');
    const mainNav = document.getElementById('main-navigation');

    if (!burger) return;

    const navigationToggle = () => {
        state.burgerActivated = !state.burgerActivated;
        burger.classList.toggle('activated');
        mainNav.classList.toggle('activated');

        mainNav.setAttribute('aria-expanded', state.burgerActivated);
        superWindow.toggleNoScroll({
            transitionElement: mainNav,
            noScroll: state.burgerActivated,
        });
    };
    burger.addEventListener('click', navigationToggle, false);

    const resizeHandler = () => {
        if (superWindow.currentBreakpoint === 'xl' && state.burgerActivated) {
            navigationToggle();
        }
    };

    superWindow.addResizeFunction(resizeHandler);
};

export default burgerHandler;
