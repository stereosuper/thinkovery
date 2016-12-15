'use strict';

var $ = require('./libs/jquery/dist/jquery.slim.min.js');
// var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

$(function(){

    // window.requestAnimFrame = require('./requestAnimFrame.js');
    // var throttle = require('./throttle.js');

    var animHeader = require('./animHeader.js');
    var animBtn = require('./animBtn.js');

    var animSlider = require('./slider.js');

    var animMainSlider = require('./sliderMain.js');

    // var windowWidth = $(window).outerWidth(), windowHeight = $(window).height(), docHeight = $(document).height();
    // var myScroll = $(document).scrollTop();

    var body = $('body');


    // isMobile.any ? body.addClass('is-mobile') : body.addClass('is-desktop');


    // Anim header on scroll + scroll indicator
    animHeader();

    // Anim gradient in btn and in menu links
    animBtn(body);

    if($('.wrapper-sliders').length){
        animSlider();
    }

    // Slider home
    if($('#bloc-top').length){
        animMainSlider($('#bloc-top'));
    }


    // $(document).on('scroll', throttle(function(){

    // }, 10));

    // $(window).on('resize', throttle(function(){

    // }, 60));

});
