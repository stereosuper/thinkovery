import { TweenMax, TimelineMax } from 'gsap';
import { superWindow } from '@stereorepo/sac';
import { forEach } from '../utils';
import '../plugins/DrawSVGPlugin';
import '../plugins/MorphSVGPlugin';

const learningAnimHandler = () => {
    const animSchema = () => {
        const schema = document.getElementById('learning-anim');

        if (!schema) return;

        const pathBezier = MorphSVGPlugin.pathDataToBezier(
            schema.querySelector('circle')
        );
        const minions = schema.querySelectorAll('.shape');
        const tls = [];
        let resizeTimer;

        const init = () => {
            forEach(minions, (minion, i) => {
                tls[i] = new TimelineMax({ paused: true, repeat: -1 });

                tls[i].to(minion, 50, {
                    bezier: { values: pathBezier, type: 'cubic' },
                    ease: Linear.easeNone,
                });
                tls[i].progress(i * 0.2);
                tls[i].play();

                TweenMax.set(minion, { opacity: 1 });
            });
        };

        // launch anim if schema is visible (window width > 960)
        if (getComputedStyle(schema).display !== 'none') init();

        superWindow.addResizeFunction(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (getComputedStyle(schema).display !== 'none') {
                    init();
                }
            }, 500);
        });
    };

    const animElts = () => {
        const svg = document.getElementById('elts-svg');
        const section = document.getElementById('learning-elts');

        if (!svg || !section) return;

        // Constants used to create the intersection observer threshold array
        const samplesNumber = 10;
        const thresholdSamples = [];
        let index = 0;
        let observer = null;

        const path = svg.querySelector('.path');
        const shadow1 = svg.querySelector('.shadow1');
        const shadow2 = svg.querySelector('.shadow2');
        const shadow3 = svg.querySelector('.shadow3');
        const shadow4 = svg.querySelector('.shadow4');
        const shadow5 = svg.querySelector('.shadow5');
        const img1 = svg.querySelector('.img1');
        const img2 = svg.querySelector('.img2');
        const img3 = svg.querySelector('.img3');

        let animLaunched = false;

        const init = () => {
            animLaunched = true;

            TweenMax.to(path, 2, { drawSVG: '100%' });
            TweenMax.to(shadow1, 0.2, { opacity: 0.6, delay: 0.4 });
            TweenMax.to(shadow2, 0.2, { opacity: 0.6, delay: 0.5 });
            TweenMax.to(img1, 0.3, { opacity: 1, delay: 0.6 });
            TweenMax.to(shadow3, 0.2, { opacity: 0.6, delay: 0.9 });
            TweenMax.to(shadow4, 0.2, { opacity: 0.6, delay: 1 });
            TweenMax.to(img2, 0.3, { opacity: 1, delay: 1.1 });
            TweenMax.to(shadow5, 0.2, { opacity: 0.6, delay: 1.7 });
            TweenMax.to(img3, 0.3, { opacity: 1, delay: 1.7 });
        };

        const intersectionCallback = entries => {
            forEach(entries, entry => {
                if (entry.intersectionRatio < 0.5 || animLaunched) return;
                init();
            });
        };

        TweenMax.set(path, { drawSVG: 0 });
        TweenMax.set([shadow1, shadow2, shadow3, shadow4, shadow5], {
            opacity: 0,
        });
        TweenMax.set([img1, img2, img3], { opacity: 0 });

        for (index; index <= samplesNumber; index++) {
            thresholdSamples[index] = index / samplesNumber;
        }

        observer = new IntersectionObserver(intersectionCallback, {
            root: null,
            rootMargin: '0px',
            threshold: thresholdSamples,
        });

        observer.observe(section);
    };

    animElts();
    animSchema();
};

export default learningAnimHandler;
