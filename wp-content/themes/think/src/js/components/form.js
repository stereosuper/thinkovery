import { forEach, query } from '../utils';

const formHandler = () => {
    const fields = query({ selector: '.field' });

    if (!fields.length) return;

    const checkIfEmpty = input => {
        if (input.value) {
            input.closest('.field').classList.add('active');
        } else {
            input.closest('.field').classList.remove('active');
        }
    };

    const placeLabelsIn = e => {
        e.target.closest('.field').classList.add('active');
    };

    const placeLabelsOut = e => {
        checkIfEmpty(e.target);
    };

    let input;

    forEach(fields, field => {
        [input] = query({ selector: 'input, textarea', ctx: field });

        if (!input) return;

        checkIfEmpty(input);
        input.addEventListener('focusin', placeLabelsIn);
        input.addEventListener('focusout', placeLabelsOut);
    });
};

export default formHandler;
