import { superWindow } from '@stereorepo/sac';
import { Collant } from '@stereorepo/collant';
import { query } from '../utils';

const shareSidebarHandler = () => {
    const state = {
        collant: false
    };

    const collant = new Collant({
        selector: '#share',
        box: '#article',
        offsetTop: '35px',
    });
    

    const handleWindowSizeCollant = () => {
        if (state.collant && superWindow.windowWidth < 1100) {
            collant.ripIt();
            state.collant = false;
        } else if (!state.collant && superWindow.windowWidth >= 1100) {
            collant.stickIt();
            state.collant = true;
        }
    }

    handleWindowSizeCollant();
    superWindow.addResizeFunction(() => {
        handleWindowSizeCollant();
    });
};

export default shareSidebarHandler;
