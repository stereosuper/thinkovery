import { forEach } from './utils';

const memoryHandler = () => {
    const memory = document.getElementById('memory');

    if (!memory) return;

    const success = document.getElementById('memory-success');
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
    let done = false;

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
            '#icon-' + shape
        );

        svg.appendChild(use);
        front.appendChild(svg);
        card.appendChild(front);
        memory.appendChild(card);
    };

    shapes.sort(() => {
        return 0.5 - Math.random();
    });
    forEach(shapes, shape => {
        createCard(shape);
    });

    cards = memory.querySelectorAll('.card');
    cardsArray = [...cards];

    forEach(cards, elt => {
        elt.addEventListener('click', () => {
            if (memory.classList.contains('off')) return;

            active = memory.querySelector('.on');
            if (active) {
                active.classList.add('first');
                active.classList.remove('on');
                elt.classList.add('on');

                if (
                    elt.getAttribute('data-shape') ===
                    active.getAttribute('data-shape')
                ) {
                    elt.classList.add('done');
                    elt.classList.remove('on');
                    active.classList.add('done');
                    active.classList.remove('first');

                    done = cardsArray.every(el => el.classList.contains('done'));
                    if (done) {
                        success.classList.add('on');
                    }
                } else {
                    memory.classList.add('off');
                    setTimeout(() => {
                        elt.classList.remove('on');
                        active.classList.remove('first');
                        memory.classList.remove('off');
                    }, 1000);
                }
            } else {
                elt.classList.add('on');
            }
        });
    });
};

export default memoryHandler;
