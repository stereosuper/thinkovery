'use strict';

var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

$(function(){

    window.requestAnimFrame = require('./requestAnimFrame.js');
    var throttle = require('./throttle.js');

    var windowWidth = $(window).outerWidth(), windowHeight = $(window).height(), docHeight = $(document).height();
    var myScroll, scrollPercent, scrollProgress;

    var body = $('body');
    var logo = $('#logo'), logoO = logo.find('#logo-o'), logoO1 = logo.find('#logo-o1');



    // isMobile.any ? body.addClass('is-mobile') : body.addClass('is-desktop');


    $(window).on('resize', throttle(function(){

        windowWidth = $(window).outerWidth();
        windowHeight = $(window).height();
        docHeight = $(document).height();

	}, 60)).on('load', function(){

	});


    $(document).on('scroll', throttle(function(){

        myScroll = $(document).scrollTop();
        scrollPercent = (myScroll-10) / (docHeight-windowHeight);
        scrollProgress = scrollPercent*353;

        if(myScroll > 10){
            if(!logo.hasClass('on')){
                logo.addClass('on');
                TweenMax.to(logoO, 0.3, {opacity: 1});
                TweenMax.set(logoO1, {opacity: 0});
            }
            TweenMax.set(logoO, {x: scrollProgress + 'px'});
        }else{
            if(logo.hasClass('on')){
                logo.removeClass('on');
                TweenMax.to(logoO, 0.3, {opacity: 0});
                TweenMax.set(logoO1, {opacity: 1});
            }
        }

    }, 10));

});
