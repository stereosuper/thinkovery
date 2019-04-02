import { createNewEvent } from './utils';
import { TweenMax, TimelineMax } from 'gsap';

const burgerHandler = () => {
    const state = {
        isMoving: false,
        queue: null,
    };

    const { body } = document;
    const isHome = body.classList.contains('home');
    const bordersWrapper = document.getElementById('borders');

    if (!bordersWrapper && !isHome) return;
    const [mouseWrapper] = bordersWrapper.getElementsByClassName('mouse');
    const [catWrapper] = bordersWrapper.getElementsByClassName('cat');
    const bordersMouse = mouseWrapper.children;
    const bordersCat = catWrapper.children;

    let tl = null;

    const resetMotionState = () => {
        state.isMoving = false;

        if (state.queue) {
            bordersWrapper.setAttribute('data-next-section', state.queue);
            const event = createNewEvent('updateBorders');

            bordersWrapper.dispatchEvent(event);
        }
    };

    const borderIntro = ({ cb }) => {
        tl = new TimelineMax({ delay: 0.3, paused: true });
        tl.add(
            TweenMax.staggerTo(
                [bordersMouse[2], bordersCat[2]],
                1,
                {
                    transformOrigin: '0 50%',
                    scaleX: 0,
                    onComplete: () => {
                        TweenMax.staggerTo(
                            [bordersMouse[3], bordersCat[3]],
                            1,
                            {
                                transformOrigin: '50% 0%',
                                scaleY: 0,
                            },
                            0.1
                        );
                    },
                },
                0.1
            ),
            TweenMax.staggerTo(
                [bordersMouse[0], bordersCat[0]],
                1,
                {
                    transformOrigin: '0% 50%',
                    scaleX: 1,
                    onComplete: () => {
                        tl.add(
                            TweenMax.staggerTo(
                                [bordersMouse[1], bordersCat[1]],
                                1,
                                {
                                    transformOrigin: '50% 0%',
                                    scaleY: 1,
                                },
                                0.1
                            )
                        );
                        tl.add(
                            TweenMax.staggerTo(
                                [bordersMouse[2], bordersCat[2]],
                                1,
                                {
                                    transformOrigin: '100% 50%',
                                    scaleX: 0.5,
                                    onComplete: cb,
                                },
                                0.1
                            )
                        );
                    },
                },
                0.1
            )
        );

        tl.play();
    };

    const borderLearningExperience = ({ cb }) => {
        tl = new TimelineMax({ delay: 0.3, paused: true });
        tl.add(
            TweenMax.staggerTo(
                [bordersMouse[0], bordersCat[0]],
                1,
                {
                    transformOrigin: '100% 50%',
                    scaleX: 0,
                    onComplete: () => {
                        TweenMax.staggerTo(
                            [bordersMouse[1], bordersCat[1]],
                            1,
                            {
                                transformOrigin: '50% 100%',
                                scaleY: 0,
                            },
                            0.1
                        );
                    },
                },
                0.1
            ),
            TweenMax.staggerTo(
                [bordersMouse[2], bordersCat[2]],
                1,
                {
                    transformOrigin: '100% 50%',
                    scaleX: 1,
                    onComplete: () => {
                        TweenMax.staggerTo(
                            [bordersMouse[3], bordersCat[3]],
                            1,
                            {
                                transformOrigin: '50% 100%',
                                scaleY: 1,
                                onComplete: () => {
                                    TweenMax.staggerTo(
                                        [bordersMouse[0], bordersCat[0]],
                                        1,
                                        {
                                            transformOrigin: '0% 50%',
                                            scaleX: 0.25,
                                            onComplete: cb,
                                        },
                                        0.1
                                    );
                                },
                            },
                            0.1
                        );
                    },
                },
                0.1
            )
        );

        tl.play();
    };

    const updateBorder = () => {
        const borderNextSection = bordersWrapper.getAttribute(
            'data-next-section'
        );

        if (!state.isMoving) {
            state.isMoving = true;
            state.queue = null;
            switch (borderNextSection) {
                case 'home-intro':
                    borderIntro({ cb: resetMotionState });
                    break;
                case 'home-learning-experience':
                    borderLearningExperience({ cb: resetMotionState });
                    break;
                default:
                    break;
            }
        } else {
            state.queue = borderNextSection;
        }

        bordersWrapper.setAttribute('data-active-section', borderNextSection);
    };

    bordersWrapper.addEventListener('updateBorders', updateBorder, false);
};

export default burgerHandler;
