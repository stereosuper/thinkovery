import { query, forEach } from './utils';

const checkboxHandler = () => {
    const customCheckboxes = query({
        selector: '.js-custom-checkbox',
    });
    const checkboxFields = query({
        selector: '.is-checkbox',
    });

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

    const labelClickHandler = checkboxField => {
        const [realCheckbox] = query({
            selector: 'input',
            ctx: checkboxField,
        });
        const [customCheckbox] = query({
            selector: '.js-custom-checkbox',
            ctx: checkboxField,
        });

        const isActive = realCheckbox.getAttribute('checked');

        if (isActive !== '') {
            realCheckbox.setAttribute('checked', '');
            customCheckbox.classList.add('activated');
        } else {
            realCheckbox.removeAttribute('checked');
            customCheckbox.classList.remove('activated');
        }
    };

    forEach(checkboxFields, checkboxField => {
        checkboxField.addEventListener(
            'click',
            ({ target }) => {
                if (target.classList.contains('wpcf7-list-item-label')) {
                    labelClickHandler(checkboxField);
                }
            },
            false
        );
    });
};

export default checkboxHandler;
