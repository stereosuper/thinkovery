import { query, forEach } from './utils';

const checkboxHandler = () => {
    const customCheckboxes = query({ selector: '.js-custom-checkbox' });

    if (!customCheckboxes.length) return;

    const checkboxClickHandler = checkbox => {
        const [realCheckbox] = query({
            selector: 'input',
            ctx: checkbox.parentElement,
        });
        const isActive = realCheckbox.getAttribute('checked');

        if (isActive !== '') {
            realCheckbox.setAttribute('checked', '');
            checkbox.classList.add('activated');
        } else {
            realCheckbox.removeAttribute('checked');
            checkbox.classList.remove('activated');
        }
    };

    forEach(customCheckboxes, customCheckbox => {
        customCheckbox.addEventListener(
            'click',
            () => {
                checkboxClickHandler(customCheckbox);
            },
            false
        );
    });
};

export default checkboxHandler;
