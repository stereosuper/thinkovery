const formHandler = () => {
    const forms = document.querySelectorAll('form');

    if( !forms.length ) return;

    const placeLabels = (e) => {
        e.target.closest('.field').classList.add('active');
    };

    forms.forEach(form => {
        form.querySelectorAll('.field').forEach(field => {
            field.querySelector('input').addEventListener('focus', placeLabels);
        });
    });
};

export default formHandler;
