import 'intersection-observer';
import { forEach, createNewEvent } from '.';
import win from './Window';

function Io() {
    this.resized = true;
    const minThreshold = win.h > win.breakpoints.vertical.xs ? 0.15 : 0.1;
    let indexThreshold = 0;
    const thresholdsNumber = 10;
    const thresholdSamples = [];

    // NOTE: offers menu part
    let offersMenu = document.getElementById('offers-menu');
    let offersAnchors = offersMenu
        ? [...offersMenu.getElementsByTagName('a')]
        : null;
    const menuOffersEntries = {
        activeId: null,
    };

    for (
        indexThreshold;
        indexThreshold <= thresholdsNumber;
        indexThreshold += 1
    ) {
        thresholdSamples[indexThreshold] = indexThreshold / thresholdsNumber;
    }
    this.init = () => {
        const objectsToIO = [].slice.call(
            document.querySelectorAll('[data-io]')
        );

        const observer = new IntersectionObserver(
            entries => {
                forEach(entries, entry => {
                    if (entry.intersectionRatio > minThreshold) {
                        this[`${entry.target.dataset.io}In`](entry);
                        if (entry.target.hasAttribute('data-io-single'))
                            observer.unobserve(entry.target);
                    }
                    // else if (entry.intersectionRatio < threshold) {
                    //     this[`${entry.target.dataset.io}Out`](entry.target);
                    // }
                });
            },
            {
                threshold: thresholdSamples,
                rootMargin: '-100px 0px',
            }
        );

        forEach(objectsToIO, obj => {
            if (obj.hasAttribute('data-io-observed')) return;

            observer.observe(obj);
            obj.setAttribute('data-io-observed', '');
        });
    };

    // Reveal minions
    this.updateBorderIn = entry => {
        const { target } = entry;
        const borders = document.getElementById('borders');

        if (!borders) return;

        const event = createNewEvent('updateBorders');

        borders.setAttribute(
            'data-next-section',
            target.getAttribute('data-section-name')
        );
        borders.dispatchEvent(event);
    };

    this.updateOffersMenuIn = entry => {
        const { target } = entry;

        if (!offersMenu) {
            offersMenu = document.getElementById('offers-menu');
        }
        if (!offersAnchors.length) {
            offersAnchors = [...offersMenu.getElementsByTagName('a')];
        }

        if (!offersMenu) return;

        if (!menuOffersEntries[target.id]) {
            menuOffersEntries[target.id] = {
                ratio: 0,
                set setRatio(value) {
                    this.ratio = value;

                    if (!menuOffersEntries.activeId) {
                        menuOffersEntries.activeId = {
                            id: this.target.id,
                            ratio: this.ratio,
                        };

                        document
                            .getElementById(`anchor-${this.target.id}`)
                            .classList.add('active');
                    } else {
                        if (this.target.id === menuOffersEntries.activeId.id) {
                            menuOffersEntries.activeId.ratio = this.ratio;
                        }

                        if (this.ratio > menuOffersEntries.activeId.ratio) {
                            menuOffersEntries.activeId = {
                                id: this.target.id,
                                ratio: this.ratio,
                            };
                        }

                        forEach(offersAnchors, anchor => {
                            if (
                                anchor.id ===
                                `anchor-${menuOffersEntries.activeId.id}`
                            ) {
                                anchor.classList.add('active');
                            } else {
                                anchor.classList.remove('active');
                            }
                        });
                    }
                },
            };
        }
        menuOffersEntries[target.id].target = target;
        menuOffersEntries[target.id].setRatio = entry.intersectionRatio;
    };

    this.revealNewsletterIn = ({ target }) => {
        target.classList.add('activated');
    };
}

export default new Io();
