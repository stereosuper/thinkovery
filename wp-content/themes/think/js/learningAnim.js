(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["learningAnim"],{

/***/ "./wp-content/themes/think/src/js/components/learningAnim.js":
/*!*******************************************************************!*\
  !*** ./wp-content/themes/think/src/js/components/learningAnim.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./wp-content/themes/think/src/js/utils/index.js");
/* harmony import */ var _utils_Window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Window */ "./wp-content/themes/think/src/js/utils/Window.js");
/* harmony import */ var _plugins_DrawSVGPlugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../plugins/DrawSVGPlugin */ "./wp-content/themes/think/src/js/plugins/DrawSVGPlugin.js");
/* harmony import */ var _plugins_MorphSVGPlugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plugins/MorphSVGPlugin */ "./wp-content/themes/think/src/js/plugins/MorphSVGPlugin.js");






var learningAnimHandler = function learningAnimHandler() {
  var animSchema = function animSchema() {
    var schema = document.getElementById('learning-anim');
    if (!schema) return;
    var pathBezier = MorphSVGPlugin.pathDataToBezier(schema.querySelector('circle'));
    var minions = schema.querySelectorAll('.shape');
    var tls = [];
    var resizeTimer;

    var init = function init() {
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["forEach"])(minions, function (minion, i) {
        tls[i] = new gsap__WEBPACK_IMPORTED_MODULE_0__["TimelineMax"]({
          paused: true,
          repeat: -1
        });
        tls[i].to(minion, 50, {
          bezier: {
            values: pathBezier,
            type: 'cubic'
          },
          ease: Linear.easeNone
        });
        tls[i].progress(i * 0.2);
        tls[i].play();
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set(minion, {
          opacity: 1
        });
      });
    }; // launch anim if schema is visible (window width > 960)


    if (getComputedStyle(schema).display !== 'none') init();
    _utils_Window__WEBPACK_IMPORTED_MODULE_2__["default"].addResizeFunction(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (getComputedStyle(schema).display !== 'none') {
          init();
        }
      }, 500);
    });
  };

  var animElts = function animElts() {
    var svg = document.getElementById('elts-svg');
    var section = document.getElementById('learning-elts');
    if (!svg || !section) return; // Constants used to create the intersection observer threshold array

    var samplesNumber = 10;
    var thresholdSamples = [];
    var index = 0;
    var observer = null;
    var path = svg.querySelector('.path');
    var shadow1 = svg.querySelector('.shadow1');
    var shadow2 = svg.querySelector('.shadow2');
    var shadow3 = svg.querySelector('.shadow3');
    var shadow4 = svg.querySelector('.shadow4');
    var shadow5 = svg.querySelector('.shadow5');
    var img1 = svg.querySelector('.img1');
    var img2 = svg.querySelector('.img2');
    var img3 = svg.querySelector('.img3');
    var animLaunched = false;

    var init = function init() {
      animLaunched = true;
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(path, 2, {
        drawSVG: '100%'
      });
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(shadow1, 0.2, {
        opacity: 0.6,
        delay: 0.4
      });
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(shadow2, 0.2, {
        opacity: 0.6,
        delay: 0.5
      });
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(img1, 0.3, {
        opacity: 1,
        delay: 0.6
      });
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(shadow3, 0.2, {
        opacity: 0.6,
        delay: 0.9
      });
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(shadow4, 0.2, {
        opacity: 0.6,
        delay: 1
      });
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(img2, 0.3, {
        opacity: 1,
        delay: 1.1
      });
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(shadow5, 0.2, {
        opacity: 0.6,
        delay: 1.7
      });
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(img3, 0.3, {
        opacity: 1,
        delay: 1.7
      });
    };

    var intersectionCallback = function intersectionCallback(entries) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["forEach"])(entries, function (entry) {
        if (entry.intersectionRatio < 0.5 || animLaunched) return;
        init();
      });
    };

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set(path, {
      drawSVG: 0
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set([shadow1, shadow2, shadow3, shadow4, shadow5], {
      opacity: 0
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set([img1, img2, img3], {
      opacity: 0
    });

    for (index; index <= samplesNumber; index++) {
      thresholdSamples[index] = index / samplesNumber;
    }

    observer = new IntersectionObserver(intersectionCallback, {
      root: null,
      rootMargin: '0px',
      threshold: thresholdSamples
    });
    observer.observe(section);
  };

  animElts();
  animSchema();
};

/* harmony default export */ __webpack_exports__["default"] = (learningAnimHandler);

/***/ })

}]);
//# sourceMappingURL=learningAnim.js.map?e74ad8633d82d3360314d1a62b2cff67