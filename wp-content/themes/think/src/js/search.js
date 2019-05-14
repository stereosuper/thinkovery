import { forEach } from './utils';

const searchHandler = () => {
    const form = document.getElementById('searchform');
    const blogNav = document.getElementById('blog-nav');

    if( !form || !blogNav ) return;

    const input = form.querySelector('input');

    form.addEventListener('submit', (e) => {

        if( !form.classList.contains('on') ){
            e.preventDefault();
            form.classList.add('on');
            form.querySelector('input').focus();
            blogNav.classList.add('off');
        }

    });

    input.addEventListener('blur', (e) => {

        if( e.relatedTarget !== form.querySelector('#search') ){
            form.classList.remove('on');
            blogNav.classList.remove('off');
        }

    });
};

export default searchHandler;
