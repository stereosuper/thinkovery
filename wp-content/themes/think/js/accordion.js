(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["accordion"],{

/***/ "./wp-content/themes/think/src/js/components/accordion.js":
/*!****************************************************************!*\
  !*** ./wp-content/themes/think/src/js/components/accordion.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap/ScrollToPlugin */ "./node_modules/gsap/ScrollToPlugin.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./wp-content/themes/think/src/js/utils/index.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global */ "./wp-content/themes/think/src/js/global/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var accordionHandler = function accordionHandler() {
  var accordions = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["query"])({
    selector: '.wp-block-stereoberg-question-answer'
  });
  if (!accordions.length) return;
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["forEach"])(accordions, function (accordion) {
    var _query = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["query"])({
      selector: 'h3',
      ctx: accordion
    }),
        _query2 = _slicedToArray(_query, 1),
        title = _query2[0];

    title.addEventListener('click', function () {
      var parent = title.parentElement;
      var answer = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["query"])({
        selector: '.js-answer',
        ctx: title.parentElement
      });
      var alreadyActivated = parent.classList.contains('activated');

      var _query3 = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["query"])({
        selector: '.answer-content',
        ctx: title.parentElement
      }),
          _query4 = _slicedToArray(_query3, 1),
          answerContent = _query4[0];

      var maxHeight = answerContent.getBoundingClientRect().height;
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["forEach"])(accordions, function (resetParent) {
        resetParent.classList.remove('activated');
        gsap__WEBPACK_IMPORTED_MODULE_2__["TweenMax"].to(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["query"])({
          selector: '.js-answer',
          ctx: resetParent
        }), 0.3, {
          maxHeight: 0,
          opacity: 0,
          ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easeFade
        });
      });
      if (alreadyActivated) return;
      gsap__WEBPACK_IMPORTED_MODULE_2__["TweenMax"].to(answer, 0.3, {
        maxHeight: maxHeight,
        opacity: 1,
        ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easeFade
      });
      parent.classList.add('activated');
      setTimeout(function () {
        var offset = title.getBoundingClientRect().top + window.scrollY;
        gsap__WEBPACK_IMPORTED_MODULE_2__["TweenMax"].to(window, 0.5, {
          scrollTo: {
            y: offset,
            offsetY: _global__WEBPACK_IMPORTED_MODULE_3__["globalStyles"].lineHeight
          },
          ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easeFade
        });
      }, 600);
    }, false);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (accordionHandler);

/***/ })

}]);
//# sourceMappingURL=accordion.js.map?595da7cb7afd5746c536225bd380c98d