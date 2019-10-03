import { superWindow } from '@stereorepo/sac';
import { Collant } from '@stereorepo/collant';

import { query } from '../utils';

const contactSidebarHandler = () => {
    const [contactSidebar] = query({ selector: '.js-contact-sidebar' });

    if (!contactSidebar) return;
    const state = {
        collant: false
    };

    const halfWindow = window.innerHeight / 2;
    const halfSidebar = contactSidebar.getBoundingClientRect().height / 2;
    const offsetSidebar = halfWindow - halfSidebar;

    const collant = new Collant({
        selector: '.js-contact-sidebar',
        box: '.js-contact-section',
        offsetTop: `${offsetSidebar}px`,
    });

    
    const handleWindowSize = () => {
        if (state.collant && superWindow.windowWidth < 960) {
            collant.ripIt();
            state.collant = false;
        } else if (!state.collant && superWindow.windowWidth >= 960) {
            collant.stickIt();
            state.collant = true;
        }
    }
    
    handleWindowSize();
    superWindow.addResizeFunction(handleWindowSize);
};

export default contactSidebarHandler;
