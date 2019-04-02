import { colors, easing } from './global';
import { createNewEvent, Queue } from './utils';
import { TweenMax, TimelineMax } from 'gsap';

const burgerHandler = () => {
    const state = {
        isMoving: false,
        queue: [],
    };

    const { body } = document;
    const isHome = body.classList.contains('home');
    const bordersWrapper = document.getElementById('borders');

    if (!bordersWrapper && !isHome) return;
    const [mouseWrapper] = bordersWrapper.getElementsByClassName('mouse');
    const [catWrapper] = bordersWrapper.getElementsByClassName('cat');
    const bordersMouse = mouseWrapper.children;
    const bordersCat = catWrapper.children;

    const tl = new TimelineMax({ delay: 0.3, paused: true });

    const resetMotionState = () => {
        if (state.queue.length) {
            bordersWrapper.setAttribute('data-next-section', state.queue[0]);
            const event = createNewEvent('updateBorders');

            state.queue.shift();
            bordersWrapper.dispatchEvent(event);
        } else {
            state.isMoving = false;
        }
    };

    const borderIntro = () => {
        tl.pause();
        tl.add(
            TweenMax.staggerTo(
                [bordersMouse[2], bordersCat[2]],
                0.4,
                {
                    transformOrigin: '0 50%',
                    scaleX: 0,
                    ease: easing.catMouseEaseIn,
                    onComplete: () => {
                        TweenMax.staggerTo(
                            [bordersMouse[3], bordersCat[3]],
                            0.4,
                            {
                                transformOrigin: '50% 0%',
                                scaleY: 0,
                                ease: easing.catMouseEaseIn,
                            },
                            0.1
                        );
                    },
                },
                0.1
            ),
            TweenMax.staggerTo(
                [bordersMouse[0], bordersCat[0]],
                0.23,
                {
                    transformOrigin: '0% 50%',
                    scaleX: 1,
                    ease: easing.catMouseEaseOut,
                    onComplete: () => {
                        TweenMax.to(bordersCat, 1, {
                            backgroundColor: colors.funGreen,
                        });
                        TweenMax.staggerTo(
                            [bordersMouse[1], bordersCat[1]],
                            0.23,
                            {
                                transformOrigin: '50% 0%',
                                scaleY: 1,
                                ease: easing.catMouseEaseOut,
                            },
                            0.1
                        );
                        TweenMax.staggerTo(
                            [bordersMouse[2], bordersCat[2]],
                            0.23,
                            {
                                transformOrigin: '100% 50%',
                                scaleX: 0.5,
                                ease: easing.catMouseEaseOut,
                                onComplete: resetMotionState,
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

    const borderLearningExperience = () => {
        tl.pause();
        tl.add(
            TweenMax.staggerTo(
                [bordersMouse[0], bordersCat[0]],
                0.4,
                {
                    transformOrigin: '100% 50%',
                    scaleX: 0,
                    ease: easing.catMouseEaseIn,
                    onComplete: () => {
                        TweenMax.staggerTo(
                            [bordersMouse[1], bordersCat[1]],
                            0.4,
                            {
                                transformOrigin: '50% 100%',
                                scaleY: 0,
                                ease: easing.catMouseEaseIn,
                            },
                            0.1
                        );
                    },
                },
                0.1
            ),
            TweenMax.staggerTo(
                [bordersMouse[2], bordersCat[2]],
                0.23,
                {
                    transformOrigin: '100% 50%',
                    scaleX: 1,
                    ease: easing.catMouseEaseOut,
                    onComplete: () => {
                        TweenMax.to(bordersCat, 1, {
                            backgroundColor: colors.pictonBlue,
                        });
                        TweenMax.staggerTo(
                            [bordersMouse[3], bordersCat[3]],
                            0.23,
                            {
                                transformOrigin: '50% 100%',
                                scaleY: 1,
                                ease: easing.catMouseEaseOut,
                                onComplete: () => {
                                    TweenMax.staggerTo(
                                        [bordersMouse[0], bordersCat[0]],
                                        0.23,
                                        {
                                            transformOrigin: '0% 50%',
                                            scaleX: 0.25,
                                            ease: easing.catMouseEaseOut,
                                            onComplete: resetMotionState,
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

    const borderOffers = () => {
        tl.pause();
        tl.add(
            TweenMax.staggerTo(
                [bordersMouse[2], bordersCat[2]],
                0.4,
                {
                    transformOrigin: '0% 50%',
                    scaleX: 0,
                    ease: easing.catMouseEaseIn,
                    onComplete: () => {
                        TweenMax.staggerTo(
                            [bordersMouse[3], bordersCat[3]],
                            0.4,
                            {
                                transformOrigin: '50% 0%',
                                scaleY: 0,
                                ease: easing.catMouseEaseIn,
                            },
                            0.1
                        );
                    },
                },
                0.1
            ),
            TweenMax.staggerTo(
                [bordersMouse[0], bordersCat[0]],
                0.23,
                {
                    transformOrigin: '0% 50%',
                    scaleX: 1,
                    ease: easing.catMouseEaseOut,
                    onComplete: () => {
                        TweenMax.to(bordersCat, 1, {
                            backgroundColor: colors.funGreen,
                        });
                        TweenMax.staggerTo(
                            [bordersMouse[1], bordersCat[1]],
                            0.23,
                            {
                                transformOrigin: '50% 0%',
                                scaleY: 1,
                                ease: easing.catMouseEaseOut,
                                onComplete: () => {
                                    TweenMax.staggerTo(
                                        [bordersMouse[0], bordersCat[0]],
                                        0.4,
                                        {
                                            transformOrigin: '100% 50%',
                                            scaleX: 0,
                                            ease: easing.catMouseEaseIn,
                                        },
                                        0.1
                                    );
                                    TweenMax.staggerTo(
                                        [bordersMouse[2], bordersCat[2]],
                                        0.23,
                                        {
                                            transformOrigin: '100% 50%',
                                            scaleX: 0.75,
                                            ease: easing.catMouseEaseOut,
                                            onComplete: resetMotionState,
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

    const borderAboutUs = () => {
        tl.pause();
        tl.add(
            TweenMax.staggerTo(
                [bordersMouse[0], bordersCat[0]],
                0.4,
                {
                    transformOrigin: '100% 50%',
                    scaleX: 0,
                    ease: easing.catMouseEaseIn,
                    onComplete: () => {
                        TweenMax.staggerTo(
                            [bordersMouse[1], bordersCat[1]],
                            0.4,
                            {
                                transformOrigin: '50% 100%',
                                scaleY: 0,
                                ease: easing.catMouseEaseIn,
                            },
                            0.1
                        );
                    },
                },
                0.1
            ),
            TweenMax.staggerTo(
                [bordersMouse[2], bordersCat[2]],
                0.23,
                {
                    transformOrigin: '100% 50%',
                    scaleX: 1,
                    ease: easing.catMouseEaseOut,
                    onComplete: () => {
                        TweenMax.to(bordersCat, 1, {
                            backgroundColor: colors.persimmon,
                        });
                        TweenMax.staggerTo(
                            [bordersMouse[3], bordersCat[3]],
                            0.23,
                            {
                                transformOrigin: '50% 100%',
                                scaleY: 1,
                                ease: easing.catMouseEaseOut,
                                onComplete: () => {
                                    TweenMax.staggerTo(
                                        [bordersMouse[2], bordersCat[2]],
                                        0.23,
                                        {
                                            transformOrigin: '0% 50%',
                                            scaleX: 0.25,
                                            ease: easing.catMouseEaseOut,
                                        },
                                        0.1
                                    );
                                    TweenMax.staggerTo(
                                        [bordersMouse[0], bordersCat[0]],
                                        0.23,
                                        {
                                            transformOrigin: '0% 50%',
                                            scaleX: 1,
                                            ease: easing.catMouseEaseOut,
                                            onComplete: resetMotionState,
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

    const borderExperiences = () => {
        tl.pause();
        tl.add(
            TweenMax.staggerTo(
                [bordersMouse[2], bordersCat[2]],
                0.4,
                {
                    transformOrigin: '0% 50%',
                    scaleX: 0,
                    ease: easing.catMouseEaseIn,
                    onComplete: () => {
                        TweenMax.staggerTo(
                            [bordersMouse[3], bordersCat[3]],
                            0.4,
                            {
                                transformOrigin: '50% 0%',
                                scaleY: 0,
                                ease: easing.catMouseEaseIn,
                            },
                            0.1
                        );
                    },
                },
                0.1
            ),
            TweenMax.staggerTo(
                [bordersMouse[0], bordersCat[0]],
                0.23,
                {
                    transformOrigin: '0% 50%',
                    scaleX: 1,
                    ease: easing.catMouseEaseOut,
                    onComplete: () => {
                        TweenMax.to(bordersCat, 1, {
                            backgroundColor: colors.darkOrange,
                        });
                        TweenMax.staggerTo(
                            [bordersMouse[1], bordersCat[1]],
                            0.23,
                            {
                                transformOrigin: '50% 0%',
                                scaleY: 1,
                                ease: easing.catMouseEaseOut,
                                onComplete: () => {
                                    TweenMax.staggerTo(
                                        [bordersMouse[0], bordersCat[0]],
                                        0.23,
                                        {
                                            transformOrigin: '100% 50%',
                                            scaleX: 0.25,
                                            ease: easing.catMouseEaseOut,
                                        },
                                        0.1
                                    );
                                    TweenMax.staggerTo(
                                        [bordersMouse[2], bordersCat[2]],
                                        0.23,
                                        {
                                            transformOrigin: '100% 50%',
                                            scaleX: 1,
                                            ease: easing.catMouseEaseOut,
                                            onComplete: resetMotionState,
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
            tl.clear();
            state.isMoving = true;

            switch (borderNextSection) {
                case 'home-intro':
                    borderIntro();
                    break;
                case 'home-learning-experience':
                    borderLearningExperience();
                    break;
                case 'home-offers':
                    borderOffers();
                    break;
                case 'home-about-us':
                    borderAboutUs();
                    break;
                case 'home-experiences':
                    borderExperiences();
                    break;
                default:
                    break;
            }
        } else {
            state.queue.push(borderNextSection);
        }

        bordersWrapper.setAttribute('data-active-section', borderNextSection);
    };

    bordersWrapper.addEventListener('updateBorders', updateBorder, false);
};

export default burgerHandler;
