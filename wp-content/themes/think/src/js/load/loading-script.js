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
    let e = new Event(eventName);
    if (typeof Event !== 'function') {
        e = document.createEvent('Event');
        e.initEvent(eventName, true, true);
    }
    return e;
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
        logoLoader.querySelector('.circle').classList.add('hidden');
    }, delayLong);

    setTimeout(() => {
        logoLoader.querySelector('.square').classList.remove('hidden');
    }, delayLong + delayShort);

    setTimeout(() => {
        logoLoader.querySelector('.square').classList.add('hidden');
    }, delayLong * 2 + delayShort);

    setTimeout(() => {
        logoLoader.querySelector('.triangle').classList.remove('hidden');
    }, delayLong * 2 + delayShort * 2);

    setTimeout(() => {
        logoLoader.querySelector('.triangle').classList.add('hidden');
    }, delayLong * 3 + delayShort * 2);

    setTimeout(() => {
        logoLoader.querySelector('.rectangle').classList.remove('hidden');
    }, delayLong * 3 + delayShort * 3);

    setTimeout(() => {
        logoLoader.querySelector('.rectangle').classList.add('hidden');
    }, delayLong * 4 + delayShort * 3);

    setTimeout(() => {
        logoLoader.querySelector('.drop').classList.remove('hidden');
    }, delayLong * 4 + delayShort * 4);

    setTimeout(() => {
        logoLoader.querySelector('.drop').classList.add('hidden');
    }, delayLong * 5 + delayShort * 4);

    setTimeout(() => {
        logoLoader.querySelector('.circle').classList.remove('hidden');
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
