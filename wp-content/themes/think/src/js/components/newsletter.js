import { forEach, query } from '../utils';

const newsletterHandler = () => {
    const forms = query({ selector: 'form' });

    if (!forms.length) return;

    forEach(forms, form => {
        const hiddenInput = form.querySelector('.gdpr');

        if (!hiddenInput) return;

        const displayHiddenInput = () => {
            hiddenInput.classList.add('visible');
        };

        const hideHiddenInput = e => {
            if (
                !e.target.closest('form') &&
                !hiddenInput.querySelector('input').checked
            )
                hiddenInput.classList.remove('visible');
        };

        forEach(form.querySelectorAll('input'), input => {
            input.addEventListener('focus', displayHiddenInput);
        });

        document.addEventListener('click', hideHiddenInput);
    });
};

export default newsletterHandler;
