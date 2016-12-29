'use strict';

var $ = require('./libs/jquery/dist/jquery.slim.min.js');
// var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

$(function(){

    // window.requestAnimFrame = require('./requestAnimFrame.js');
    // var throttle = require('./throttle.js');
    var animHoops = require('./animHoops.js');

    var animHeader = require('./animHeader.js');
    var animBtn = require('./animBtn.js');

    var animMainSlider = require('./sliderMain.js');

    var initVideo = require('./initVideo.js');
    var animSlider = require('./slider.js');

    // var windowWidth = $(window).outerWidth(), windowHeight = $(window).height(), docHeight = $(document).height();
    // var myScroll = $(document).scrollTop();

    var body = $('body');

    var themeColors = {
        'yellow': [ 'rgb(255, 228, 0)', 'rgb(43, 240, 117)' ],
        'orange': [ 'rgb(255, 120, 0)', 'rgb(255, 228, 0)' ],
        'red':    [ 'rgb(255, 6, 0)', 'rgb(255, 120, 0)' ],
        'pink':   [ 'rgb(240, 43, 140)', 'rgb(255, 6, 0)' ],
        'blue':   [ 'rgb(2, 187, 255)', 'rgb(138, 126, 224)' ],
        'green':  [ 'rgb(43, 240, 117)', 'rgb(2, 187, 255)' ]
    };

    var searchInput = $('#search'), formContact = $('#form-contact');


    // isMobile.any ? body.addClass('is-mobile') : body.addClass('is-desktop');

    function checkEmptyInput(input){
        if(input.attr('type') === 'radio') return;
        input.val() !== '' ? input.addClass('on') : input.removeClass('on');
    }


    // Anim header on scroll + scroll indicator
    animHeader();

    // Anim gradient in btn and in menu links
    animBtn(body);

    // Form inputs
    if(formContact.length){
        formContact.on('input propertychange', 'input, textarea', function(){
            checkEmptyInput($(this));
        }).find('input, textarea').each(function(){
            checkEmptyInput($(this));
        });
    }
    if((body.hasClass('archive') || body.hasClass('search')) && searchInput.length){
        searchInput.on('input propertychange', function(){
            checkEmptyInput($(this));
        });
        checkEmptyInput(searchInput);
    }

    // Slider home
    if($('#bloc-top').length){
        animMainSlider(body, $('#bloc-top'), themeColors);
    }


    $(window).on('load', function(){
        // Sliders drag
        if($('.wrapper-sliders').length){
            animSlider();
        }

        // Load videos
        if($('.wrapper-video').length){
            initVideo();
        }

        // Anim hoops
        if(body.hasClass('home')){
            animHoops($('#more-than-moocs').find('.hoop'), 200, true);
        }
        if(body.hasClass('page-template-about')){
            animHoops($('#main').find('.hoop'), 300, false);
        }
    });

    // $(document).on('scroll', throttle(function(){

    // }, 10));

    // $(window).on('resize', throttle(function(){

    // }, 60));

});
