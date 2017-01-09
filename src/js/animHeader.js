var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var throttle = require('./throttle.js');

module.exports = function(){
    var windowWidth = $(window).outerWidth(), windowHeight = $(window).height(), docHeight = $(document).height();
    var myScroll = $(document).scrollTop(), scrollPercent, scrollProgress;
    var header = $('#header');
    var logo = $('#logo'), logoO = logo.find('#logo-o'), logoO1 = logo.find('#logo-o1');

    function showScrollIndic(){
        header.addClass('on');
        if(!logo.hasClass('on')){
            logo.addClass('on');
            if(windowWidth > 580){
                TweenMax.to(logoO, 0.3, {opacity: 1});
                TweenMax.set(logoO1, {opacity: 0});
            }
        }
    }
    function hideScrollIndic(){
        header.removeClass('on');
        if(logo.hasClass('on')){
            logo.removeClass('on');
            if(windowWidth > 580){
                TweenMax.to(logoO, 0.3, {opacity: 0});
                TweenMax.set(logoO1, {opacity: 1});
            }
        }
    }

    function scrollHandler(){
        myScroll = $(document).scrollTop();
        scrollPercent = (myScroll-10) / (docHeight-windowHeight);
        scrollProgress = scrollPercent*227.7;

        if(myScroll > 10){
            showScrollIndic();
            if(windowWidth > 580){
                TweenMax.set(logoO, {x: scrollProgress + 'px', force3D: true});
            }
        }else{
            hideScrollIndic();
        }
    }

    function resizeHandler(){
        windowWidth = $(window).outerWidth();
        windowHeight = $(window).height();
        docHeight = $(document).height();
    }

    header.on('mouseenter', hideScrollIndic).on('mouseleave', function(){
        if(myScroll > 10){
            showScrollIndic();
        }
    });

    $(document).on('scroll', throttle(function(){
        requestAnimFrame(scrollHandler);
    }, 10));


    $(window).on('resize', throttle(function(){
        requestAnimFrame(resizeHandler);
    }, 60));
}
