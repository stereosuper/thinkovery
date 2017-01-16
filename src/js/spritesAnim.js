var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var CustomEase = require('./libs/gsap/src/uncompressed/easing/CustomEase.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(){
    var visuSprites = $('.svgAnim'), sprite,
        spritesTl = [],
        numRows = 21, frameHeight = 200, frameWidth = 200, j,
        heightVisu,
        steppedEase = new SteppedEase(0);

    var animationElts = $('.svgAnim'), elt, eltContent;
    var windowHeight, windowTopPosition, windowBottomPosition;
    var eltToAnimate, eltHeight, eltTopPosition, eltBottomPosition;
    var launchGapIn = 100, launchGapOut = 100;

    function animateSprites(){
        heightVisu = visuSprites.outerHeight();
        visuSprites.each(function(i){
            sprite = $(this);
            if(typeof spritesTl[i] !== 'undefined'){
                spritesTl[i].kill();
            }
            spritesTl[i] = new TimelineMax({paused: true});
            j = 0;
            for(j; j<numRows; j++){
               // spritesTl[i].add(TweenMax.fromTo(sprite, 0.15, {backgroundPosition: '0 -'+(frameHeight*j)+'px'}, {backgroundPosition: '-'+(frameWidth*(numCols-1))+'px -'+(frameHeight*j)+'px', ease: steppedEase}));
               // spritesTl[i].add(TweenMax.fromTo(sprite, 0.15, {backgroundPosition: '0% '+(10*j)+'%'}, {backgroundPosition: '0% '+(10*j)+'%', ease: steppedEase}));
               spritesTl[i].add(TweenMax.fromTo(sprite, 0.08, {backgroundPosition: '0 -'+(heightVisu*j)+'px'}, {backgroundPosition: '0 -'+(heightVisu*j)+'px', ease: steppedEase}));
            }
        });
    }

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
                spritesTl[i].play();
                console.log($(this).parents('li'));
                $(this).parents('li').addClass('active');
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

    animateSprites();
    setDataElts();
    checkIfInView();

    $(document).on('scroll', throttle(function(){
        requestAnimFrame(checkIfInView);
    }, 10));

    $(window).on('resize', throttle(function(){
        windowHeight = $(window).height();

        requestAnimFrame(animateSprites);
        requestAnimFrame(setDataElts);
        requestAnimFrame(checkIfInView);
    }, 40));
}

