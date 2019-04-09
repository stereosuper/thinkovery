<script>
    const logo = document.getElementById('logo');
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

    const dispatchLoaded = () => {
        const loaderEvent = createNewEvent('loaderHidden');
        document.dispatchEvent(loaderEvent);
    };

    const endLoading = () => {
        forEach(hiddenElts, elt => {
            elt.style.opacity = 1;
        });

        setTimeout(() => {
            nav.style.opacity = 1;
        }, 500);

        sessionStorage.setItem('loaded', 'true');

        dispatchLoaded();
    };

    const loaderAnimation = () => {
        setTimeout(() => {
            logo.querySelector('.circle').classList.add('hidden');
        }, delayLong);

        setTimeout(() => {
            logo.querySelector('.square').classList.remove('hidden');
        }, delayLong + delayShort);

        setTimeout(() => {
            logo.querySelector('.square').classList.add('hidden');
        }, delayLong * 2 + delayShort);

        setTimeout(() => {
            logo.querySelector('.triangle').classList.remove('hidden');
        }, delayLong * 2 + delayShort * 2);

        setTimeout(() => {
            logo.querySelector('.triangle').classList.add('hidden');
        }, delayLong * 3 + delayShort * 2);

        setTimeout(() => {
            logo.querySelector('.rectangle').classList.remove('hidden');
        }, delayLong * 3 + delayShort * 3);

        setTimeout(() => {
            logo.querySelector('.rectangle').classList.add('hidden');
        }, delayLong * 4 + delayShort * 3);

        setTimeout(() => {
            logo.querySelector('.drop').classList.remove('hidden');
        }, delayLong * 4 + delayShort * 4);

        setTimeout(() => {
            logo.querySelector('.drop').classList.add('hidden');
        }, delayLong * 5 + delayShort * 4);

        setTimeout(() => {
            logo.querySelector('.circle').classList.remove('hidden');
        }, delayLong * 5 + delayShort * 5);

        if (state.loaded) {
            setTimeout(endLoading, delayLong * 5 + delayShort * 5);
        } else {
            setTimeout(loaderAnimation, delayLong * 5 + delayShort * 5);
        }
    };

    const handleLoader = () => {
        if (sessionStorage.getItem('loaded') || !logo || !nav) {
            state.loadedStorage = true;
            forEach(hiddenElts, elt => {
                elt.style.opacity = 1;
            });

            if (nav) nav.style.opacity = 1;

            if (logo) {
                logo.querySelector('.square').classList.add('hidden');
                logo.querySelector('.circle').classList.remove('hidden');
            }
        } else {
            loaderAnimation();
        }
    };

    handleLoader();

    document.addEventListener(
        'readystatechange',
        () => {
            const ready = document.readyState;
            if (ready === 'complete' && !state.loadedStorage) {
                state.loaded = true;
            }
        },
        false
    );
</script>