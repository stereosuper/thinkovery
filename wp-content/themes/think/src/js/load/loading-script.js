// @babel/polyfill is necessary for async imports
import '@babel/polyfill';
import { query } from '@stereorepo/sac';

const logoLoader = document.getElementById('logo-loader');
const nav = document.getElementById('main-navigation');
const hiddenElts = document.getElementsByClassName('js-load-hidden');
const delayLong = 250;
const delayShort = 5;

const state = {
    loaded: false,
    loadedStorage: false,
};

const forEach = (arr, callback) => {
    let i = 0;
    const { length } = arr;
    while (i < length) {
        callback(arr[i], i);
        i += 1;
    }
};

const createNewEvent = eventName => {
    let event;
    if (typeof Event === 'function') {
        event = new Event(eventName);
    } else {
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    }
    return event;
};

const endLoading = () => {
    const loaderEvent = createNewEvent('loaderHidden');

    logoLoader.style.opacity = 0;

    setTimeout(() => {
        forEach(hiddenElts, elt => {
            elt.style.opacity = 1;
        });
    }, 700);

    setTimeout(() => {
        nav.style.opacity = 1;
    }, 1100);

    sessionStorage.setItem('loaded', 'true');

    document.dispatchEvent(loaderEvent);
    document.documentElement.classList.add('loaded');
};

const loaderAnimation = () => {
    setTimeout(() => {
        const [shape] = logoLoader.getElementsByClassName('circle');
        shape.classList.add('hidden');
    }, delayLong);

    setTimeout(() => {
        const [shape] = logoLoader.getElementsByClassName('square');
        shape.classList.remove('hidden');
    }, delayLong + delayShort);

    setTimeout(() => {
        const [shape] = logoLoader.getElementsByClassName('square');
        shape.classList.add('hidden');
    }, delayLong * 2 + delayShort);
    
    setTimeout(() => {
        const [shape] = logoLoader.getElementsByClassName('triangle');
        shape.classList.remove('hidden');
    }, delayLong * 2 + delayShort * 2);
    
    setTimeout(() => {
        const [shape] = logoLoader.getElementsByClassName('triangle');
        shape.classList.add('hidden');
    }, delayLong * 3 + delayShort * 2);
    
    setTimeout(() => {
        const [shape] = logoLoader.getElementsByClassName('rectangle');
        shape.classList.remove('hidden');
    }, delayLong * 3 + delayShort * 3);
    
    setTimeout(() => {
        const [shape] = logoLoader.getElementsByClassName('rectangle');
        shape.classList.add('hidden');
    }, delayLong * 4 + delayShort * 3);
    
    setTimeout(() => {
        const [shape] = logoLoader.getElementsByClassName('drop');
        shape.classList.remove('hidden');
    }, delayLong * 4 + delayShort * 4);
    
    setTimeout(() => {
        const [shape] = logoLoader.getElementsByClassName('drop');
        shape.classList.add('hidden');
    }, delayLong * 5 + delayShort * 4);
    
    setTimeout(() => {
        const [shape] = logoLoader.getElementsByClassName('circle');
        shape.classList.remove('hidden');
    }, delayLong * 5 + delayShort * 5);

    if (state.loaded) {
        setTimeout(endLoading, delayLong);
    } else {
        setTimeout(loaderAnimation, delayLong * 5 + delayShort * 5);
    }
};

const handleLoader = () => {
    if (sessionStorage.getItem('loaded') || !logoLoader || !nav) {
        state.loadedStorage = true;
        if (logoLoader) logoLoader.style.opacity = 0;

        forEach(hiddenElts, elt => {
            elt.style.opacity = 1;
        });

        if (nav) nav.style.opacity = 1;

        document.documentElement.classList.add('loaded');
    } else {
        if (logoLoader) logoLoader.style.opacity = 1;
        loaderAnimation();
    }
};

if (SVGElement.prototype.getElementsByClassName === undefined) {
    SVGElement.prototype.getElementsByClassName = function(className) {
        return this.querySelectorAll('.' + className);
    };
}

if (!('classList' in SVGElement.prototype)) {
    Object.defineProperty(SVGElement.prototype, 'classList', {
        get() {
            return {
                contains: className => {
                    return (
                        this.className.baseVal.split(' ').indexOf(className) !==
                        -1
                    );
                },
                add: className => {
                    return this.setAttribute(
                        'class',
                        this.getAttribute('class') + ' ' + className
                    );
                },
                remove: className => {
                    var removedClass = this.getAttribute('class').replace(
                        new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'),
                        '$2'
                    );
                    if (this.classList.contains(className)) {
                        this.setAttribute('class', removedClass);
                    }
                },
            };
        },
    });
}

handleLoader();

document.addEventListener(
    'readystatechange',
    () => {
        if (document.readyState === 'complete' /* && !state.loadedStorage */) {
            state.loaded = true;
        }
    },
    false
);
