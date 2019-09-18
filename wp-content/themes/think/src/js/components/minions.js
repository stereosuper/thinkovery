import { superWindow, superSnif } from '@stereorepo/sac';
import {
    TimelineMax,
    TweenMax,
    Power1,
    Power2,
    Power4,
    Back,
    Elastic,
    Expo,
    Sine,
} from 'gsap';
import { MorphSVGPlugin } from '../plugins/MorphSVGPlugin';
import '../plugins/DrawSVGPlugin';

import { easing } from '../global';
import { forEach, query, isDisplayed } from '../utils';

const minionsHandler = () => {
    const homeSections = query({ selector: '.js-home-section' });
    const [video] = query({ selector: '#home-video' });
    let minions = query({ selector: '.shape' });

    if (!homeSections.length || !video || !minions.length) return;
    const isSafari = superSnif.isSafari();
    const tweenOptimizations = isSafari ? { force3D: false } : {};

    const [planePath] = query({ selector: '#plane-path path' });
    const [plane] = query({ selector: '#plane' });
    const [morpion] = query({ selector: '#morpion' });
    let player = null;
    let newDrop = null;

    const animsState = {
        'home-intro': { launched: false, done: false },
        'home-learning-experience': { launched: false, done: false },
        'home-offers': { launched: false, done: false },
        'home-about-us': { launched: false, done: false },
        'home-experiences': { launched: false, done: false },
        get animsLaunched() {
            return Object.keys(this)
                .filter(section => section !== 'animsLaunched')
                .reduce(
                    (accumulator, val) => accumulator || this[val].launched,
                    false
                );
        },
    };

    const videoFunctions = {
        state: {
            initiated: false,
        },
        mouseover: null,
        mouseleave: null,
    };

    // Intervals
    let promptScrollDownInterval = null;

    let wh = window.innerHeight;
    let ww = window.innerWidth;

    let initialShapeTop = minions[0].getBoundingClientRect().top;

    let introBottom =
            homeSections[1].getBoundingClientRect().top - initialShapeTop - 35;

    let videoBottom = wh / 2;

    let playerCenterY =
        video.getBoundingClientRect().top -
        initialShapeTop +
        video.offsetHeight / 2;

    // Constants used to create the intersection observer threshold array
    const sectionsIntersectionRatio = 0.25;
    const samplesNumber = 10;
    const thresholdSamples = [];
    let index = 0;
    let observer = null;

    let learningFirstPartDone = false;

    const headerAnim = () => {
        if (player) {
            player.remove();
        }
        player = minions[2].cloneNode(true);
        minions[2].parentElement.appendChild(player);

        const tlPlayer = new TimelineMax();

        const promptScrollDownAnimation = (duration = 0.7) => {
            TweenMax.to(player, duration, {
                x: -10,
                y: videoBottom - 70,
                rotation: 90,
                ...tweenOptimizations,
                ease: Power2.easeInOut,
                onComplete: () => {
                    TweenMax.to(player, 0.3, {
                        y: videoBottom - 50,
                        ease: Back.easeOut.config(1.2),
                    });
                },
            });
        };

        const promptScrollDownLoop = () => {
            promptScrollDownInterval = setInterval(
                promptScrollDownAnimation,
                2000
            );
        };

        animsState['home-intro'].launched = true;

        tlPlayer
            .to(player, 0.3, {
                scale: 4,
                opacity: 1,
                ...tweenOptimizations,
                ease: Power4.easeIn,
                onComplete: () => {
                    if (video) {
                        video.classList.add('player-on', 'on');
                        TweenMax.set(
                            query({ selector: '.iframe', ctx: video }),
                            {
                                opacity: 1,
                                delay: 0.7,
                            }
                        );
                    }
                },
            })
            .to(player, 0.2, {
                scale: 3,
                ...tweenOptimizations,
                ease: Power2.easeOut,
            })
            .to(player, 1, {
                x: -10,
                y: videoBottom - 50,
                rotation: 90,
                ease: Elastic.easeOut.config(1.1, 0.9),
                delay: 0.3,
                onStart: () => {
                    animsState['home-intro'].done = true;

                    if (!videoFunctions.mouseover) {
                        videoFunctions.mouseover = () => {
                            if (!videoFunctions.state.initiated) {
                                videoFunctions.state.initiated = true;
                            }
                            if (promptScrollDownInterval) {
                                clearInterval(promptScrollDownInterval);
                            }

                            TweenMax.to(player, 0.2, {
                                x: 0,
                                y: playerCenterY,
                                rotation: 0,
                                ...tweenOptimizations,
                            });
                        };
                    }

                    video.addEventListener(
                        'mouseover',
                        videoFunctions.mouseover,
                        false
                    );

                    if (!videoFunctions.mouseleave) {
                        videoFunctions.mouseleave = () => {
                            if (videoFunctions.state.initiated) {
                                promptScrollDownAnimation(0.3);
                                promptScrollDownLoop();
                            }
                        };
                    }

                    video.addEventListener(
                        'mouseleave',
                        videoFunctions.mouseleave,
                        false
                    );

                    promptScrollDownLoop();
                },
            });

        TweenMax.set([minions[0], minions[1], minions[3], minions[4]], {
            opacity: 1,
        });

        TweenMax.to([minions[0], minions[1], minions[3], minions[4]], 0.5, {
            scale: 3,
            ...tweenOptimizations,
            ease: Power1.easeIn,
        });

        TweenMax.to(minions[0], 1.8, {
            bezier: {
                curviness: 1,
                values: [
                    { x: -100, y: -30 },
                    { x: -200, y: 0 },
                    { x: -240, y: introBottom + 100 },
                ],
            },
            ease: Power2.easeOut,
            delay: 0.15,
        });

        TweenMax.to(minions[1], 1.8, {
            bezier: {
                curviness: 1,
                values: [
                    { x: -50, y: -70 },
                    { x: -100, y: -50 },
                    { x: -130, y: introBottom + 100 },
                ],
            },
            ...tweenOptimizations,
            ease: Power2.easeOut,
            delay: 0.15,
        });

        TweenMax.set(minions[2], {
            x: 0,
            y: introBottom + 100,
            scale: 3,
            opacity: 1,
            ...tweenOptimizations,
        });

        TweenMax.to(minions[3], 1.8, {
            bezier: {
                curviness: 1,
                values: [
                    { x: 50, y: -60 },
                    { x: 100, y: -40 },
                    { x: 130, y: introBottom + 100 },
                ],
            },
            delay: 0.15,
            ease: Power2.easeOut,
        });

        TweenMax.to(minions[4], 1.8, {
            bezier: {
                curviness: 1,
                values: [
                    { x: 100, y: -10 },
                    { x: 190, y: 10 },
                    { x: 240, y: introBottom + 100 },
                ],
            },
            delay: 0.15,
            ease: Power2.easeOut,
        });
    };

    const learningAnim = ratio => {
        if (!animsState['home-learning-experience'].launched) {
            animsState['home-learning-experience'].launched = true;

            if (promptScrollDownInterval) {
                clearInterval(promptScrollDownInterval);
            }

            TweenMax.to(minions[2], 0.7, {
                x: 0,
                y: introBottom + 100,
                rotation: 0,
                ease: Back.easeInOut.config(2),
                onComplete: () => {
                    learningFirstPartDone = true;
                },
            });
        } else if (ratio > sectionsIntersectionRatio && learningFirstPartDone) {
            animsState['home-learning-experience'].bis = true;

            const secondSectionBottom = homeSections[1].offsetHeight + ww / 50;
            const planePathBezier = planePath
                ? MorphSVGPlugin.pathDataToBezier(planePath)
                : '';

            const planeBottom =
                planePath.getBoundingClientRect().bottom -
                minions[0].getBoundingClientRect().bottom;

            if (promptScrollDownInterval) {
                clearInterval(promptScrollDownInterval);
            }

            TweenMax.to(planePath, 1.5, { drawSVG: '100%' });
            TweenMax.to(plane, 1.5, {
                bezier: {
                    values: planePathBezier,
                    type: 'cubic',
                    autoRotate: true,
                    ease: Expo.easeOut,
                },
                onComplete: () => {
                    TweenMax.to(minions[0], 1, {
                        bezier: {
                            curviness: 1,
                            values: [
                                {
                                    x: '+=60',
                                    y: `+=${secondSectionBottom / 2}`,
                                },
                                {
                                    x: '+=200',
                                    y: `+=${planeBottom}`,
                                },
                            ],
                        },
                        ease: Back.easeInOut.config(1),
                    });

                    TweenMax.to(minions[1], 1.2, {
                        bezier: {
                            curviness: 1,
                            values: [
                                { y: `+=${secondSectionBottom / 2}` },
                                {
                                    x: '+=10',
                                    y: `+=${secondSectionBottom - 60}`,
                                },
                            ],
                        },
                        ease: Power4.easeInOut,
                    });

                    TweenMax.to(minions[2], 1.4, {
                        rotation: 450,
                        bezier: {
                            curviness: 1,
                            values: [
                                { y: `+=${secondSectionBottom / 2}` },
                                { y: `+=${secondSectionBottom - 40}` },
                            ],
                        },
                        ease: Back.easeInOut.config(1.1),
                    });

                    TweenMax.set(minions[3], {
                        x: 153,
                        y: introBottom + 123,
                        transformOrigin: '100% 100%',
                    });

                    TweenMax.to(minions[3], 1.2, {
                        bezier: {
                            curviness: 1,
                            values: [
                                {
                                    x: '+=80',
                                    y: `+=${secondSectionBottom / 2}`,
                                    rotation: 0,
                                },
                                {
                                    x: '+=20',
                                    y: `+=${secondSectionBottom - 20}`,
                                    rotation: 30,
                                },
                                {
                                    x: '-=20',
                                    y: `+=${secondSectionBottom - 18}`,
                                    rotation: 0,
                                },
                            ],
                        },
                        ease: Power1.easeInOut,
                    });

                    TweenMax.to(minions[4], 1.5, {
                        bezier: {
                            curviness: 1,
                            values: [
                                {
                                    x: '+=80',
                                    y: `+=${secondSectionBottom / 2}`,
                                    rotation: -180,
                                },
                                {
                                    x: '-=20',
                                    y: `+=${secondSectionBottom}`,
                                    rotation: -720,
                                },
                            ],
                        },
                        ease: Power4.easeOut,
                        onComplete: () => {
                            animsState['home-learning-experience'].done = true;
                        },
                    });
                },
            });
        }
    };

    const offersAnim = () => {
        if (newDrop) {
            newDrop.remove();
        }
        newDrop = minions[0].cloneNode(true);
        minions[0].parentElement.appendChild(newDrop);

        const duration = 0.5;
        const delay = 0.05;

        const dropBottom =
            minions[4].getBoundingClientRect().bottom -
            minions[0].getBoundingClientRect().bottom;

        animsState['home-offers'].launched = true;

        TweenMax.to(newDrop, duration, {
            bezier: {
                curviness: 1,
                values: [
                    { x: '-=160', y: `+=${dropBottom / 2}` },
                    { x: '-=200', y: `+=${dropBottom}` },
                ],
            },
            ease: Back.easeInOut.config(1),
            delay,
        });
        TweenMax.to(minions[1], duration, {
            y: '+=60',
            ease: Power4.easeInOut,
            delay: delay * 2,
        });
        TweenMax.to(minions[2], duration, {
            rotation: 360,
            y: '+=40',
            ease: Back.easeInOut.config(1.5),
            delay,
        });
        TweenMax.to(minions[3], duration, {
            y: '+=20',
            ease: Power1.easeInOut,
        });
    };

    const aboutAnim = () => {
        const minionsFourthSection = query({
            selector: '.shape',
            ctx: homeSections[3],
        });
        const fourthSectionBottom = homeSections[3].offsetHeight - 300;
        const duration = 0.8;
        const durationSmall = 0.25;
        const delay = 0.25;
        const delayFall = 0.07;

        animsState['home-about-us'].launched = true;

        // arrow  1
        TweenMax.to(minionsFourthSection[9], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[9], duration, {
                    y: fourthSectionBottom,
                    rotation: -470,
                    ease: Sine.easeIn,
                    delay: delayFall,
                });
            },
        });

        // triangle 1
        TweenMax.to(minionsFourthSection[3], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[3], duration, {
                    y: fourthSectionBottom,
                    rotation: -90,
                    ease: Sine.easeIn,
                    delay: delayFall,
                });
            },
            delay,
        });

        // drop
        TweenMax.to(minionsFourthSection[0], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[0], duration, {
                    y: fourthSectionBottom,
                    ease: Power1.easeIn,
                    delay: delayFall,
                });
            },
            delay: delay * 2,
        });

        // square 1
        TweenMax.to(minionsFourthSection[1], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[1], duration, {
                    y: fourthSectionBottom + 5,
                    rotation: 45,
                    ease: Sine.easeIn,
                    delay: delayFall,
                });
            },
            delay: delay * 3,
        });

        // rectangle 1
        TweenMax.to(minionsFourthSection[7], durationSmall, {
            scale: 1,
            opacity: 1,
            scaleX: -1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[7], duration, {
                    y: fourthSectionBottom,
                    ease: Sine.easeIn,
                    delay: delayFall,
                });
            },
            delay: delay * 4,
        });

        // triangle 2
        TweenMax.to(minionsFourthSection[5], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[5], duration, {
                    y: fourthSectionBottom,
                    rotation: -90,
                    ease: Sine.easeIn,
                    delay: delayFall,
                });
            },
            delay: delay * 4.5,
        });

        // square 2
        TweenMax.to(minionsFourthSection[2], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[2], duration, {
                    y: fourthSectionBottom - 31,
                    rotation: -7,
                    ease: Sine.easeIn,
                    delay: delayFall,
                });
            },
            delay: delay * 6.5,
        });

        // rectangle 2
        TweenMax.to(minionsFourthSection[8], durationSmall, {
            scale: 1,
            opacity: 1,
            scaleX: -1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[8], duration, {
                    y: fourthSectionBottom - 75,
                    ease: Sine.easeIn,
                    delay: delayFall,
                });
            },
            delay: delay * 7.5,
        });

        // arrow  2
        TweenMax.to(minionsFourthSection[10], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[10], duration, {
                    y: fourthSectionBottom - 65,
                    rotation: -860,
                    ease: Sine.easeIn,
                    delay: delayFall,
                });
            },
            delay: delay * 8,
        });

        // triangle 3
        TweenMax.to(minionsFourthSection[4], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[4], duration, {
                    y: fourthSectionBottom - 55,
                    rotation: -135,
                    ease: Sine.easeIn,
                    delay: delayFall,
                });
            },
            delay: delay * 9,
        });

        // rectangle 3
        TweenMax.to(minionsFourthSection[6], durationSmall, {
            scale: 1,
            opacity: 1,
            scaleX: -1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsFourthSection[6], duration, {
                    y: fourthSectionBottom - 59,
                    ease: Sine.easeIn,
                    delay: delayFall,
                });
            },
            delay: delay * 10,
        });
    };

    const experiencesAnim = () => {
        if (!morpion) return;

        const minionsMorpion = query({ selector: '.shape', ctx: morpion });
        const duration = 0.15;
        const delay = 0.5;
        const tl = new TimelineMax({ delay: 0.8 });

        animsState['home-experiences'].launched = true;

        morpion.classList.add('on');
        tl.to(minionsMorpion[1], duration, {
            scale: 1,
            opacity: 1,
            ease: Back.easeInOut.config(0.5),
        })
            .to(minionsMorpion[0], duration, {
                scale: 1,
                opacity: 1,
                ease: Back.easeInOut.config(0.5),
                delay,
            })
            .to(minionsMorpion[2], duration, {
                scale: 1,
                opacity: 1,
                ease: Back.easeInOut.config(0.5),
                delay,
            })
            .to(minionsMorpion[4], duration, {
                scale: 1,
                opacity: 1,
                ease: Back.easeInOut.config(0.5),
                delay,
            })
            .to(minionsMorpion[3], duration, {
                scale: 1,
                opacity: 1,
                ease: Back.easeInOut.config(0.5),
                delay,
                onComplete: () => {
                    TweenMax.to(
                        [
                            minionsMorpion[1],
                            minionsMorpion[2],
                            minionsMorpion[3],
                        ],
                        duration,
                        {
                            rotation: 10,
                            scale: 1.1,
                            ease: Back.easeInOut.config(0.5),
                            delay,
                            onComplete: () => {
                                TweenMax.to(
                                    [
                                        minionsMorpion[1],
                                        minionsMorpion[2],
                                        minionsMorpion[3],
                                    ],
                                    duration,
                                    {
                                        rotation: 0,
                                        scale: 1,
                                        ease: Back.easeInOut.config(2),
                                    }
                                );
                            },
                        }
                    );
                },
            });
    };

    const intersectionCallback = entries => {
        forEach(entries, entry => {
            if (entry.intersectionRatio < sectionsIntersectionRatio) return;

            switch (entry.target.id) {
                case 'home-intro':
                    if (!animsState[entry.target.id].launched) headerAnim();
                    break;
                case 'home-learning-experience':
                    if (
                        !animsState[entry.target.id].bis &&
                        animsState['home-intro'].done
                    )
                        learningAnim(entry.intersectionRatio);
                    break;
                case 'home-offers':
                    if (
                        !animsState[entry.target.id].launched &&
                        animsState['home-learning-experience'].done
                    )
                        offersAnim();
                    break;
                case 'home-about-us':
                    if (!animsState[entry.target.id].launched) aboutAnim();
                    break;
                case 'home-experiences':
                    if (!animsState[entry.target.id].launched)
                        experiencesAnim();
                    break;
                default:
                    break;
            }
        });
    };

    const initAnims = () => {
        for (index; index <= samplesNumber; index += 1) {
            thresholdSamples[index] = index / samplesNumber;
        }

        observer = new IntersectionObserver(intersectionCallback, {
            root: null,
            rootMargin: '0px',
            threshold: thresholdSamples,
        });

        forEach(homeSections, section => {
            observer.observe(section);
            animsState[section.id] = {
                launched: false,
                done: false,
                bis: false,
            };
        });

        TweenMax.set(planePath, { drawSVG: 0 });
    };

    const resetAnims = () => {
        minions = query({ selector: '.shape' });

        TweenMax.set(minions, {
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
            rotation: 0,
        });

        TweenMax.set(minions[3], {
            transformOrigin: '50% 50%',
        });

        videoFunctions.state.initiated = false;
        if (videoFunctions.mouseover) {
            video.removeEventListener('mouseover', videoFunctions.mouseover);
        }
        if (videoFunctions.mouseleave) {
            video.removeEventListener('mouseover', videoFunctions.mouseleave);
        }

        TweenMax.set(planePath, { drawSVG: 0 });
        TweenMax.set(plane, {
            x: 0,
            y: 0,
            rotation: 0,
        });

        forEach(homeSections, section => {
            animsState[section.id] = { launched: false, done: false };
        });
    };

    // launch anims if minions are visible (window width > 960)

    if (isDisplayed(minions[0])) initAnims();

    // Resize part
    superWindow.addResizeEndFunction(() => {
        if (!isDisplayed(minions[0])) return;
        // If anims were launched restart them
        if (animsState.animsLaunched) resetAnims();

        wh = window.innerHeight;
        ww = window.innerWidth;
        videoBottom = wh / 2;
        initialShapeTop = minions[0].getBoundingClientRect().top;
        introBottom =
            homeSections[1].getBoundingClientRect().top - initialShapeTop - 35;

        playerCenterY =
            video.getBoundingClientRect().top -
            initialShapeTop +
            video.offsetHeight / 2;

        if (promptScrollDownInterval) {
            clearInterval(promptScrollDownInterval);
        }

        // If you're not in mobile or tablet but you started with a small screen and now have a bigger one let's launch anims
        if (!animsState.animsLaunched) initAnims();
    });
};

export default minionsHandler;
