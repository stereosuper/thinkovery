import { forEach } from './utils';

// IE11 closest polyfill
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        
        return null;
    };
}

const newsletterHandler = () => {
    const forms = document.querySelectorAll('form');

    if( !forms.length ) return;

    forEach(forms, form => {
        const hiddenInput = form.querySelector('.gdpr');

        if( !hiddenInput ) return;

        const displayHiddenInput = () => {
            hiddenInput.classList.add('visible');
        };

        const hideHiddenInput = (e) => {
            if( !e.target.closest('form') && !hiddenInput.querySelector('input').checked ) hiddenInput.classList.remove('visible');
        };

        forEach(form.querySelectorAll('input'), input => {
            input.addEventListener('focus', displayHiddenInput);
        });

        document.addEventListener('click', hideHiddenInput);
    });
};

export default newsletterHandler;
