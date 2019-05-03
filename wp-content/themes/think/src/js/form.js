import { forEach } from './utils';

const formHandler = () => {
    const forms = document.querySelectorAll('form');

    if( !forms.length ) return;

    const placeLabels = (e) => {
        if( e.target.value ) e.target.classList.add('active');
    };

    forEach(forms, form => {
        forEach(form.querySelectorAll('.field'), field => {
            field.querySelector('input').addEventListener('input', placeLabels);
        });
    });
};

export default formHandler;
