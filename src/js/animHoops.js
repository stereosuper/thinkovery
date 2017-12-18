var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');


module.exports = function(elts, distance){
    var elt, eltHeight, eltTop, eltBottom, newY;
    var docHeight = $(document).height(), windowHeight = $(window).height(), windowTop, windowBottom;
    var gapBottom = 0;

    function checkIfInView(){
        if(!elts.length) return;

        windowTop = $(window).scrollTop();
        windowBottom = windowTop + windowHeight;

        elts.each(function(i){
            elt = $(this);
            // eltHeight = elt.data('check-height');
            eltTop = elt.data('check-top');
            eltBottom = elt.data('check-bottom');
            newY = windowTop*distance/(docHeight-windowHeight) - distance/2;
            // if(diffSpeed){
            //     newY = newY*(i+2)/2;
            // }
            // console.log(i)
            // console.log(newY)
            if(eltBottom - gapBottom >= windowTop && eltTop + gapBottom <= windowBottom){
                //elt.removeClass('above-view under-view').addClass('in-view');
                TweenMax.set(elt, {y: newY + 'px', force3D: true});
            }/*else if(eltBottom - gapBottom < windowTop){
                elt.removeClass('under-view in-view').addClass('above-view');
            }else{
                elt.removeClass('above-view in-view').addClass('under-view');
            }*/
        });
    }

    function setDataElts(){
        if(!elts.length) return;

        elts.each(function(){
            elt = $(this);
            eltHeight = elt.outerHeight();
            eltTop = elt.offset().top;
            eltBottom = eltTop + eltHeight;
            elt.data({/*'check-height': eltHeight, */'check-top': eltTop, 'check-bottom': eltBottom});
        });
    }

    setDataElts();
    checkIfInView();

    if(elts.length){
        TweenMax.set(elts, {opacity: 0.8});
    }

    $(document).on('scroll', throttle(function(){
        requestAnimFrame(checkIfInView);
    }, 10));

    $(window).on('resize', throttle(function(){
        windowHeight = $(window).height();
        docHeight = $(document).height();

        requestAnimFrame(setDataElts);
        requestAnimFrame(checkIfInView);
    }, 40));
}
