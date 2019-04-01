const burgerHandler = () => {
    const state = {
        burgerActivated: false,
    };

    const { body } = document;
    const isHome = body.classList.contains('home');
    const borders = document.getElementById('borders');

    if (!borders && !isHome) return;

    const updateBorder = () => {
        const borderSection = borders.getAttribute('data-section');

        switch (borderSection) {
            case 'test-1':
                // TODO: update borders with gsap
                break;
            case 'test-2':
                // TODO: update borders with gsap
                break;
            default:
                break;
        }
    };

    borders.addEventListener('updateBorders', updateBorder, false);
};

export default burgerHandler;
