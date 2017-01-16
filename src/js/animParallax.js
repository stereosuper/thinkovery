var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');


module.exports = function(){
    var elts = $('.hasParallax');
    var elt, eltHeight, eltTop, eltBottom, newY;
    var docHeight = $(document).height(), windowWidth = $(window).outerWidth(), windowHeight = $(window).height(), windowTop, windowBottom;
    var gapBottom = 0, gapBottom = 0;
    var smallWindowWidth;

    function checkIfInView(){
        if(!elts.length) return;

        windowTop = $(window).scrollTop();
        windowBottom = windowTop + windowHeight;
        if(windowWidth > 780){
            smallWindowWidth = false;
            elts.each(function(i){
                elt = $(this);
                eltTop = elt.data('check-top');
                eltBottom = elt.data('check-bottom');
                dataStrength = elt.data('parallax-strength');
                newY = Math.round(windowTop/dataStrength);
                if(eltBottom - gapBottom >= windowTop && eltTop + gapBottom <= windowBottom){
                    TweenMax.set(elt, {y: newY + 'px', force3D: true});
                }
            });
        }else if(windowWidth <= 780 && !smallWindowWidth){
            smallWindowWidth = true;
            elts.each(function(i){
                elt = $(this);
                TweenMax.set(elt, {y: '0px', force3D: true});
            });
        }
    }

    function setDataElts(){
        if(!elts.length) return;

        elts.each(function(){
            elt = $(this);
            eltHeight = elt.outerHeight();
            eltTop = elt.offset().top;
            eltBottom = eltTop + eltHeight;
            elt.data({'check-top': eltTop, 'check-bottom': eltBottom});
        });
    }

    if(windowWidth > 780){
        smallWindowWidth = false;
    }else{
        smallWindowWidth = true;
    }
    setDataElts();
    checkIfInView();

    $(document).on('scroll', throttle(function(){
        requestAnimFrame(checkIfInView);
    }, 10));

    $(window).on('resize', throttle(function(){
        windowWidth = $(window).outerWidth();
        windowHeight = $(window).height();
        docHeight = $(document).height();

        requestAnimFrame(setDataElts);
        requestAnimFrame(checkIfInView);
    }, 40));
}
