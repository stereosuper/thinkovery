var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var throttle = require('./throttle.js');

module.exports = function(blocTop){
    var currentSlide = blocTop.find('.slide-on');
    var baseline = currentSlide.find('.baseline'), baselineSecond = currentSlide.find('.baseline-second');
    var ratioScale, imgW = 1260, imgH = 760, imgRatio = imgH / imgW;
    var finalW, finalH;
    var newX, newY, posX, posY;
    var containerH, containerW, containerRatio;
    var gutter = 20;
    var header = $('#header');
    var nav = blocTop.find('#slider-home-nav');
    var slides = blocTop.find('.slide-home'), nbSlides = slides.length;

    function setPosBaseline(){
        containerH = blocTop.height();
        containerW = blocTop.width();
        containerRatio = containerH / containerW;

        posX = baseline.data('x');
        posY = baseline.data('y')

        // portrait
        if(containerRatio > imgRatio){
            finalH = containerH;
            finalW = (imgW*finalH)/imgH;
            newX = ((finalW*posX) / imgW) - (finalW - containerW)/2;
            newY = ((finalH*posY) / imgH);
        // paysage
        }else{
            finalW = containerW;
            finalH = (imgH*finalW)/imgW;
            newX = ((finalW*posX) / imgW);
            newY = ((finalH*posY) / imgH) - (finalH - containerH)/2;
        }

        ratioScale = finalH / imgH;

        TweenMax.set(baseline, {scale: ratioScale, left: newX + 'px', top: newY + 'px', onComplete: function(){
            if(newX < gutter || newX + baseline.width() + gutter*2 > containerW || newY < header.height()){
                baseline.addClass('off');
                baselineSecond.addClass('on');
            }else{
                baseline.removeClass('off');
                baselineSecond.removeClass('on');
            }
        }});
    }

    function animSlide(){
        baseline.addClass('bs-on');
        baselineSecond.addClass('bs-on');

        nav.find('.current').html(currentSlide.index('.slide-home') + 1);
    }

    function changeSlide(){
        currentSlide.removeClass('slide-on');
        baseline.removeClass('bs-on');
        baselineSecond.removeClass('bs-on');

        currentSlide = blocTop.find('.slide-on');
        baseline = currentSlide.find('.baseline');
        baselineSecond = currentSlide.find('.baseline-second');

        setPosBaseline();
        animSlide();
    }

    function slideNext(){
        if(currentSlide.next('.slide-home').length){
            currentSlide.next('.slide-home').addClass('slide-on');
        }else{
            slides.eq(0).addClass('slide-on');
        }

        changeSlide();
    }

    function slidePrev(){
        if(currentSlide.prev('.slide-home').length){
            currentSlide.prev('.slide-home').addClass('slide-on');
        }else{
            slides.eq(nbSlides - 1).addClass('slide-on');
        }

        changeSlide();
    }

    nav.on('click', '.prev', function(e){
        e.preventDefault();
        slidePrev();
    }).on('click', '.next', function(e){
        e.preventDefault();
        slideNext();
    });

    $(window).on('load', function(){
        setPosBaseline();
        animSlide();
    });

    $(window).on('resize', throttle(function(){
        requestAnimFrame(setPosBaseline);
    }, 60));
}
