import { TweenMax } from 'gsap';
import { createNewEvent, forEach } from './utils';
import scroll from './utils/Scroll';
import win from './utils/Window';
import { colors, easing } from './global';

const ioBorders = () => {
    const bordersWrapper = document.getElementById('borders');

    if (!bordersWrapper) return;

    // Borders html elements
    const bordersMouse = bordersWrapper.querySelector('.mouse').children;
    const bordersCat = bordersWrapper.querySelector('.cat').children;

    // Borders transformations data
    const borderMapping = {
        top: { index: 0, origin: '0% 50%' },
        right: { index: 1, origin: '50% 0%' },
        left: { index: 3, origin: '50% 100%' },
        bottom: { index: 2, origin: '100% 50%' },
        reset: {
            top: { origin: '100% 50%' },
            right: { origin: '50% 100%' },
            bottom: { origin: '0% 50%' },
            left: { origin: '50% 0%' },
        },
        byIndex: ['top', 'right', 'bottom', 'left'],
    };

    /**
     * @description updates display state depending on borders style
     */
    const handleDisplay = () =>
        getComputedStyle(bordersWrapper).display !== 'none';

    /**
     * @description select borders children type
     * @param {object} { type }
     * @returns {array}
     */
    const selectBordersElements = ({ type }) => {
        let bordersElements = [];

        switch (type) {
            case 'cat':
                bordersElements = bordersCat;
                break;
            case 'mouse':
                bordersElements = bordersMouse;
                break;
            default:
                break;
        }

        return bordersElements;
    };

    /**
     * @description update next section borders
     * @param {array} { borders }
     */
    const animateBorder = ({ type, borders, queueCallback }) => {
        const bordersElements = selectBordersElements({ type });
        const [
            {
                position,
                duration,
                color,
                maxScale,
                axis,
                origin,
                nestNext = true,
            },
            nextBorder,
        ] = borders;

        const isAll = position === 'all';

        let ease = '';
        if (easing === 'in') {
            ease = easing.catMouseEaseIn;
        } else if (easing === 'out') {
            ease = easing.catMouseEaseOut;
        }

        let scaleX = null;
        let scaleY = null;
        if (!isAll) {
            scaleX = axis === 'x' ? maxScale : 1;
            scaleY = axis === 'y' ? maxScale : 1;
        }

        const tweenParams = {
            transformOrigin:
                origin || (!isAll ? borderMapping[position].origin : ''),
            scaleX,
            scaleY,
            ease,
            onComplete: () => {
                if (!nestNext && nextBorder) return;

                if (nextBorder) {
                    animateBorder({
                        type,
                        borders: borders.slice(1, borders.length),
                        queueCallback,
                    });
                } else if (queueCallback) {
                    queueCallback();
                }
            },
        };

        if (color) {
            tweenParams.backgroundColor = color;
        }

        TweenMax.to(
            isAll
                ? bordersElements
                : bordersElements[borderMapping[position].index],
            duration,
            tweenParams
        );

        if (nestNext || !nextBorder) return;

        borders.shift();
        animateBorder({ type, borders, queueCallback });
    };

    const animateBordersHome = () => {
        // Borders animations state
        const state = {
            init: false,
            display: false,
            isMoving: false,
            queue: [],
            currentSection: null,
            nextSection: null,
            ends: {
                start: null,
                end: null,
            },
            wheelTimeout: null,
        };

        // Borders update sequences
        const bordersAnimations = {
            intro: {
                borders: [
                    {
                        position: 'top',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'x',
                        easing: 'out',
                    },
                    {
                        position: 'all',
                        duration: 0.5,
                        color: colors.funGreen,
                        easing: 'out',
                        nestNext: false,
                    },
                    {
                        position: 'right',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'y',
                        easing: 'out',
                    },
                    {
                        position: 'bottom',
                        duration: 0.5,
                        maxScale: 0.5,
                        axis: 'x',
                        easing: 'out',
                    },
                ],
            },
            learningExperience: {
                borders: [
                    {
                        position: 'bottom',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'x',
                        easing: 'out',
                    },
                    {
                        position: 'all',
                        color: colors.pictonBlue,
                        duration: 0.5,
                        easing: 'out',
                        nestNext: false,
                    },
                    {
                        position: 'left',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'y',
                        easing: 'out',
                    },
                    {
                        position: 'top',
                        duration: 0.5,
                        maxScale: 0.25,
                        axis: 'x',
                        easing: 'out',
                    },
                ],
            },
            offers: {
                borders: [
                    {
                        position: 'top',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'x',
                        easing: 'out',
                    },
                    {
                        position: 'all',
                        color: colors.funGreen,
                        duration: 0.5,
                        easing: 'out',
                        nestNext: false,
                    },
                    {
                        position: 'right',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'y',
                        easing: 'out',
                    },
                    {
                        position: 'top',
                        duration: 0.5,
                        maxScale: 0,
                        axis: 'x',
                        origin: '100% 50%',
                        easing: 'in',
                        nestNext: false,
                    },
                    {
                        position: 'bottom',
                        duration: 0.5,
                        maxScale: 0.75,
                        axis: 'x',
                        easing: 'out',
                    },
                ],
            },
            aboutUs: {
                borders: [
                    {
                        position: 'bottom',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'x',
                        easing: 'out',
                    },
                    {
                        position: 'all',
                        color: colors.persimmon,
                        duration: 0.5,
                        easing: 'out',
                        nestNext: false,
                    },
                    {
                        position: 'left',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'y',
                        easing: 'out',
                    },
                    {
                        position: 'bottom',
                        duration: 0.5,
                        maxScale: 0.25,
                        axis: 'x',
                        origin: '0% 50%',
                        easing: 'in',
                        nestNext: false,
                    },
                    {
                        position: 'top',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'x',
                        easing: 'out',
                    },
                ],
            },
            experiences: {
                borders: [
                    {
                        position: 'top',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'x',
                        easing: 'out',
                    },
                    {
                        position: 'all',
                        color: colors.darkOrange,
                        duration: 0.5,
                        easing: 'out',
                        nestNext: false,
                    },
                    {
                        position: 'right',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'y',
                        easing: 'out',
                    },
                    {
                        position: 'top',
                        duration: 0.5,
                        maxScale: 0.25,
                        axis: 'x',
                        origin: '100% 0%',
                        easing: 'in',
                        nestNext: false,
                    },
                    {
                        position: 'bottom',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'x',
                        easing: 'out',
                    },
                ],
            },
            homeFooter: {
                borders: [
                    {
                        position: 'right',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'y',
                        easing: 'out',
                    },
                    {
                        position: 'all',
                        color: colors.funGreen,
                        duration: 0.5,
                        easing: 'out',
                        nestNext: false,
                    },
                    {
                        position: 'bottom',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'x',
                        easing: 'out',
                    },
                    {
                        position: 'right',
                        duration: 0.5,
                        maxScale: 0.5,
                        axis: 'y',
                        origin: '50% 100%',
                        easing: 'in',
                        nestNext: false,
                    },
                    {
                        position: 'left',
                        duration: 0.5,
                        maxScale: 1,
                        axis: 'y',
                        easing: 'out',
                    },
                ],
            },
        };

        /**
         * @description queuing process if a border animation is currently playing
         */
        const processQueue = () => {
            state.isMoving = false;

            if (!state.queue.length) return;

            const event = createNewEvent('updateQueue');

            if (state.queue.length > 2) {
                state.queue.splice(0, state.queue.length - 1);
            }

            [state.nextSection] = state.queue;
            state.queue.shift();
            bordersWrapper.dispatchEvent(event);
        };

        /**
         * @description handle scroll speed
         * @param {event} e
         */
        const handleWheel = e => {
            const { deltaY } = e;
            state.scrollSpeed = Math.abs(deltaY);
            e.stopPropagation();

            if (state.isMoving) return;
            if (state.scrollSpeed > 2) {
                if (state.wheelTimeout) {
                    clearTimeout(state.wheelTimeout);
                }
                state.wheelTimeout = setTimeout(() => {
                    processQueue();
                }, 100);
            }
        };

        const computeResetBorders = ({ defaultAnim, color, start, end }) => {
            let returnBorders = { borders: [] };

            if (state.ends.start !== null && state.ends.end !== null) {
                const lastEndIndex = state.ends.end;
                const newStartIndex = borderMapping[start.position].index;
                const newEndIndex = borderMapping[end.position].index;
                const lastStartIndex = state.ends.start;

                // Head
                let delta =
                    Math.abs(
                        newEndIndex < lastEndIndex
                            ? newEndIndex + 4 - lastEndIndex
                            : newEndIndex - lastEndIndex
                    ) + 1;
                let index = 0;
                for (index; index < delta; index += 1) {
                    const borderIndex = (lastEndIndex + index) % 4;

                    returnBorders.borders[index] = {
                        position: borderMapping.byIndex[borderIndex],
                        duration: 0.5,
                        maxScale: index === delta - 1 ? end.scale : 1,
                        axis: borderIndex % 2 ? 'y' : 'x',
                        ease: 'out',
                        nestNext: false,
                    };
                }

                // Tail
                delta =
                    Math.abs(
                        newStartIndex < lastStartIndex
                            ? newStartIndex + 4 - lastStartIndex
                            : newStartIndex - lastStartIndex
                    ) + 1;
                for (index = 0; index < delta; index += 1) {
                    const borderIndex = (lastStartIndex + index) % 4;

                    let position = borderMapping.byIndex[borderIndex];
                    let maxScale = 0;
                    if (index === delta - 1) {
                        position = borderMapping.byIndex[borderIndex];
                        maxScale = start.scale;
                    }

                    const border = {
                        position,
                        duration: 0.5,
                        maxScale,
                        origin:
                            borderMapping.reset[
                                borderMapping.byIndex[borderIndex]
                            ].origin,
                        axis: borderIndex % 2 ? 'y' : 'x',
                        ease: 'in',
                    };

                    const insertIndex = index * 2 + 1;
                    returnBorders.borders.splice(insertIndex, 0, border);

                    state.ends.end = newEndIndex;
                    state.ends.start = newStartIndex;
                }

                returnBorders.borders.splice(1, 0, {
                    position: 'all',
                    color,
                    duration: 0.5,
                    easing: 'out',
                    nestNext: false,
                });
            } else {
                returnBorders = bordersAnimations[defaultAnim];
                state.ends.start =
                    borderMapping[returnBorders.borders[0].position].index;
                state.ends.end =
                    borderMapping[
                        returnBorders.borders[
                            returnBorders.borders.length - 1
                        ].position
                    ].index;
            }
            return returnBorders;
        };

        /**
         * @description border sections animation controller
         */
        const updateBorder = () => {
            if (
                state.isMoving ||
                (state.currentSection &&
                    state.nextSection &&
                    state.currentSection === state.nextSection)
            )
                return;

            state.isMoving = true;

            switch (state.nextSection) {
                case 'home-intro':
                    animateBorder({
                        type: 'cat',
                        ...computeResetBorders({
                            defaultAnim: 'intro',
                            color: colors.funGreen,
                            start: { position: 'top', scale: 1 },
                            end: { position: 'bottom', scale: 0.5 },
                        }),
                        queueCallback: processQueue,
                    });
                    break;
                case 'home-learning-experience':
                    animateBorder({
                        type: 'cat',
                        ...computeResetBorders({
                            defaultAnim: 'learningExperience',
                            color: colors.pictonBlue,
                            start: { position: 'bottom', scale: 1 },
                            end: { position: 'top', scale: 0.25 },
                        }),
                        queueCallback: processQueue,
                    });
                    break;
                case 'home-offers':
                    animateBorder({
                        type: 'cat',
                        ...computeResetBorders({
                            defaultAnim: 'offers',
                            color: colors.funGreen,
                            start: { position: 'right', scale: 1 },
                            end: { position: 'bottom', scale: 0.75 },
                        }),
                        queueCallback: processQueue,
                    });
                    break;
                case 'home-about-us':
                    animateBorder({
                        type: 'cat',
                        ...computeResetBorders({
                            defaultAnim: 'aboutUs',
                            color: colors.persimmon,
                            start: { position: 'bottom', scale: 0.25 },
                            end: { position: 'top', scale: 1 },
                        }),
                        queueCallback: processQueue,
                    });
                    break;
                case 'home-experiences':
                    animateBorder({
                        type: 'cat',
                        ...computeResetBorders({
                            defaultAnim: 'experiences',
                            color: colors.darkOrange,
                            start: { position: 'top', scale: 0.25 },
                            end: { position: 'bottom', scale: 1 },
                        }),
                        queueCallback: processQueue,
                    });
                    break;
                case 'home-footer':
                    animateBorder({
                        type: 'cat',
                        ...computeResetBorders({
                            defaultAnim: 'homeFooter',
                            color: colors.funGreen,
                            start: { position: 'right', scale: 0.5 },
                            end: { position: 'left', scale: 1 },
                        }),
                        queueCallback: processQueue,
                    });
                    break;
                default:
                    break;
            }
            state.currentSection = state.nextSection;
        };

        const addToQueue = () => {
            if (!state.display) return;

            const borderNextSection = bordersWrapper.getAttribute(
                'data-next-section'
            );

            state.queue.push(borderNextSection);

            if (state.init) return;
            processQueue();
            state.init = true;
        };

        // animateBordersHome main calls
        state.display = handleDisplay();

        window.addEventListener('wheel', handleWheel, false);

        bordersWrapper.addEventListener('updateBorders', addToQueue, false);

        bordersWrapper.addEventListener('updateQueue', updateBorder, false);

        addToQueue();

        win.addResizeFunction(() => {
            state.display = handleDisplay();

            if (!state.display || !state.queue.length) return;
            processQueue();
        });
    };

    const animateProgressBorders = () => {
        const { body, documentElement } = document;
        const pageHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            documentElement.clientHeight,
            documentElement.scrollHeight,
            documentElement.offsetHeight
        );

        // Borders animations state
        const state = {
            init: false,
            display: false,
            ratio: 0,
            randomBorder: null,
        };

        const bordersPatterns = [
            [
                {
                    position: 'top',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
                {
                    position: 'right',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'y',
                    easing: 'out',
                },
                {
                    position: 'bottom',
                    duration: 0.5,
                    maxScale: 0.5,
                    axis: 'x',
                    easing: 'out',
                },
            ],
            [
                {
                    position: 'bottom',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
                {
                    position: 'left',
                    duration: 0.5,
                    maxScale: 0.75,
                    axis: 'y',
                    easing: 'out',
                },
            ],
            [
                {
                    position: 'left',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'y',
                    easing: 'out',
                },
                {
                    position: 'top',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
                {
                    position: 'right',
                    duration: 0.5,
                    maxScale: 0.25,
                    axis: 'y',
                    easing: 'out',
                },
            ],
            [
                {
                    position: 'right',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'y',
                    easing: 'out',
                },
                {
                    position: 'bottom',
                    duration: 0.5,
                    maxScale: 1,
                    axis: 'x',
                    easing: 'out',
                },
                {
                    position: 'left',
                    duration: 0.5,
                    maxScale: 0.25,
                    axis: 'y',
                    easing: 'out',
                },
            ],
        ];

        /**
         * @description update next section borders' progress
         * @param {array} { borders }
         */
        const animatePath = ({ type, borders }) => {
            const progressAnimationDuration = 0.23;
            const bordersElements = selectBordersElements({ type });

            const { ratio } = state;
            const ratioFactor = borders.reduce(
                (acc, current) => acc + current.maxScale,
                0
            );
            let pathRatio = 0;
            let scale = 0;

            forEach(borders, border => {
                scale =
                    ratio > pathRatio / ratioFactor
                        ? Math.min(
                              border.maxScale,
                              (ratio - pathRatio / ratioFactor) * ratioFactor
                          )
                        : 0;

                TweenMax.to(
                    bordersElements[borderMapping[border.position].index],
                    state.init ? 0.05 : progressAnimationDuration,
                    {
                        transformOrigin: borderMapping[border.position].origin,
                        scaleX:
                            border.position === 'top' ||
                            border.position === 'bottom'
                                ? scale
                                : 1,
                        scaleY:
                            border.position === 'left' ||
                            border.position === 'right'
                                ? scale
                                : 1,
                        onComplete: () => {
                            if (!state.init) {
                                state.init = true;
                            }
                        },
                    }
                );

                pathRatio += border.maxScale;
            });
        };

        /**
         * @description border sections path animation controller
         */
        const selectPath = () => {
            animatePath({
                type: 'cat',
                borders: state.randomBorder,
            });
        };

        const computeRatioThenSelectPath = () => {
            state.ratio = scroll.scrollTop / (pageHeight - window.innerHeight);
            if (!state.display) return;
            selectPath();
        };

        const drawProgress = () => {
            if (!state.display) return;
            if (!state.randomBorder) {
                const randomPatternIndex = Math.floor(
                    Math.random() * bordersPatterns.length
                );
                state.randomBorder = bordersPatterns[randomPatternIndex];
            }

            animateBorder({
                type: 'mouse',
                borders: state.randomBorder,
            });

            scroll.addScrollFunction(computeRatioThenSelectPath);

            if (state.init) return;
            computeRatioThenSelectPath();
        };

        // animateProgressBorders main calls
        state.display = handleDisplay();

        drawProgress();

        win.addResizeFunction(() => {
            state.display = handleDisplay();
            drawProgress();
        });
    };

    // Main calls
    if (document.body.classList.contains('home')) {
        animateBordersHome();
    } else {
        animateProgressBorders();
    }
};
export default ioBorders;
