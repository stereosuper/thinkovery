(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["minions"],{

/***/ "./wp-content/themes/think/src/js/components/minions.js":
/*!**************************************************************!*\
  !*** ./wp-content/themes/think/src/js/components/minions.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _plugins_MorphSVGPlugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../plugins/MorphSVGPlugin */ "./wp-content/themes/think/src/js/plugins/MorphSVGPlugin.js");
/* harmony import */ var _plugins_DrawSVGPlugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../plugins/DrawSVGPlugin */ "./wp-content/themes/think/src/js/plugins/DrawSVGPlugin.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global */ "./wp-content/themes/think/src/js/global/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./wp-content/themes/think/src/js/utils/index.js");
/* harmony import */ var _utils_Window__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/Window */ "./wp-content/themes/think/src/js/utils/Window.js");
/* harmony import */ var _utils_Snif__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/Snif */ "./wp-content/themes/think/src/js/utils/Snif.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var minionsHandler = function minionsHandler() {
  var homeSections = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["query"])({
    selector: '.js-home-section'
  });

  var _query = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["query"])({
    selector: '#home-video'
  }),
      _query2 = _slicedToArray(_query, 1),
      video = _query2[0];

  var minions = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["query"])({
    selector: '.shape'
  });
  if (!homeSections.length || !video || !minions.length) return;
  var isSafari = _utils_Snif__WEBPACK_IMPORTED_MODULE_6__["default"].isSafari();
  var tweenOptimizations = isSafari ? {
    force3D: false
  } : {};

  var _query3 = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["query"])({
    selector: '#plane-path path'
  }),
      _query4 = _slicedToArray(_query3, 1),
      planePath = _query4[0];

  var _query5 = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["query"])({
    selector: '#plane'
  }),
      _query6 = _slicedToArray(_query5, 1),
      plane = _query6[0];

  var _query7 = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["query"])({
    selector: '#morpion'
  }),
      _query8 = _slicedToArray(_query7, 1),
      morpion = _query8[0];

  var player = null;
  var newDrop = null;
  var animsState = {
    'home-intro': {
      launched: false,
      done: false
    },
    'home-learning-experience': {
      launched: false,
      done: false
    },
    'home-offers': {
      launched: false,
      done: false
    },
    'home-about-us': {
      launched: false,
      done: false
    },
    'home-experiences': {
      launched: false,
      done: false
    },

    get animsLaunched() {
      var _this = this;

      return Object.keys(this).filter(function (section) {
        return section !== 'animsLaunched';
      }).reduce(function (accumulator, val) {
        return accumulator || _this[val].launched;
      }, false);
    }

  };
  var videoFunctions = {
    state: {
      initiated: false
    },
    mouseover: null,
    mouseleave: null
  }; // Intervals

  var promptScrollDownInterval = null;
  var wh = window.innerHeight;
  var ww = window.innerWidth;
  var initialShapeTop = minions[0].getBoundingClientRect().top;
  var introBottom = homeSections[1].getBoundingClientRect().top - initialShapeTop - 70;
  var videoBottom = wh / 2;
  var playerCenterY = video.getBoundingClientRect().top - initialShapeTop + video.offsetHeight / 2; // Constants used to create the intersection observer threshold array

  var sectionsIntersectionRatio = 0.25;
  var samplesNumber = 10;
  var thresholdSamples = [];
  var index = 0;
  var observer = null;
  var learningFirstPartDone = false;

  var headerAnim = function headerAnim() {
    if (player) {
      player.remove();
    }

    player = minions[2].cloneNode(true);
    minions[2].parentElement.appendChild(player);
    var tlPlayer = new gsap__WEBPACK_IMPORTED_MODULE_0__["TimelineMax"]();

    var promptScrollDownAnimation = function promptScrollDownAnimation() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.7;
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(player, duration, {
        x: -10,
        y: videoBottom - 70,
        rotation: 90,
        ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power2"].easeInOut,
        onComplete: function onComplete() {
          gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(player, 0.3, {
            y: videoBottom - 50,
            ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeOut.config(1.2)
          });
        }
      });
    };

    var promptScrollDownLoop = function promptScrollDownLoop() {
      promptScrollDownInterval = setInterval(promptScrollDownAnimation, 2000);
    };

    animsState['home-intro'].launched = true;
    tlPlayer.to(player, 0.3, _objectSpread({
      scale: 4,
      opacity: 1
    }, tweenOptimizations, {
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power4"].easeIn,
      onComplete: function onComplete() {
        if (video) {
          video.classList.add('player-on', 'on');
          gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["query"])({
            selector: '.iframe',
            ctx: video
          }), {
            opacity: 1,
            delay: 0.7
          });
        }
      }
    })).to(player, 0.2, _objectSpread({
      scale: 3
    }, tweenOptimizations, {
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power2"].easeOut
    })).to(player, 1, {
      x: -10,
      y: videoBottom - 50,
      rotation: 90,
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Elastic"].easeOut.config(1.1, 0.9),
      delay: 0.3,
      onStart: function onStart() {
        animsState['home-intro'].done = true;

        if (!videoFunctions.mouseover) {
          videoFunctions.mouseover = function () {
            if (!videoFunctions.state.initiated) {
              videoFunctions.state.initiated = true;
            }

            if (promptScrollDownInterval) {
              clearInterval(promptScrollDownInterval);
            }

            gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(player, 0.2, {
              x: 0,
              y: playerCenterY,
              rotation: 0
            });
          };
        }

        video.addEventListener('mouseover', videoFunctions.mouseover, false);

        if (!videoFunctions.mouseleave) {
          videoFunctions.mouseleave = function () {
            if (videoFunctions.state.initiated) {
              promptScrollDownAnimation(0.3);
              promptScrollDownLoop();
            }
          };
        }

        video.addEventListener('mouseleave', videoFunctions.mouseleave, false);
        promptScrollDownLoop();
      }
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set([minions[0], minions[1], minions[3], minions[4]], {
      opacity: 1
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to([minions[0], minions[1], minions[3], minions[4]], 0.5, _objectSpread({
      scale: 3
    }, tweenOptimizations, {
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power1"].easeIn
    }));
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[0], 1.8, {
      bezier: {
        curviness: 1,
        values: [{
          x: -100,
          y: -30
        }, {
          x: -200,
          y: 0
        }, {
          x: -240,
          y: introBottom + 100
        }]
      },
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power2"].easeOut,
      delay: 0.15
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[1], 1.8, _objectSpread({
      bezier: {
        curviness: 1,
        values: [{
          x: -50,
          y: -70
        }, {
          x: -100,
          y: -50
        }, {
          x: -130,
          y: introBottom + 100
        }]
      }
    }, tweenOptimizations, {
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power2"].easeOut,
      delay: 0.15
    }));
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set(minions[2], _objectSpread({
      x: 0,
      y: introBottom + 100,
      scale: 3,
      opacity: 1
    }, tweenOptimizations));
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[3], 1.8, {
      bezier: {
        curviness: 1,
        values: [{
          x: 50,
          y: -60
        }, {
          x: 100,
          y: -40
        }, {
          x: 130,
          y: introBottom + 100
        }]
      },
      delay: 0.15,
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power2"].easeOut
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[4], 1.8, {
      bezier: {
        curviness: 1,
        values: [{
          x: 100,
          y: -10
        }, {
          x: 190,
          y: 10
        }, {
          x: 240,
          y: introBottom + 100
        }]
      },
      delay: 0.15,
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power2"].easeOut
    });
  };

  var learningAnim = function learningAnim(ratio) {
    if (!animsState['home-learning-experience'].launched) {
      animsState['home-learning-experience'].launched = true;

      if (promptScrollDownInterval) {
        clearInterval(promptScrollDownInterval);
      }

      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[2], 0.7, {
        x: 0,
        y: introBottom + 100,
        rotation: 0,
        ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(2),
        onComplete: function onComplete() {
          learningFirstPartDone = true;
        }
      });
    } else if (ratio > sectionsIntersectionRatio && learningFirstPartDone) {
      animsState['home-learning-experience'].bis = true;
      var secondSectionBottom = homeSections[1].offsetHeight + ww / 50;
      var planePathBezier = planePath ? _plugins_MorphSVGPlugin__WEBPACK_IMPORTED_MODULE_1__["MorphSVGPlugin"].pathDataToBezier(planePath) : '';
      var planeBottom = planePath.getBoundingClientRect().bottom - minions[0].getBoundingClientRect().bottom;

      if (promptScrollDownInterval) {
        clearInterval(promptScrollDownInterval);
      }

      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(planePath, 1.5, {
        drawSVG: '100%'
      });
      gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(plane, 1.5, {
        bezier: {
          values: planePathBezier,
          type: 'cubic',
          autoRotate: true,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Expo"].easeOut
        },
        onComplete: function onComplete() {
          gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[0], 1, {
            bezier: {
              curviness: 1,
              values: [{
                x: '+=60',
                y: "+=".concat(secondSectionBottom / 2)
              }, {
                x: '+=200',
                y: "+=".concat(planeBottom)
              }]
            },
            ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(1)
          });
          gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[1], 1.2, {
            bezier: {
              curviness: 1,
              values: [{
                y: "+=".concat(secondSectionBottom / 2)
              }, {
                x: '+=10',
                y: "+=".concat(secondSectionBottom - 60)
              }]
            },
            ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power4"].easeInOut
          });
          gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[2], 1.4, {
            rotation: 450,
            bezier: {
              curviness: 1,
              values: [{
                y: "+=".concat(secondSectionBottom / 2)
              }, {
                y: "+=".concat(secondSectionBottom - 40)
              }]
            },
            ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(1.1)
          });
          gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set(minions[3], {
            x: 153,
            y: introBottom + 123,
            transformOrigin: '100% 100%'
          });
          gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[3], 1.2, {
            bezier: {
              curviness: 1,
              values: [{
                x: '+=80',
                y: "+=".concat(secondSectionBottom / 2),
                rotation: 0
              }, {
                x: '+=20',
                y: "+=".concat(secondSectionBottom - 20),
                rotation: 30
              }, {
                x: '-=20',
                y: "+=".concat(secondSectionBottom - 18),
                rotation: 0
              }]
            },
            ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power1"].easeInOut
          });
          gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[4], 1.5, {
            bezier: {
              curviness: 1,
              values: [{
                x: '+=80',
                y: "+=".concat(secondSectionBottom / 2),
                rotation: -180
              }, {
                x: '-=20',
                y: "+=".concat(secondSectionBottom),
                rotation: -720
              }]
            },
            ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power4"].easeOut,
            onComplete: function onComplete() {
              animsState['home-learning-experience'].done = true;
            }
          });
        }
      });
    }
  };

  var offersAnim = function offersAnim() {
    if (newDrop) {
      newDrop.remove();
    }

    newDrop = minions[0].cloneNode(true);
    minions[0].parentElement.appendChild(newDrop);
    var duration = 0.5;
    var delay = 0.05;
    var dropBottom = minions[4].getBoundingClientRect().bottom - minions[0].getBoundingClientRect().bottom;
    animsState['home-offers'].launched = true;
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(newDrop, duration, {
      bezier: {
        curviness: 1,
        values: [{
          x: '-=160',
          y: "+=".concat(dropBottom / 2)
        }, {
          x: '-=200',
          y: "+=".concat(dropBottom)
        }]
      },
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(1),
      delay: delay
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[1], duration, {
      y: '+=60',
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power4"].easeInOut,
      delay: delay * 2
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[2], duration, {
      rotation: 360,
      y: '+=40',
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(1.5),
      delay: delay
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minions[3], duration, {
      y: '+=20',
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power1"].easeInOut
    });
  };

  var aboutAnim = function aboutAnim() {
    var minionsFourthSection = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["query"])({
      selector: '.shape',
      ctx: homeSections[3]
    });
    var fourthSectionBottom = homeSections[3].offsetHeight - 300;
    var duration = 0.8;
    var durationSmall = 0.25;
    var delay = 0.25;
    var delayFall = 0.07;
    animsState['home-about-us'].launched = true; // arrow  1

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[9], durationSmall, {
      scale: 1,
      opacity: 1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[9], duration, {
          y: fourthSectionBottom,
          rotation: -470,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Sine"].easeIn,
          delay: delayFall
        });
      }
    }); // triangle 1

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[3], durationSmall, {
      scale: 1,
      opacity: 1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[3], duration, {
          y: fourthSectionBottom,
          rotation: -90,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Sine"].easeIn,
          delay: delayFall
        });
      },
      delay: delay
    }); // drop

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[0], durationSmall, {
      scale: 1,
      opacity: 1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[0], duration, {
          y: fourthSectionBottom,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Power1"].easeIn,
          delay: delayFall
        });
      },
      delay: delay * 2
    }); // square 1

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[1], durationSmall, {
      scale: 1,
      opacity: 1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[1], duration, {
          y: fourthSectionBottom + 5,
          rotation: 45,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Sine"].easeIn,
          delay: delayFall
        });
      },
      delay: delay * 3
    }); // rectangle 1

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[7], durationSmall, {
      scale: 1,
      opacity: 1,
      scaleX: -1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[7], duration, {
          y: fourthSectionBottom,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Sine"].easeIn,
          delay: delayFall
        });
      },
      delay: delay * 4
    }); // triangle 2

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[5], durationSmall, {
      scale: 1,
      opacity: 1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[5], duration, {
          y: fourthSectionBottom,
          rotation: -90,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Sine"].easeIn,
          delay: delayFall
        });
      },
      delay: delay * 4.5
    }); // square 2

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[2], durationSmall, {
      scale: 1,
      opacity: 1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[2], duration, {
          y: fourthSectionBottom - 31,
          rotation: -7,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Sine"].easeIn,
          delay: delayFall
        });
      },
      delay: delay * 6.5
    }); // rectangle 2

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[8], durationSmall, {
      scale: 1,
      opacity: 1,
      scaleX: -1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[8], duration, {
          y: fourthSectionBottom - 75,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Sine"].easeIn,
          delay: delayFall
        });
      },
      delay: delay * 7.5
    }); // arrow  2

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[10], durationSmall, {
      scale: 1,
      opacity: 1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[10], duration, {
          y: fourthSectionBottom - 65,
          rotation: -860,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Sine"].easeIn,
          delay: delayFall
        });
      },
      delay: delay * 8
    }); // triangle 3

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[4], durationSmall, {
      scale: 1,
      opacity: 1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[4], duration, {
          y: fourthSectionBottom - 55,
          rotation: -135,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Sine"].easeIn,
          delay: delayFall
        });
      },
      delay: delay * 9
    }); // rectangle 3

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[6], durationSmall, {
      scale: 1,
      opacity: 1,
      scaleX: -1,
      ease: _global__WEBPACK_IMPORTED_MODULE_3__["easing"].easePop,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to(minionsFourthSection[6], duration, {
          y: fourthSectionBottom - 59,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Sine"].easeIn,
          delay: delayFall
        });
      },
      delay: delay * 10
    });
  };

  var experiencesAnim = function experiencesAnim() {
    if (!morpion) return;
    var minionsMorpion = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["query"])({
      selector: '.shape',
      ctx: morpion
    });
    var duration = 0.15;
    var delay = 0.5;
    var tl = new gsap__WEBPACK_IMPORTED_MODULE_0__["TimelineMax"]({
      delay: 0.8
    });
    animsState['home-experiences'].launched = true;
    morpion.classList.add('on');
    tl.to(minionsMorpion[1], duration, {
      scale: 1,
      opacity: 1,
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(0.5)
    }).to(minionsMorpion[0], duration, {
      scale: 1,
      opacity: 1,
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(0.5),
      delay: delay
    }).to(minionsMorpion[2], duration, {
      scale: 1,
      opacity: 1,
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(0.5),
      delay: delay
    }).to(minionsMorpion[4], duration, {
      scale: 1,
      opacity: 1,
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(0.5),
      delay: delay
    }).to(minionsMorpion[3], duration, {
      scale: 1,
      opacity: 1,
      ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(0.5),
      delay: delay,
      onComplete: function onComplete() {
        gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to([minionsMorpion[1], minionsMorpion[2], minionsMorpion[3]], duration, {
          rotation: 10,
          scale: 1.1,
          ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(0.5),
          delay: delay,
          onComplete: function onComplete() {
            gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to([minionsMorpion[1], minionsMorpion[2], minionsMorpion[3]], duration, {
              rotation: 0,
              scale: 1,
              ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Back"].easeInOut.config(2)
            });
          }
        });
      }
    });
  };

  var intersectionCallback = function intersectionCallback(entries) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_4__["forEach"])(entries, function (entry) {
      if (entry.intersectionRatio < sectionsIntersectionRatio) return;

      switch (entry.target.id) {
        case 'home-intro':
          if (!animsState[entry.target.id].launched) headerAnim();
          break;

        case 'home-learning-experience':
          if (!animsState[entry.target.id].bis && animsState['home-intro'].done) learningAnim(entry.intersectionRatio);
          break;

        case 'home-offers':
          if (!animsState[entry.target.id].launched && animsState['home-learning-experience'].done) offersAnim();
          break;

        case 'home-about-us':
          if (!animsState[entry.target.id].launched) aboutAnim();
          break;

        case 'home-experiences':
          if (!animsState[entry.target.id].launched) experiencesAnim();
          break;

        default:
          break;
      }
    });
  };

  var initAnims = function initAnims() {
    for (index; index <= samplesNumber; index += 1) {
      thresholdSamples[index] = index / samplesNumber;
    }

    observer = new IntersectionObserver(intersectionCallback, {
      root: null,
      rootMargin: '0px',
      threshold: thresholdSamples
    });
    Object(_utils__WEBPACK_IMPORTED_MODULE_4__["forEach"])(homeSections, function (section) {
      observer.observe(section);
      animsState[section.id] = {
        launched: false,
        done: false,
        bis: false
      };
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set(planePath, {
      drawSVG: 0
    });
  };

  var resetAnims = function resetAnims() {
    minions = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["query"])({
      selector: '.shape'
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set(minions, {
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0,
      rotation: 0
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set(minions[3], {
      transformOrigin: '50% 50%'
    });
    videoFunctions.state.initiated = false;

    if (videoFunctions.mouseover) {
      video.removeEventListener('mouseover', videoFunctions.mouseover);
    }

    if (videoFunctions.mouseleave) {
      video.removeEventListener('mouseover', videoFunctions.mouseleave);
    }

    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set(planePath, {
      drawSVG: 0
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].set(plane, {
      x: 0,
      y: 0,
      rotation: 0
    });
    Object(_utils__WEBPACK_IMPORTED_MODULE_4__["forEach"])(homeSections, function (section) {
      animsState[section.id] = {
        launched: false,
        done: false
      };
    });
  }; // launch anims if minions are visible (window width > 960)


  if (Object(_utils__WEBPACK_IMPORTED_MODULE_4__["isDisplayed"])(minions[0])) initAnims(); // Resize part

  _utils_Window__WEBPACK_IMPORTED_MODULE_5__["default"].addResizeEndFunction(function () {
    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_4__["isDisplayed"])(minions[0])) return; // If anims were launched restart them

    if (animsState.animsLaunched) resetAnims();
    wh = window.innerHeight;
    ww = window.innerWidth;
    videoBottom = wh / 2;
    initialShapeTop = minions[0].getBoundingClientRect().top;
    introBottom = homeSections[1].getBoundingClientRect().top - initialShapeTop - 70;
    playerCenterY = video.getBoundingClientRect().top - initialShapeTop + video.offsetHeight / 2;

    if (promptScrollDownInterval) {
      clearInterval(promptScrollDownInterval);
    } // If you're not in mobile or tablet but you started with a small screen and now have a bigger one let's launch anims


    if (!animsState.animsLaunched) initAnims();
  });
};

/* harmony default export */ __webpack_exports__["default"] = (minionsHandler);

/***/ })

}]);
//# sourceMappingURL=minions.js.map?398d5f5b5ab699c53adfd6841e7a64b4