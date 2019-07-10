import { query } from '../utils';

const searchHandler = () => {
    const [form] = query({ selector: '#searchform' });
    const [blogNav] = query({ selector: '#blog-nav' });

    if (!form || !blogNav) return;

    const [input] = query({ selector: 'input', ctx: form });

    form.addEventListener('submit', e => {
        if (!form.classList.contains('on')) {
            e.preventDefault();
            const [inputToFocus] = query({ selector: 'input', ctx: form });

            form.classList.add('on');
            inputToFocus.focus();
            blogNav.classList.add('off');
        }
    });

    input.addEventListener('blur', e => {
        if (e.relatedTarget !== form.getElementById('#search')) {
            form.classList.remove('on');
            blogNav.classList.remove('off');
        }
    });
};

export default searchHandler;
