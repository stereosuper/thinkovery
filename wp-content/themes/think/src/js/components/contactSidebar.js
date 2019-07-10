import collant from 'collant';

import { query } from '../utils';

const contactSidebarHandler = () => {
    const [contactSidebar] = query({ selector: '.js-contact-sidebar' });

    if (!contactSidebar) return;

    const halfWindow = window.innerHeight / 2;
    const halfSidebar = contactSidebar.getBoundingClientRect().height / 2;
    const offsetSidebar = halfWindow - halfSidebar;

    collant(contactSidebar, offsetSidebar, {
        minimumWidth: 960,
    });
};

export default contactSidebarHandler;
