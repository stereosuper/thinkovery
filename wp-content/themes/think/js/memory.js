(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["memory"],{

/***/ "./wp-content/themes/think/src/js/components/memory.js":
/*!*************************************************************!*\
  !*** ./wp-content/themes/think/src/js/components/memory.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./wp-content/themes/think/src/js/utils/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var memoryHandler = function memoryHandler() {
  var _query = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["query"])({
    selector: '#memory'
  }),
      _query2 = _slicedToArray(_query, 1),
      memory = _query2[0];

  if (!memory) return;

  var _query3 = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["query"])({
    selector: '#memory-success'
  }),
      _query4 = _slicedToArray(_query3, 1),
      successElement = _query4[0];

  var shapes = ['rectangle', 'rectangle', 'triangle', 'triangle', 'square', 'square', 'drop', 'drop', 'circle', 'circle'];
  var cards = null;
  var cardsArray = [];
  var active = null;
  var state = {
    clicked: false,
    done: false
  };

  var createCard = function createCard(shape) {
    var card = document.createElement('div');
    var front = document.createElement('div');
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    card.setAttribute('class', 'card');
    card.setAttribute('data-shape', shape);
    front.setAttribute('class', 'front');
    svg.setAttribute('class', 'icon');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', "#icon-".concat(shape));
    svg.appendChild(use);
    front.appendChild(svg);
    card.appendChild(front);
    memory.appendChild(card);
  };

  shapes.sort(function () {
    return 0.5 - Math.random();
  });
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["forEach"])(shapes, function (shape) {
    createCard(shape);
  });
  cards = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["query"])({
    selector: '.card',
    ctx: memory
  });
  cardsArray = _toConsumableArray(cards);
  var randomCardIndex = Math.floor(Math.random() * cards.length * 0.5);
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["forEach"])(cards, function (card, index) {
    if (index === randomCardIndex) {
      card.classList.add('blink');
    }

    card.addEventListener('click', function () {
      if (memory.classList.contains('off')) return;

      if (!state.clicked) {
        state.clicked = true;
        memory.classList.add('clicked');
      }

      var _query5 = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["query"])({
        selector: '.on',
        ctx: memory
      });

      var _query6 = _slicedToArray(_query5, 1);

      active = _query6[0];

      if (active) {
        active.classList.add('first');
        active.classList.remove('on');
        card.classList.add('on');

        if (card.getAttribute('data-shape') === active.getAttribute('data-shape')) {
          card.classList.add('done');
          card.classList.remove('on');
          active.classList.add('done');
          active.classList.remove('first');
          state.done = cardsArray.every(function (el) {
            return el.classList.contains('done');
          });

          if (state.done) {
            successElement.classList.add('on');
          }
        } else {
          memory.classList.add('off');
          setTimeout(function () {
            card.classList.remove('on');
            active.classList.remove('first');
            memory.classList.remove('off');
          }, 1000);
        }
      } else {
        card.classList.add('on');
      }
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (memoryHandler);

/***/ })

}]);
//# sourceMappingURL=memory.js.map?4c3632a3fdbd9954de805c1f03fc0188