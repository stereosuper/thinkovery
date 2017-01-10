var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');


module.exports = function(){
    var animationElts = $('.animateOnScroll'), elt, eltContent;
    var windowHeight, windowTopPosition, windowBottomPosition;
    var eltToAnimate, eltHeight, eltTopPosition, eltBottomPosition;
    var launchGapIn = 100, launchGapOut = 250;

    function checkIfInView(){
        if(!animationElts.length) return;

        windowHeight = $(window).height();
        windowTop = $(window).scrollTop();
        windowBottom = windowTop + windowHeight;

        animationElts.each(function(i){
            elt = $(this);
            eltTopPosition = elt.data('check-top');
            eltBottomPosition = elt.data('check-bottom');
            if((eltBottomPosition - launchGapOut >= windowTop) && (eltTopPosition + launchGapIn <= windowBottom)){
                elt.removeClass('above-view').removeClass('under-view').addClass('in-view');
            }else if(eltBottomPosition - launchGapOut < windowTop){
                elt.addClass('above-view').removeClass('under-view').removeClass('in-view');
            }else{
                elt.removeClass('above-view').addClass('under-view').removeClass('in-view');
            }
        });
    }

    function setDataElts(){
        if(!animationElts.length) return;

        animationElts.each(function(){
            elt = $(this);
            eltHeight = elt.outerHeight();
            eltTop = elt.offset().top;
            eltBottom = eltTop + eltHeight;
            elt.data({'check-height': eltHeight, 'check-top': eltTop, 'check-bottom': eltBottom});
        });
    }

    setDataElts();
    checkIfInView();

    $(document).on('scroll', throttle(function(){
        requestAnimFrame(checkIfInView);
    }, 10));

    $(window).on('resize', throttle(function(){
        windowHeight = $(window).height();

        requestAnimFrame(setDataElts);
        requestAnimFrame(checkIfInView);
    }, 40));
}
