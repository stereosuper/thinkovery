/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp-content/themes/think/js";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./wp-content/themes/think/src/js/load/loading-script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./wp-content/themes/think/src/js/load/loading-script.js":
/*!***************************************************************!*\
  !*** ./wp-content/themes/think/src/js/load/loading-script.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logoLoader = document.getElementById('logo-loader');
var nav = document.getElementById('main-navigation');
var hiddenElts = document.getElementsByClassName('js-load-hidden');
var delayLong = 250;
var delayShort = 5;
var state = {
  loaded: false,
  loadedStorage: false
};

var forEach = function forEach(arr, callback) {
  var i = 0;
  var length = arr.length;

  while (i < length) {
    callback(arr[i], i);
    i += 1;
  }
};

var createNewEvent = function createNewEvent(eventName) {
  var e = new Event(eventName);

  if (typeof Event !== 'function') {
    e = document.createEvent('Event');
    e.initEvent(eventName, true, true);
  }

  return e;
};

var endLoading = function endLoading() {
  var loaderEvent = createNewEvent('loaderHidden');
  logoLoader.style.opacity = 0;
  setTimeout(function () {
    forEach(hiddenElts, function (elt) {
      elt.style.opacity = 1;
    });
  }, 700);
  setTimeout(function () {
    nav.style.opacity = 1;
  }, 1100);
  sessionStorage.setItem('loaded', 'true');
  document.dispatchEvent(loaderEvent);
  document.documentElement.classList.add('loaded');
};

var loaderAnimation = function loaderAnimation() {
  setTimeout(function () {
    logoLoader.querySelector('.circle').classList.add('hidden');
  }, delayLong);
  setTimeout(function () {
    logoLoader.querySelector('.square').classList.remove('hidden');
  }, delayLong + delayShort);
  setTimeout(function () {
    logoLoader.querySelector('.square').classList.add('hidden');
  }, delayLong * 2 + delayShort);
  setTimeout(function () {
    logoLoader.querySelector('.triangle').classList.remove('hidden');
  }, delayLong * 2 + delayShort * 2);
  setTimeout(function () {
    logoLoader.querySelector('.triangle').classList.add('hidden');
  }, delayLong * 3 + delayShort * 2);
  setTimeout(function () {
    logoLoader.querySelector('.rectangle').classList.remove('hidden');
  }, delayLong * 3 + delayShort * 3);
  setTimeout(function () {
    logoLoader.querySelector('.rectangle').classList.add('hidden');
  }, delayLong * 4 + delayShort * 3);
  setTimeout(function () {
    logoLoader.querySelector('.drop').classList.remove('hidden');
  }, delayLong * 4 + delayShort * 4);
  setTimeout(function () {
    logoLoader.querySelector('.drop').classList.add('hidden');
  }, delayLong * 5 + delayShort * 4);
  setTimeout(function () {
    logoLoader.querySelector('.circle').classList.remove('hidden');
  }, delayLong * 5 + delayShort * 5);

  if (state.loaded) {
    setTimeout(endLoading, delayLong);
  } else {
    setTimeout(loaderAnimation, delayLong * 5 + delayShort * 5);
  }
};

var handleLoader = function handleLoader() {
  if (sessionStorage.getItem('loaded') || !logoLoader || !nav) {
    state.loadedStorage = true;
    if (logoLoader) logoLoader.style.opacity = 0;
    forEach(hiddenElts, function (elt) {
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
document.addEventListener('readystatechange', function () {
  if (document.readyState === 'complete'
  /* && !state.loadedStorage */
  ) {
      state.loaded = true;
    }
}, false);

/***/ })

/******/ });
//# sourceMappingURL=loading-script.js.map