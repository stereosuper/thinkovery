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
import { MorphSVGPlugin } from './plugins/MorphSVGPlugin';
import './plugins/DrawSVGPlugin';
import { forEach } from './utils';
import win from './utils/Window';
import { easing } from './global';

const minionsHandler = () => {
    const homeSections = [].slice.call(
        document.getElementsByClassName('js-home-section')
    );
    const video = document.getElementById('home-video');

    if( !homeSections.length || !video ) return;

    // Intervals
    let scrollDowninterval = null;

    // Easing functions
    // In
    const Pow1In = Power1.easeIn;
    const SineIn = Sine.easeIn;

    // Out
    const Pow2Out = Power2.easeOut;

    // In Out
    const Pow1InOut = Power1.easeInOut;
    const Pow4InOut = Power4.easeInOut;
    const backInOut = Back.easeInOut;

    const minions = homeSections[0].querySelectorAll('.shape');
    let wh = window.innerHeight;
    let ww = window.innerWidth;
    const animsState = [];
    let headerBottom = wh/2 - 80 - window.scrollY;
    let videoBottom = wh - (video.getBoundingClientRect().top + video.offsetHeight / 2) - window.scrollY;
    let planePath = document.getElementById('plane-path');
    planePath = planePath ? planePath.querySelector('path') : undefined;
    let resizeTimer;
    let animsLaunched = false;

    // Constants used to create the intersection observer threshold array
    const samplesNumber = 10;
    const thresholdSamples = [];
    let index = 0;
    let observer = null;

    let learningFirstPartDone = false;


    const headerAnim = () => {
        const tlPlayer = new TimelineMax();

        const scrollDownAnimation = (duration = 0.7) => {
            TweenMax.to(minions[2], duration, {
                x: -10,
                y: videoBottom - 70,
                rotation: 90,
                ease: Power2.easeInOut,
                onComplete: () => {
                    TweenMax.to(minions[2], 0.3, {
                        y: videoBottom - 50,
                        ease: Back.easeOut.config(1.2),
                    });
                },
            });
        };

        const scrollDownLoop = () => {
            scrollDowninterval = setInterval(scrollDownAnimation, 2000);
        };

        animsState['home-intro'].launched = true;

        tlPlayer
            .to(minions[2], 0.3, {
                scale: 4,
                opacity: 1,
                onComplete: () => {
                    if (video) {
                        video.classList.add('player-on');
                        video.classList.add('on');
                        TweenMax.set(video.querySelector('.iframe'), {
                            opacity: 1,
                            delay: 0.7,
                        });
                    }
                },
                ease: Power4.easeIn,
            })
            .to(minions[2], 0.2, { scale: 3, ease: Pow2Out })
            .to(minions[2], 1, {
                x: -10,
                y: videoBottom - 50,
                rotation: 90,
                ease: Elastic.easeOut.config(1.1, 0.9),
                delay: 0.3,
                onStart: () => {
                    animsState['home-intro'].done = true;

                    video.addEventListener('mouseover', () => {
                        if( scrollDowninterval ){
                            clearInterval(scrollDowninterval);
                        }

                        TweenMax.to(minions[2], 0.2, {x: 0, y: 0, rotation: 0});
                    }, false);

                    video.addEventListener('mouseleave', () => {
                        scrollDownAnimation(0.3);
                        scrollDownLoop();
                    }, false);

                    scrollDownLoop();
                },
            });

        TweenMax.set([minions[0], minions[1], minions[3], minions[4]], {
            opacity: 1,
        });

        TweenMax.to([minions[0], minions[1], minions[3], minions[4]], 0.5, {
            scale: 3,
            ease: Pow1In,
        });

        TweenMax.to(minions[0], 1.8, {
            bezier: {
                curviness: 1,
                values: [
                    { x: -100, y: -30 },
                    { x: -200, y: 0 },
                    { x: -240, y: headerBottom + 100 },
                ],
            },
            delay: 0.15,
            ease: Pow2Out,
        });

        TweenMax.to(minions[1], 1.8, {
            bezier: {
                curviness: 1,
                values: [
                    { x: -50, y: -70 },
                    { x: -100, y: -50 },
                    { x: -130, y: headerBottom + 100 },
                ],
            },
            delay: 0.15,
            ease: Pow2Out,
        });

        TweenMax.to(minions[3], 1.8, {
            bezier: {
                curviness: 1,
                values: [
                    { x: 50, y: -60 },
                    { x: 100, y: -40 },
                    { x: 130, y: headerBottom + 100 },
                ],
            },
            delay: 0.15,
            ease: Pow2Out,
        });

        TweenMax.to(minions[4], 1.8, {
            bezier: {
                curviness: 1,
                values: [
                    { x: 100, y: -10 },
                    { x: 190, y: 10 },
                    { x: 240, y: headerBottom + 100 },
                ],
            },
            delay: 0.15,
            ease: Pow2Out,
        });
    };

    const learningAnim = ( ratio ) => {
        if( !animsState['home-learning-experience'].launched ){
            animsState['home-learning-experience'].launched = true;

            if( scrollDowninterval ){
                clearInterval(scrollDowninterval);
            }

            TweenMax.to(minions[2], 0.7, {
                x: 0,
                y: headerBottom + 100,
                rotation: 0,
                ease: backInOut.config(2),
                onComplete: () => {
                    learningFirstPartDone = true;
                }
            });

        }else if( ratio > 0.75 && learningFirstPartDone ){
            animsState['home-learning-experience'].bis = true;

            const windowBottom = homeSections[1].offsetHeight + ww / 50;
            const planePathBezier = planePath ? MorphSVGPlugin.pathDataToBezier(planePath) : '';
            const plane = document.getElementById('plane');

            const planeBottom = planePath.getBoundingClientRect().bottom - minions[0].getBoundingClientRect().bottom;

            if( scrollDowninterval ){
                clearInterval(scrollDowninterval);
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
                                    y: `+=${windowBottom / 2}`,
                                },
                                {
                                    x: '+=200',
                                    y: `+=${planeBottom}`,
                                },
                            ],
                        },
                        ease: backInOut.config(1)
                    });

                    TweenMax.to(minions[1], 1.2, {
                        bezier: {
                            curviness: 1,
                            values: [
                                { y: `+=${windowBottom / 2}` },
                                { x: '+=10', y: `+=${windowBottom - 60}` },
                            ],
                        },
                        ease: Pow4InOut
                    });

                    TweenMax.to(minions[2], 1.4, {
                        rotation: 450,
                        bezier: {
                            curviness: 1,
                            values: [
                                { y: `+=${windowBottom / 2}` },
                                { y: `+=${windowBottom - 40}` },
                            ],
                        },
                        ease: backInOut.config(1.1)
                    });

                    TweenMax.set(minions[3], {
                        x: 153,
                        y: headerBottom + 123,
                        transformOrigin: '100% 100%',
                    });

                    TweenMax.to(minions[3], 1.2, {
                        bezier: {
                            curviness: 1,
                            values: [
                                {
                                    x: '+=80',
                                    y: `+=${windowBottom / 2}`,
                                    rotation: 0,
                                },
                                {
                                    x: '+=20',
                                    y: `+=${windowBottom - 20}`,
                                    rotation: 30,
                                },
                                {
                                    x: '-=20',
                                    y: `+=${windowBottom - 18}`,
                                    rotation: 0,
                                },
                            ],
                        },
                        ease: Pow1InOut
                    });

                    TweenMax.to(minions[4], 1.5, {
                        bezier: {
                            curviness: 1,
                            values: [
                                {
                                    x: '+=80',
                                    y: `+=${windowBottom / 2}`,
                                    rotation: -180,
                                },
                                {
                                    x: '-=20',
                                    y: `+=${windowBottom}`,
                                    rotation: -720,
                                },
                            ],
                        },
                        ease: Power4.easeOut,
                        onComplete: () => {
                            animsState['home-learning-experience'].done = true;
                        }
                    });
                },
            });
        }
    };

    const offersAnim = () => {
        const duration = 0.5;
        const delay = 0.05;

        const dropBottom = minions[4].getBoundingClientRect().bottom - minions[0].getBoundingClientRect().bottom;

        const newDrop = minions[0].cloneNode(true);
        document.getElementById('shapes').appendChild(newDrop);

        animsState['home-offers'].launched = true;

        TweenMax.to(newDrop, duration, {
            bezier: {
                curviness: 1,
                values: [
                    { x: '-=160', y: `+=${dropBottom / 2}` },
                    { x: '-=200', y: `+=${dropBottom}` },
                ],
            },
            ease: backInOut.config(1),
            delay,
        });
        TweenMax.to(minions[1], duration, {
            y: '+=60',
            ease: Pow4InOut,
            delay: delay * 2,
        });
        TweenMax.to(minions[2], duration, {
            rotation: 360,
            y: '+=40',
            ease: backInOut.config(1.5),
            delay,
        });
        TweenMax.to(minions[3], duration, { y: '+=20', ease: Pow1InOut });
    };

    const aboutAnim = () => {
        const minionsThirdSection = homeSections[3].querySelectorAll('.shape');
        const windowBottom = homeSections[3].offsetHeight - 300;
        const duration = 0.8;
        const durationSmall = 0.25;
        const delay = 0.25;
        const delayFall = 0.07;

        animsState['home-about-us'].launched = true;

        // arrow  1
        TweenMax.to(minionsThirdSection[9], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[9], duration, {
                    y: windowBottom,
                    rotation: -470,
                    ease: SineIn,
                    delay: delayFall,
                });
            },
        });

        // triangle 1
        TweenMax.to(minionsThirdSection[3], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[3], duration, {
                    y: windowBottom,
                    rotation: -90,
                    ease: SineIn,
                    delay: delayFall,
                });
            },
            delay,
        });

        // drop
        TweenMax.to(minionsThirdSection[0], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[0], duration, {
                    y: windowBottom,
                    ease: Pow1In,
                    delay: delayFall,
                });
            },
            delay: delay * 2,
        });

        // square 1
        TweenMax.to(minionsThirdSection[1], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[1], duration, {
                    y: windowBottom + 5,
                    rotation: 45,
                    ease: SineIn,
                    delay: delayFall,
                });
            },
            delay: delay * 3,
        });

        // rectangle 1
        TweenMax.to(minionsThirdSection[7], durationSmall, {
            scale: 1,
            opacity: 1,
            scaleX: -1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[7], duration, {
                    y: windowBottom,
                    ease: SineIn,
                    delay: delayFall,
                });
            },
            delay: delay * 4,
        });

        // triangle 2
        TweenMax.to(minionsThirdSection[5], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[5], duration, {
                    y: windowBottom,
                    rotation: -90,
                    ease: SineIn,
                    delay: delayFall,
                });
            },
            delay: delay * 4.5,
        });

        // square 2
        TweenMax.to(minionsThirdSection[2], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[2], duration, {
                    y: windowBottom - 31,
                    rotation: -7,
                    ease: SineIn,
                    delay: delayFall,
                });
            },
            delay: delay * 6.5,
        });

        // rectangle 2
        TweenMax.to(minionsThirdSection[8], durationSmall, {
            scale: 1,
            opacity: 1,
            scaleX: -1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[8], duration, {
                    y: windowBottom - 75,
                    ease: SineIn,
                    delay: delayFall,
                });
            },
            delay: delay * 7.5,
        });

        // arrow  2
        TweenMax.to(minionsThirdSection[10], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[10], duration, {
                    y: windowBottom - 65,
                    rotation: -860,
                    ease: SineIn,
                    delay: delayFall,
                });
            },
            delay: delay * 8,
        });

        // triangle 3
        TweenMax.to(minionsThirdSection[4], durationSmall, {
            scale: 1,
            opacity: 1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[4], duration, {
                    y: windowBottom - 55,
                    rotation: -135,
                    ease: SineIn,
                    delay: delayFall,
                });
            },
            delay: delay * 9,
        });

        // rectangle 3
        TweenMax.to(minionsThirdSection[6], durationSmall, {
            scale: 1,
            opacity: 1,
            scaleX: -1,
            ease: easing.easePop,
            onComplete: () => {
                TweenMax.to(minionsThirdSection[6], duration, {
                    y: windowBottom - 59,
                    ease: SineIn,
                    delay: delayFall,
                });
            },
            delay: delay * 10,
        });
    };

    const experiencesAnim = () => {
        const morpion = document.getElementById('morpion');

        if (!morpion) return;

        const minionsMorpion = morpion.querySelectorAll('.shape');
        const duration = 0.15;
        const delay = 0.5;
        const tl = new TimelineMax({ delay: 0.8 });

        animsState['home-experiences'].launched = true;

        morpion.classList.add('on');
        tl.to(minionsMorpion[1], duration, {
            scale: 1,
            opacity: 1,
            ease: backInOut.config(0.5),
        })
            .to(minionsMorpion[0], duration, {
                scale: 1,
                opacity: 1,
                ease: backInOut.config(0.5),
                delay,
            })
            .to(minionsMorpion[2], duration, {
                scale: 1,
                opacity: 1,
                ease: backInOut.config(0.5),
                delay,
            })
            .to(minionsMorpion[4], duration, {
                scale: 1,
                opacity: 1,
                ease: backInOut.config(0.5),
                delay,
            })
            .to(minionsMorpion[3], duration, {
                scale: 1,
                opacity: 1,
                ease: backInOut.config(0.5),
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
                            ease: backInOut.config(0.5),
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
                                        ease: backInOut.config(2),
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

            if( entry.intersectionRatio < 0.7 ) return;

            switch (entry.target.id) {
                case 'home-intro':
                    if( !animsState[entry.target.id].launched ) headerAnim();
                    break;
                case 'home-learning-experience':
                    if( !animsState[entry.target.id].bis && animsState['home-intro'].done ) learningAnim(entry.intersectionRatio);
                    break;
                case 'home-offers':
                    if( !animsState[entry.target.id].launched && animsState['home-learning-experience'].done ) offersAnim();
                    break;
                case 'home-about-us':
                    if( !animsState[entry.target.id].launched ) aboutAnim();
                    break;
                case 'home-experiences':
                    if( !animsState[entry.target.id].launched ) experiencesAnim();
                    break;
                default:
                    break;
            }
        });
    };

    const initAnims = () => {
        animsLaunched = true;

        for( index; index <= samplesNumber; index++ ){
            thresholdSamples[index] = index / samplesNumber;
        }

        observer = new IntersectionObserver(intersectionCallback, {
            root: null,
            rootMargin: '0px',
            threshold: thresholdSamples,
        });

        forEach(homeSections, section => {
            observer.observe(section);
            animsState[section.id] = { launched: false, done: false, bis: false };
        });

        TweenMax.set(planePath, { drawSVG: 0 });
    };

    const restartAnims = () => {
        TweenMax.set(minions, {
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
            rotation: 0,
        });
        TweenMax.set(planePath, { drawSVG: 0 });

        forEach(homeSections, section => {
            animsState[section.id] = { launched: false, done: false };
        });
    };

    // launch anims if minions are visible (window width > 960)
    if( getComputedStyle(minions[0]).display !== 'none' ) initAnims();

    win.addResizeFunction(() => {
        wh = window.innerHeight;
        ww = window.innerWidth;
        headerBottom = wh - (video.getBoundingClientRect().top + video.offsetHeight / 2) - window.scrollY;

        if( scrollDowninterval ){
            clearInterval(scrollDowninterval);
        }

        clearTimeout( resizeTimer );
        resizeTimer = setTimeout(() => {
            if( getComputedStyle(minions[0]).display === 'none' ) return;
                
            if( !animsLaunched ){
                // if you're not in mobile or tablet but you started with a small screen and now have a bigger one let's launch anims
                initAnims();
            }else{
                // if anims were launched let's do it again so elements will be placed ok
                restartAnims();
            }
        }, 500);
    });
};

export default minionsHandler;
