import { forEach } from './utils';

const formHandler = () => {
    const fields = document.querySelectorAll('.field');

    if( !fields.length ) return;

    const checkIfEmpty = (input) => {
        input.value ? input.closest('.field').classList.add('active') : input.closest('.field').classList.remove('active');
    };

    const placeLabelsIn = (e) => {
        e.target.closest('.field').classList.add('active');
    };

    const placeLabelsOut = (e) => {
        checkIfEmpty( e.target );
    };

    let input;

    forEach(fields, field => {
        input = field.querySelector('input, textarea');

        if( !input ) return;

        checkIfEmpty( input );
        input.addEventListener('focusin', placeLabelsIn);
        input.addEventListener('focusout', placeLabelsOut);
    });
};

export default formHandler;
