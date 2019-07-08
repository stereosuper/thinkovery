import { forEach, query } from './utils';

const memoryHandler = () => {
    const [memory] = query({ selector: '#memory' });

    if (!memory) return;
    const [successElement] = query({ selector: '#memory-success' });

    const shapes = [
        'rectangle',
        'rectangle',
        'triangle',
        'triangle',
        'square',
        'square',
        'drop',
        'drop',
        'circle',
        'circle',
    ];
    let cards = null;
    let cardsArray = [];
    let active = null;
    const state = {
        clicked: false,
        done: false,
    };

    const createCard = shape => {
        const card = document.createElement('div');
        const front = document.createElement('div');
        const svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        );
        const use = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'use'
        );

        card.setAttribute('class', 'card');
        card.setAttribute('data-shape', shape);

        front.setAttribute('class', 'front');

        svg.setAttribute('class', 'icon');

        use.setAttributeNS(
            'http://www.w3.org/1999/xlink',
            'xlink:href',
            `#icon-${shape}`
        );

        svg.appendChild(use);
        front.appendChild(svg);
        card.appendChild(front);
        memory.appendChild(card);
    };

    shapes.sort(() => 0.5 - Math.random());
    forEach(shapes, shape => {
        createCard(shape);
    });

    cards = memory.querySelectorAll('.card');
    cardsArray = [...cards];

    const randomCardIndex = Math.floor(Math.random() * cards.length * 0.5);

    forEach(cards, (card, index) => {
        if (index === randomCardIndex) {
            card.classList.add('blink');
        }

        card.addEventListener('click', () => {
            if (memory.classList.contains('off')) return;

            if (!state.clicked) {
                state.clicked = true;
                memory.classList.add('clicked');
            }

            active = memory.querySelector('.on');
            if (active) {
                active.classList.add('first');
                active.classList.remove('on');
                card.classList.add('on');

                if (
                    card.getAttribute('data-shape') ===
                    active.getAttribute('data-shape')
                ) {
                    card.classList.add('done');
                    card.classList.remove('on');
                    active.classList.add('done');
                    active.classList.remove('first');

                    state.done = cardsArray.every(el =>
                        el.classList.contains('done')
                    );
                    if (state.done) {
                        successElement.classList.add('on');
                    }
                } else {
                    memory.classList.add('off');
                    setTimeout(() => {
                        card.classList.remove('on');
                        active.classList.remove('first');
                        memory.classList.remove('off');
                    }, 1000);
                }
            } else {
                card.classList.add('on');
            }
        });
    });
};

export default memoryHandler;
