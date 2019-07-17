(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["search"],{

/***/ "./wp-content/themes/think/src/js/components/search.js":
/*!*************************************************************!*\
  !*** ./wp-content/themes/think/src/js/components/search.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./wp-content/themes/think/src/js/utils/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var searchHandler = function searchHandler() {
  var _query = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["query"])({
    selector: '#searchform'
  }),
      _query2 = _slicedToArray(_query, 1),
      form = _query2[0];

  var _query3 = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["query"])({
    selector: '#blog-nav'
  }),
      _query4 = _slicedToArray(_query3, 1),
      blogNav = _query4[0];

  if (!form || !blogNav) return;

  var _query5 = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["query"])({
    selector: 'input',
    ctx: form
  }),
      _query6 = _slicedToArray(_query5, 1),
      input = _query6[0];

  form.addEventListener('submit', function (e) {
    if (!form.classList.contains('on')) {
      e.preventDefault();

      var _query7 = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["query"])({
        selector: 'input',
        ctx: form
      }),
          _query8 = _slicedToArray(_query7, 1),
          inputToFocus = _query8[0];

      form.classList.add('on');
      inputToFocus.focus();
      blogNav.classList.add('off');
    }
  });
  input.addEventListener('blur', function (e) {
    if (e.relatedTarget !== form.getElementById('#search')) {
      form.classList.remove('on');
      blogNav.classList.remove('off');
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (searchHandler);

/***/ })

}]);
//# sourceMappingURL=search.js.map?8ac36f03b7971839283fc15f71e80b94