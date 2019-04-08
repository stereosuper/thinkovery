const makeBorders = () => {
    const bordersContainer = document.getElementById('borders');

    if (!bordersContainer && !document.body.classList.contains('home')) return;
    // Max elements number
    const wrappersNumber = 2;
    const bordersNumber = 4;

    // Html elements creation loop indexes
    let indexWrappers = 0;
    let indexBorders = 0;

    // Html elements variables
    let wrapper = null;
    let border = null;

    // Html elements classes
    const wrappersClasses = ['mouse', 'cat'];
    const bordersClasses = ['first', 'second', 'third', 'fourth'];

    // Borders wrappers' loop
    for (indexWrappers; indexWrappers < wrappersNumber; indexWrappers += 1) {
        wrapper = document.createElement('div');
        wrapper.classList.add(wrappersClasses[indexWrappers]);

        // Borders' loop
        indexBorders = 0;
        for (indexBorders; indexBorders < bordersNumber; indexBorders += 1) {
            border = document.createElement('span');
            border.classList.add('border', bordersClasses[indexBorders]);

            wrapper.appendChild(border);
        }
        bordersContainer.appendChild(wrapper);
    }
};

export default makeBorders;
