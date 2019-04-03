const newsletterHandler = () => {
    const form = document.getElementById('newsletter-form');

    if( !form.length ) return;

    const hiddenInput = form.querySelector('.gdpr');

    const displayHiddenInput = () => {
        hiddenInput.classList.add('visible');
    };

    const hideHiddenInput = (e) => {
        if( !e.target.closest('#newsletter-form') && !hiddenInput.querySelector('input').checked ) hiddenInput.classList.remove('visible');
    };

    form.querySelectorAll('input').forEach(input =>{
        input.addEventListener('focus', displayHiddenInput);
    });

    document.addEventListener('click', hideHiddenInput);
};

export default newsletterHandler;
