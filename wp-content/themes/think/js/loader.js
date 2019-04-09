const logo = document.getElementById('logo');
const nav = document.getElementById('main-navigation');
const hiddenElts = document.getElementsByClassName('js-load-hidden');
const delayLong = 250;
const delayShort = 5;

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
    forEach(hiddenElts, elt => {
        elt.style.opacity = 1;
    });

    setTimeout(() => {
        nav.style.opacity = 1;
    }, 500);

    sessionStorage.setItem('loaded', 'true');
};

// if (sessionStorage.getItem('loaded') || !logo || !nav) {
//     forEach(hiddenElts, elt => {
//         elt.style.opacity = 1;
//     });

//     if (nav) nav.style.opacity = 1;

//     if (logo) {
//         logo.querySelector('.square').classList.add('hidden');
//         logo.querySelector('.circle').classList.remove('hidden');
//     }
// } else {
setTimeout(() => {
    logo.querySelector('.square').classList.add('hidden');
}, delayLong);

setTimeout(() => {
    logo.querySelector('.triangle').classList.remove('hidden');
}, delayLong + delayShort);

setTimeout(() => {
    logo.querySelector('.triangle').classList.add('hidden');
}, delayLong * 2 + delayShort);

setTimeout(() => {
    logo.querySelector('.rectangle').classList.remove('hidden');
}, delayLong * 2 + delayShort * 2);

setTimeout(() => {
    logo.querySelector('.rectangle').classList.add('hidden');
}, delayLong * 3 + delayShort * 2);

setTimeout(() => {
    logo.querySelector('.drop').classList.remove('hidden');
}, delayLong * 3 + delayShort * 3);

setTimeout(() => {
    logo.querySelector('.drop').classList.add('hidden');
}, delayLong * 4 + delayShort * 3);

setTimeout(() => {
    logo.querySelector('.circle').classList.remove('hidden');
}, delayLong * 4 + delayShort * 4);

setTimeout(endLoading, delayLong * 5 + delayShort * 4);
// }

document.addEventListener(
    'readystatechange',
    () => {
        console.log('TCL: document.readyState', document.readyState);
        if (document.readyState === 'complete') {
        }
    },
    false
);
