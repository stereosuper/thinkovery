(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{145:function(t,e,o){"use strict";o.r(e);var n=o(340),i=o.n(n),s=o(341),r=o.n(s),a=o(2);function c(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var o=[],n=!0,i=!1,s=void 0;try{for(var r,a=t[Symbol.iterator]();!(n=(r=a.next()).done)&&(o.push(r.value),!e||o.length!==e);n=!0);}catch(t){i=!0,s=t}finally{try{n||null==a.return||a.return()}finally{if(i)throw s}}return o}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}e.default=function(){var t=c(Object(a.d)({selector:"#article"}),1)[0];t&&r()(t,function(){i()(document.getElementById("share"),35,{minimumWidth:1100})})}},340:function(t,e,o){"undefined"!=typeof self&&self,t.exports=function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";var n=o(1),i=o(2);t.exports=function(t,e){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=o.unit,r=void 0===s?"px":s,a=o.updateHeightOnScroll,c=void 0!==a&&a,l=o.wrapper,u=void 0===l||l,d=o.minimumWidth,h=void 0!==d&&d,p=o.bottom,f=void 0!==p&&p;if(void 0!==t&&null!=t){var m=void 0,g=void 0,v=void 0,y=void 0,w=void 0,E=window.innerHeight,b=window.innerWidth,x=window.pageYOffset||document.documentElement.scrollTop,L=void 0,k=function(){E=window.innerHeight,b=window.innerWidth,"vh"===r?(g=t.offsetHeight,m=E/(100/e)-g/2):m=e},I=function(){x=window.pageYOffset||document.documentElement.scrollTop,c&&t.classList.contains("collant")&&(t.dataset.height=t.offsetHeight),f?(x+E>=parseFloat(t.dataset.offsetBottom,10)+m?(t.classList.remove("collant"),t.style.bottom=parseFloat(t.dataset.initialPos,10)+"px"):(t.classList.add("collant"),t.style.bottom=m+"px"),h&&y&&(t.classList.remove("collant","collant-stuck"),t.style.top="",t.style.bottom=parseFloat(t.dataset.initialPos,10)+"px")):(v="auto"===t.dataset.initialPos?0:parseFloat(t.dataset.initialPos,10),x>=parseFloat(t.dataset.offsetTop,10)-m+v?(t.classList.add("collant"),t.style.top=m+"px",x+m+parseFloat(t.dataset.height,10)>=parseFloat(t.dataset.offsetBottom,10)?(t.classList.remove("collant"),t.classList.add("collant-stuck"),t.style.top="auto",t.style.bottom="0"):(t.classList.add("collant"),t.classList.remove("collant-stuck"),t.style.top=m+"px",t.style.bottom="")):(t.classList.remove("collant"),t.style.top=parseFloat(t.dataset.initialPos,10)+"px"),h&&y&&(t.classList.remove("collant","collant-stuck"),t.style.top=parseFloat(t.dataset.initialPos,10)+"px",t.style.bottom=""))},A=function(){w=L.getBoundingClientRect(),y=h&&b<=h,t.dataset.offsetTop=u?w.top+x:0,t.dataset.offsetBottom=w.top+x+L.offsetHeight,t.dataset.height=t.offsetHeight},j=function(){k(),A(),I()};L=t.dataset.collant?document.querySelector('.wrapper-collant[data-collant="'+t.dataset.collant+'"]'):document.querySelector(".wrapper-collant"),A(),t.dataset.initialPos=f?getComputedStyle(t).bottom:getComputedStyle(t).top,k(),I(),document.addEventListener("scroll",n(function(){i(I)},10),!1),window.addEventListener("resize",n(function(){i(j)},10))}}},function(t,e,o){"use strict";t.exports=function(t,e){var o,n;return function(){var i=this,s=+new Date,r=arguments;o&&s<o+e?(clearTimeout(n),n=setTimeout(function(){o=s,t.apply(i,r)},e)):(o=s,t.apply(i,r))}}},function(t,e,o){"use strict";t.exports=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}])},341:function(t,e,o){var n,i;
/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!function(s,r){"use strict";n=[o(342)],void 0===(i=function(t){return function(t,e){var o=t.jQuery,n=t.console;function i(t,e){for(var o in e)t[o]=e[o];return t}var s=Array.prototype.slice;function r(t,e,a){if(!(this instanceof r))return new r(t,e,a);var c=t;"string"==typeof t&&(c=document.querySelectorAll(t)),c?(this.elements=function(t){if(Array.isArray(t))return t;if("object"==typeof t&&"number"==typeof t.length)return s.call(t);return[t]}(c),this.options=i({},this.options),"function"==typeof e?a=e:i(this.options,e),a&&this.on("always",a),this.getImages(),o&&(this.jqDeferred=new o.Deferred),setTimeout(this.check.bind(this))):n.error("Bad element for imagesLoaded "+(c||t))}r.prototype=Object.create(e.prototype),r.prototype.options={},r.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},r.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),!0===this.options.background&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&a[e]){for(var o=t.querySelectorAll("img"),n=0;n<o.length;n++){var i=o[n];this.addImage(i)}if("string"==typeof this.options.background){var s=t.querySelectorAll(this.options.background);for(n=0;n<s.length;n++){var r=s[n];this.addElementBackgroundImages(r)}}}};var a={1:!0,9:!0,11:!0};function c(t){this.img=t}function l(t,e){this.url=t,this.element=e,this.img=new Image}return r.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var o=/url\((['"])?(.*?)\1\)/gi,n=o.exec(e.backgroundImage);null!==n;){var i=n&&n[2];i&&this.addBackground(i,t),n=o.exec(e.backgroundImage)}},r.prototype.addImage=function(t){var e=new c(t);this.images.push(e)},r.prototype.addBackground=function(t,e){var o=new l(t,e);this.images.push(o)},r.prototype.check=function(){var t=this;function e(e,o,n){setTimeout(function(){t.progress(e,o,n)})}this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?this.images.forEach(function(t){t.once("progress",e),t.check()}):this.complete()},r.prototype.progress=function(t,e,o){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&n&&n.log("progress: "+o,t,e)},r.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},c.prototype=Object.create(e.prototype),c.prototype.check=function(){this.getIsImageComplete()?this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.src)},c.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},c.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},c.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},c.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},c.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},c.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},l.prototype=Object.create(c.prototype),l.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},l.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},l.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},r.makeJQueryPlugin=function(e){(e=e||t.jQuery)&&((o=e).fn.imagesLoaded=function(t,e){return new r(this,t,e).jqDeferred.promise(o(this))})},r.makeJQueryPlugin(),r}(s,t)}.apply(e,n))||(t.exports=i)}("undefined"!=typeof window?window:this)},342:function(t,e,o){var n,i;"undefined"!=typeof window&&window,void 0===(i="function"==typeof(n=function(){"use strict";function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var o=this._events=this._events||{},n=o[t]=o[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var o=this._onceEvents=this._onceEvents||{};return(o[t]=o[t]||{})[e]=!0,this}},e.off=function(t,e){var o=this._events&&this._events[t];if(o&&o.length){var n=o.indexOf(e);return-1!=n&&o.splice(n,1),this}},e.emitEvent=function(t,e){var o=this._events&&this._events[t];if(o&&o.length){o=o.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],i=0;i<o.length;i++){var s=o[i];n&&n[s]&&(this.off(t,s),delete n[s]),s.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t})?n.call(e,o,e,t):n)||(t.exports=i)}}]);