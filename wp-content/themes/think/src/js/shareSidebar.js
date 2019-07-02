import collant from 'collant';
import imagesLoaded from 'imagesloaded';
import { query } from './utils';

const shareSidebarHandler = () => {
    const [article] = query('#article');
    if (!article) return;

    imagesLoaded(article, () => {
        collant(document.getElementById('share'), 35, {
            minimumWidth: 1100,
        });
    });
};

export default shareSidebarHandler;
