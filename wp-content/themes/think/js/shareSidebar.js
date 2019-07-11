(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shareSidebar"],{

/***/ "./wp-content/themes/think/src/js/components/shareSidebar.js":
/*!*******************************************************************!*\
  !*** ./wp-content/themes/think/src/js/components/shareSidebar.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var collant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! collant */ "./node_modules/collant/dist/index.js");
/* harmony import */ var collant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(collant__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./wp-content/themes/think/src/js/utils/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var shareSidebarHandler = function shareSidebarHandler() {
  var _query = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["query"])({
    selector: '#article'
  }),
      _query2 = _slicedToArray(_query, 1),
      article = _query2[0];

  if (!article) return;
  imagesloaded__WEBPACK_IMPORTED_MODULE_1___default()(article, function () {
    collant__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById('share'), 35, {
      minimumWidth: 1100
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (shareSidebarHandler);

/***/ })

}]);
//# sourceMappingURL=shareSidebar.js.map?f864a08cdeb0d0b6672e1c5552b0b9f8