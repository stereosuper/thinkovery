(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["contactSidebar"],{

/***/ "./node_modules/collant/dist/index.js":
/*!********************************************!*\
  !*** ./node_modules/collant/dist/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}("undefined"!=typeof self?self:this,function(){return function(t){var e={};function o(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";var n=o(1),a=o(2);t.exports=function(t,e){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=o.unit,s=void 0===i?"px":i,l=o.updateHeightOnScroll,r=void 0!==l&&l,c=o.wrapper,d=void 0===c||c,u=o.minimumWidth,p=void 0!==u&&u,f=o.bottom,m=void 0!==f&&f;if(void 0!==t&&null!=t){var w=void 0,v=void 0,y=void 0,h=void 0,x=void 0,g=window.innerHeight,b=window.innerWidth,F=window.pageYOffset||document.documentElement.scrollTop,L=void 0,P=function(){g=window.innerHeight,b=window.innerWidth,"vh"===s?(v=t.offsetHeight,w=g/(100/e)-v/2):w=e},q=function(){F=window.pageYOffset||document.documentElement.scrollTop,r&&t.classList.contains("collant")&&(t.dataset.height=t.offsetHeight),m?(F+g>=parseFloat(t.dataset.offsetBottom,10)+w?(t.classList.remove("collant"),t.style.bottom=parseFloat(t.dataset.initialPos,10)+"px"):(t.classList.add("collant"),t.style.bottom=w+"px"),p&&h&&(t.classList.remove("collant","collant-stuck"),t.style.top="",t.style.bottom=parseFloat(t.dataset.initialPos,10)+"px")):(y="auto"===t.dataset.initialPos?0:parseFloat(t.dataset.initialPos,10),F>=parseFloat(t.dataset.offsetTop,10)-w+y?(t.classList.add("collant"),t.style.top=w+"px",F+w+parseFloat(t.dataset.height,10)>=parseFloat(t.dataset.offsetBottom,10)?(t.classList.remove("collant"),t.classList.add("collant-stuck"),t.style.top="auto",t.style.bottom="0"):(t.classList.add("collant"),t.classList.remove("collant-stuck"),t.style.top=w+"px",t.style.bottom="")):(t.classList.remove("collant"),t.style.top=parseFloat(t.dataset.initialPos,10)+"px"),p&&h&&(t.classList.remove("collant","collant-stuck"),t.style.top=parseFloat(t.dataset.initialPos,10)+"px",t.style.bottom=""))},H=function(){x=L.getBoundingClientRect(),h=p&&b<=p,t.dataset.offsetTop=d?x.top+F:0,t.dataset.offsetBottom=x.top+F+L.offsetHeight,t.dataset.height=t.offsetHeight},T=function(){P(),H(),q()};L=t.dataset.collant?document.querySelector('.wrapper-collant[data-collant="'+t.dataset.collant+'"]'):document.querySelector(".wrapper-collant"),H(),t.dataset.initialPos=m?getComputedStyle(t).bottom:getComputedStyle(t).top,P(),q(),document.addEventListener("scroll",n(function(){a(q)},10),!1),window.addEventListener("resize",n(function(){a(T)},10))}}},function(t,e,o){"use strict";t.exports=function(t,e){var o,n;return function(){var a=this,i=+new Date,s=arguments;o&&i<o+e?(clearTimeout(n),n=setTimeout(function(){o=i,t.apply(a,s)},e)):(o=i,t.apply(a,s))}}},function(t,e,o){"use strict";t.exports=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}])});

/***/ }),

/***/ "./wp-content/themes/think/src/js/components/contactSidebar.js":
/*!*********************************************************************!*\
  !*** ./wp-content/themes/think/src/js/components/contactSidebar.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var collant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! collant */ "./node_modules/collant/dist/index.js");
/* harmony import */ var collant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(collant__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./wp-content/themes/think/src/js/utils/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var contactSidebarHandler = function contactSidebarHandler() {
  var _query = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["query"])({
    selector: '.js-contact-sidebar'
  }),
      _query2 = _slicedToArray(_query, 1),
      contactSidebar = _query2[0];

  if (!contactSidebar) return;
  var halfWindow = window.innerHeight / 2;
  var halfSidebar = contactSidebar.getBoundingClientRect().height / 2;
  var offsetSidebar = halfWindow - halfSidebar;
  collant__WEBPACK_IMPORTED_MODULE_0___default()(contactSidebar, offsetSidebar, {
    minimumWidth: 960
  });
};

/* harmony default export */ __webpack_exports__["default"] = (contactSidebarHandler);

/***/ })

}]);
//# sourceMappingURL=contactSidebar.js.map?05ebec6d50bb90207e82a5e355235ed1