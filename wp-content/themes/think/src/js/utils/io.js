import 'intersection-observer';
import { forEach, createNewEvent } from '.';

function Io() {
    this.resized = true;

    this.init = () => {
        const objectsToIO = [].slice.call(
            document.querySelectorAll('[data-io]')
        );

        const observer = new IntersectionObserver(
            entries => {
                forEach(entries, entry => {
                    if (entry.intersectionRatio > 0.15) {
                        this[`${entry.target.dataset.io}In`](entry.target);
                        if (entry.target.hasAttribute('data-io-single'))
                            observer.unobserve(entry.target);
                    } else if (entry.intersectionRatio < 0.15) {
                        this[`${entry.target.dataset.io}Out`](entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '-100px 0px',
            }
        );

        forEach(objectsToIO, obj => {
            if (!obj.hasAttribute('data-io-observed')) {
                observer.observe(obj);
                obj.setAttribute('data-io-observed', '');
            }
        });
    };

    // Reveal minions
    this.updateBorderIn = entry => {
        const borders = document.getElementById('borders');
        if (!borders) return;
        borders.setAttribute('data-next-section', entry.id);
        const event = createNewEvent('updateBorders');
        borders.dispatchEvent(event);
    };

    this.updateBorderOut = entry => {
        // entry.classList.remove('reveal-minions');
    };
}

export default new Io();
