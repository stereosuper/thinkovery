const formHandler = () => {
    const forms = document.querySelectorAll('form');

    if( !forms.length ) return;

    const placeLabels = (e) => {
        if( e.target.value ) e.target.classList.add('active');
    };

    forms.forEach(form => {
        form.querySelectorAll('.field').forEach(field => {
            field.querySelector('input').addEventListener('input', placeLabels);
        });
    });
};

export default formHandler;
