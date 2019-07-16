(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["io"],{

/***/ "./wp-content/themes/think/src/js/components/io.js":
/*!*********************************************************!*\
  !*** ./wp-content/themes/think/src/js/components/io.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! intersection-observer */ "./node_modules/intersection-observer/intersection-observer.js");
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(intersection_observer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./wp-content/themes/think/src/js/utils/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }





function Io() {
  var _this = this;

  this.resized = true;
  var minThreshold = _stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__["superWindow"].h > _stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__["superWindow"].breakpoints.vertical.xs ? 0.15 : 0.1;
  var indexThreshold = 0;
  var thresholdsNumber = 10;
  var thresholdSamples = []; // NOTE: offers menu part

  var offersMenu = document.getElementById('offers-menu');
  var offersAnchors = offersMenu ? _toConsumableArray(offersMenu.getElementsByTagName('a')) : null;
  var menuOffersEntries = {
    activeId: null
  };

  for (indexThreshold; indexThreshold <= thresholdsNumber; indexThreshold += 1) {
    thresholdSamples[indexThreshold] = indexThreshold / thresholdsNumber;
  }

  this.init = function () {
    var objectsToIO = [].slice.call(document.querySelectorAll('[data-io]'));
    var observer = new IntersectionObserver(function (entries) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__["forEach"])(entries, function (entry) {
        if (entry.intersectionRatio > minThreshold) {
          _this["".concat(entry.target.dataset.io, "In")](entry);

          if (entry.target.hasAttribute('data-io-single')) observer.unobserve(entry.target);
        } // else if (entry.intersectionRatio < threshold) {
        //     this[`${entry.target.dataset.io}Out`](entry.target);
        // }

      });
    }, {
      threshold: thresholdSamples,
      rootMargin: '-100px 0px'
    });
    Object(_utils__WEBPACK_IMPORTED_MODULE_2__["forEach"])(objectsToIO, function (obj) {
      if (obj.hasAttribute('data-io-observed')) return;
      observer.observe(obj);
      obj.setAttribute('data-io-observed', '');
    });
  }; // Reveal minions


  this.updateBorderIn = function (entry) {
    var target = entry.target;
    var borders = document.getElementById('borders');
    if (!borders) return;
    var event = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["createNewEvent"])('updateBorders');
    borders.setAttribute('data-next-section', target.getAttribute('data-section-name'));
    borders.dispatchEvent(event);
  };

  this.updateOffersMenuIn = function (entry) {
    var target = entry.target;

    if (!offersMenu) {
      offersMenu = document.getElementById('offers-menu');
    }

    if (!offersAnchors.length) {
      offersAnchors = _toConsumableArray(offersMenu.getElementsByTagName('a'));
    }

    if (!offersMenu) return;

    if (!menuOffersEntries[target.id]) {
      menuOffersEntries[target.id] = {
        ratio: 0,

        set setRatio(value) {
          this.ratio = value;

          if (!menuOffersEntries.activeId) {
            menuOffersEntries.activeId = {
              id: this.target.id,
              ratio: this.ratio
            };
            document.getElementById("anchor-".concat(this.target.id)).classList.add('active');
          } else {
            if (this.target.id === menuOffersEntries.activeId.id) {
              menuOffersEntries.activeId.ratio = this.ratio;
            }

            if (this.ratio > menuOffersEntries.activeId.ratio) {
              menuOffersEntries.activeId = {
                id: this.target.id,
                ratio: this.ratio
              };
            }

            Object(_utils__WEBPACK_IMPORTED_MODULE_2__["forEach"])(offersAnchors, function (anchor) {
              if (anchor.id === "anchor-".concat(menuOffersEntries.activeId.id)) {
                anchor.classList.add('active');
              } else {
                anchor.classList.remove('active');
              }
            });
          }
        }

      };
    }

    menuOffersEntries[target.id].target = target;
    menuOffersEntries[target.id].setRatio = entry.intersectionRatio;
  };

  this.revealNewsletterIn = function (_ref) {
    var target = _ref.target;
    target.classList.add('activated');
  };
}

/* harmony default export */ __webpack_exports__["default"] = (new Io());

/***/ })

}]);
//# sourceMappingURL=io.js.map?38d5e504e95b63babb5065e9108d036b