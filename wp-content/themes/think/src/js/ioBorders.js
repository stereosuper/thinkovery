import { TweenMax, TimelineMax } from 'gsap';
import { createNewEvent } from './utils';
import win from './utils/Window';
import { colors, easing } from './global';

const ioBorders = () => {
    const { body } = document;
    const isHome = body.classList.contains('home');
    const bordersWrapper = document.getElementById('borders');

    if (!bordersWrapper && !isHome) return;
    const state = {
        display: false,
        isMoving: false,
        queue: [],
        nextSection: null,
        speedFactor: 1,
    };

    const [catWrapper] = bordersWrapper.getElementsByClassName('cat');
    const bordersCat = catWrapper.children;

    const tl = new TimelineMax({ paused: true });

    const handleDisplay = () => {
        const { display } = getComputedStyle(bordersWrapper);

        state.display = display !== 'none';
    };

    handleDisplay();

    const processQueue = () => {
        state.isMoving = false;
        if (!state.queue.length) return;

        const event = createNewEvent('updateQueue');
        [state.nextSection] = state.queue;

        state.queue.shift();
        bordersWrapper.dispatchEvent(event);
    };

    const borderIntro = () => {
        TweenMax.to(bordersCat[2], 0.8 / state.speedFactor, {
            transformOrigin: '0 50%',
            scaleX: 0,
            ease: easing.catMouseEaseIn,
            onComplete: () => {
                TweenMax.to(bordersCat[3], 0.8 / state.speedFactor, {
                    transformOrigin: '50% 0%',
                    scaleY: 0,
                    ease: easing.catMouseEaseIn,
                });
            },
        });
        TweenMax.to(bordersCat[0], 0.5 / state.speedFactor, {
            transformOrigin: '0% 50%',
            scaleX: 1,
            ease: easing.catMouseEaseOut,
            onComplete: () => {
                TweenMax.to(bordersCat, 0.5, {
                    backgroundColor: colors.funGreen,
                });
                TweenMax.to(bordersCat[1], 0.5 / state.speedFactor, {
                    transformOrigin: '50% 0%',
                    scaleY: 1,
                    ease: easing.catMouseEaseOut,
                    onComplete: () => {
                        TweenMax.to(bordersCat[2], 0.5 / state.speedFactor, {
                            transformOrigin: '100% 50%',
                            scaleX: 0.5,
                            ease: easing.catMouseEaseOut,
                            onComplete: processQueue,
                        });
                    },
                });
            },
        });
    };

    const borderLearningExperience = () => {
        tl.pause();
        tl.add(
            TweenMax.to(bordersCat[0], 0.8 / state.speedFactor, {
                transformOrigin: '100% 50%',
                scaleX: 0,
                ease: easing.catMouseEaseIn,
                onComplete: () => {
                    TweenMax.to(bordersCat[1], 0.8 / state.speedFactor, {
                        transformOrigin: '50% 100%',
                        scaleY: 0,
                        ease: easing.catMouseEaseIn,
                    });
                },
            }),
            TweenMax.to(bordersCat[2], 0.5 / state.speedFactor, {
                transformOrigin: '100% 50%',
                scaleX: 1,
                ease: easing.catMouseEaseOut,
                onComplete: () => {
                    TweenMax.to(bordersCat, 0.5, {
                        backgroundColor: colors.pictonBlue,
                    });
                    TweenMax.to(bordersCat[3], 0.5 / state.speedFactor, {
                        transformOrigin: '50% 100%',
                        scaleY: 1,
                        ease: easing.catMouseEaseOut,
                        onComplete: () => {
                            TweenMax.to(
                                bordersCat[0],
                                0.5 / state.speedFactor,
                                {
                                    transformOrigin: '0% 50%',
                                    scaleX: 0.25,
                                    ease: easing.catMouseEaseOut,
                                    onComplete: processQueue,
                                }
                            );
                        },
                    });
                },
            })
        );

        tl.play();
    };

    const borderOffers = () => {
        tl.pause();
        tl.add(
            TweenMax.to(bordersCat[2], 0.8 / state.speedFactor, {
                transformOrigin: '0% 50%',
                scaleX: 0,
                ease: easing.catMouseEaseIn,
                onComplete: () => {
                    TweenMax.to(bordersCat[3], 0.8 / state.speedFactor, {
                        transformOrigin: '50% 0%',
                        scaleY: 0,
                        ease: easing.catMouseEaseIn,
                    });
                },
            }),
            TweenMax.to(bordersCat[0], 0.5 / state.speedFactor, {
                transformOrigin: '0% 50%',
                scaleX: 1,
                ease: easing.catMouseEaseOut,
                onComplete: () => {
                    TweenMax.to(bordersCat, 0.5, {
                        backgroundColor: colors.funGreen,
                    });
                    TweenMax.to(bordersCat[1], 0.5 / state.speedFactor, {
                        transformOrigin: '50% 0%',
                        scaleY: 1,
                        ease: easing.catMouseEaseOut,
                        onComplete: () => {
                            TweenMax.to(
                                bordersCat[0],
                                0.8 / state.speedFactor,
                                {
                                    transformOrigin: '100% 50%',
                                    scaleX: 0,
                                    ease: easing.catMouseEaseIn,
                                }
                            );
                            TweenMax.to(
                                bordersCat[2],
                                0.5 / state.speedFactor,
                                {
                                    transformOrigin: '100% 50%',
                                    scaleX: 0.75,
                                    ease: easing.catMouseEaseOut,
                                    onComplete: processQueue,
                                }
                            );
                        },
                    });
                },
            })
        );

        tl.play();
    };

    const borderAboutUs = () => {
        tl.pause();
        tl.add(
            TweenMax.to(bordersCat[0], 0.8 / state.speedFactor, {
                transformOrigin: '100% 50%',
                scaleX: 0,
                ease: easing.catMouseEaseIn,
                onComplete: () => {
                    TweenMax.to(bordersCat[1], 0.8 / state.speedFactor, {
                        transformOrigin: '50% 100%',
                        scaleY: 0,
                        ease: easing.catMouseEaseIn,
                    });
                },
            }),
            TweenMax.to(bordersCat[2], 0.5 / state.speedFactor, {
                transformOrigin: '100% 50%',
                scaleX: 1,
                ease: easing.catMouseEaseOut,
                onComplete: () => {
                    TweenMax.to(bordersCat, 0.5, {
                        backgroundColor: colors.persimmon,
                    });
                    TweenMax.to(bordersCat[3], 0.5 / state.speedFactor, {
                        transformOrigin: '50% 100%',
                        scaleY: 1,
                        ease: easing.catMouseEaseOut,
                        onComplete: () => {
                            TweenMax.to(
                                bordersCat[2],
                                0.5 / state.speedFactor,
                                {
                                    transformOrigin: '0% 50%',
                                    scaleX: 0.25,
                                    ease: easing.catMouseEaseOut,
                                }
                            );
                            TweenMax.to(
                                bordersCat[0],
                                0.5 / state.speedFactor,
                                {
                                    transformOrigin: '0% 50%',
                                    scaleX: 1,
                                    ease: easing.catMouseEaseOut,
                                    onComplete: processQueue,
                                }
                            );
                        },
                    });
                },
            })
        );

        tl.play();
    };

    const borderExperiences = () => {
        tl.pause();
        tl.add(
            TweenMax.to(bordersCat[2], 0.8 / state.speedFactor, {
                transformOrigin: '0% 50%',
                scaleX: 0,
                ease: easing.catMouseEaseIn,
                onComplete: () => {
                    TweenMax.to(bordersCat[3], 0.8 / state.speedFactor, {
                        transformOrigin: '50% 0%',
                        scaleY: 0,
                        ease: easing.catMouseEaseIn,
                    });
                },
            }),
            TweenMax.to(bordersCat[0], 0.5 / state.speedFactor, {
                transformOrigin: '0% 50%',
                scaleX: 1,
                ease: easing.catMouseEaseOut,
                onComplete: () => {
                    TweenMax.to(bordersCat, 0.5, {
                        backgroundColor: colors.darkOrange,
                    });
                    TweenMax.to(bordersCat[1], 0.5 / state.speedFactor, {
                        transformOrigin: '50% 0%',
                        scaleY: 1,
                        ease: easing.catMouseEaseOut,
                        onComplete: () => {
                            TweenMax.to(
                                bordersCat[0],
                                0.5 / state.speedFactor,
                                {
                                    transformOrigin: '100% 50%',
                                    scaleX: 0.25,
                                    ease: easing.catMouseEaseOut,
                                }
                            );
                            TweenMax.to(
                                bordersCat[2],
                                0.5 / state.speedFactor,
                                {
                                    transformOrigin: '100% 50%',
                                    scaleX: 1,
                                    ease: easing.catMouseEaseOut,
                                    onComplete: processQueue,
                                }
                            );
                        },
                    });
                },
            })
        );

        tl.play();
    };

    const updateBorder = () => {
        if (state.isMoving) return;

        state.isMoving = true;
        tl.clear();

        switch (state.nextSection) {
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
    };

    bordersWrapper.addEventListener(
        'updateBorders',
        () => {
            const borderNextSection = bordersWrapper.getAttribute(
                'data-next-section'
            );

            if (state.isMoving) {
                state.queue.push(borderNextSection);
                state.speedFactor = Math.max(1, state.queue.length * 0.75);
            } else {
                state.nextSection = borderNextSection;
                updateBorder();
            }
        },
        false
    );

    bordersWrapper.addEventListener('updateQueue', updateBorder, false);

    win.addResizeFunction(() => {
        handleDisplay();
        if (state.display && state.queue.length) {
            processQueue();
        }
    });
};

export default ioBorders;
