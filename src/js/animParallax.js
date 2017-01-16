var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');


module.exports = function(){
    var elts = $('.hasParallax');
    var elt, eltHeight, eltTop, eltBottom, newY;
    var windowWidth = $(window).outerWidth(), windowHeight = $(window).height(), windowTop, windowBottom;
    var gapBottom = 0, gapBottom = 0;

    function checkIfInView(){
        if(windowWidth <= 780) return;

        windowTop = $(window).scrollTop();
        windowBottom = windowTop + windowHeight;

        elts.each(function(i){
            elt = $(this);
            eltTop = elt.data('check-top');
            eltBottom = elt.data('check-bottom');
            dataStrength = elt.data('parallax-strength');
            newY = windowTop/dataStrength | 0;
            if(eltBottom - gapBottom >= windowTop && eltTop + gapBottom <= windowBottom){
                TweenMax.set(elt, {y: newY + 'px', force3D: true});
            }
        });
    }

    function setDataElts(){
        if(windowWidth <= 780) return;

        elts.each(function(){
            elt = $(this);
            eltHeight = elt.outerHeight();
            eltTop = elt.offset().top;
            eltBottom = eltTop + eltHeight;
            elt.data({'check-top': eltTop, 'check-bottom': eltBottom});
        });
    }

    setDataElts();
    checkIfInView();

    $(document).on('scroll', throttle(function(){
        requestAnimFrame(checkIfInView);
    }, 10));

    $(window).on('resize', throttle(function(){
        windowWidth = $(window).outerWidth();
        windowHeight = $(window).height();

        requestAnimFrame(setDataElts);
        requestAnimFrame(checkIfInView);
    }, 40));
}
