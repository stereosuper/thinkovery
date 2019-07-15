(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["offersMenu"],{

/***/ "./wp-content/themes/think/src/js/components/offersMenu.js":
/*!*****************************************************************!*\
  !*** ./wp-content/themes/think/src/js/components/offersMenu.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");
/* harmony import */ var collant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! collant */ "./node_modules/collant/dist/index.js");
/* harmony import */ var collant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(collant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gsap/ScrollToPlugin */ "./node_modules/gsap/ScrollToPlugin.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global */ "./wp-content/themes/think/src/js/global/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils */ "./wp-content/themes/think/src/js/utils/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var offersMenuHandler = function offersMenuHandler() {
  var _query = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["query"])({
    selector: '#offers-menu'
  }),
      _query2 = _slicedToArray(_query, 1),
      offersMenu = _query2[0];

  if (!offersMenu) return;

  var _query3 = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["query"])({
    selector: '#offers'
  }),
      _query4 = _slicedToArray(_query3, 1),
      offers = _query4[0];

  var menuHeight = offersMenu.getBoundingClientRect().height;

  var anchors = _toConsumableArray(offersMenu.getElementsByTagName('a'));

  imagesloaded__WEBPACK_IMPORTED_MODULE_2___default()(offers, function () {
    collant__WEBPACK_IMPORTED_MODULE_1___default()(offersMenu, 0, {
      minimumWidth: 960
    });
  });
  Object(_utils__WEBPACK_IMPORTED_MODULE_6__["forEach"])(anchors, function (anchor) {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      var sectionId = anchor.href.split('/').pop().slice(1);
      var section = document.getElementById(sectionId);

      if (section) {
        setTimeout(function () {
          var offset = section.getBoundingClientRect().top + window.scrollY - menuHeight;
          gsap__WEBPACK_IMPORTED_MODULE_3__["TweenMax"].to(window, 0.5, {
            scrollTo: {
              y: offset,
              offsetY: _global__WEBPACK_IMPORTED_MODULE_5__["globalStyles"].lineHeight
            },
            ease: _global__WEBPACK_IMPORTED_MODULE_5__["easing"].easeFade
          });
        }, 100);
      }
    }, false);
  });
  _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].addResizeFunction(function () {
    menuHeight = offersMenu.getBoundingClientRect().height;
  });
};

/* harmony default export */ __webpack_exports__["default"] = (offersMenuHandler);

/***/ })

}]);
//# sourceMappingURL=offersMenu.js.map?c3ad786295bc312cb6f490058d20353a