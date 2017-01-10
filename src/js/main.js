'use strict';

var $ = require('./libs/jquery/dist/jquery.slim.min.js');
// var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var isMobile = require('./libs/isMobile.min.js');
var parallax = require('./libs/parallax.min.js');

$(function(){

    // window.requestAnimFrame = require('./requestAnimFrame.js');
    // var throttle = require('./throttle.js');

    var animHeader = require('./animHeader.js');
    var animBtn = require('./animBtn.js');

    var animMainSlider = require('./sliderMain.js');


    // var windowWidth = $(window).outerWidth(), windowHeight = $(window).height(), docHeight = $(document).height();
    // var myScroll = $(document).scrollTop();

    var body = $('body');

    var themeColors = {
        'blue':   [ 'rgb(2, 187, 255)', 'rgb(138, 126, 224)' ],
        'green':  [ 'rgb(43, 240, 117)', 'rgb(2, 187, 255)' ],
        'yellow': [ 'rgb(255, 228, 0)', 'rgb(43, 240, 117)' ],
        'orange': [ 'rgb(255, 120, 0)', 'rgb(255, 228, 0)' ],
        'red':    [ 'rgb(255, 6, 0)', 'rgb(255, 120, 0)' ],
        'pink':   [ 'rgb(240, 43, 140)', 'rgb(255, 6, 0)' ]
    };

    var parallax;


    function checkEmptyInput(input){
        if(input.attr('type') === 'radio') return;
        input.val() !== '' ? input.addClass('on') : input.removeClass('on');
    }


    isMobile.any ? body.addClass('is-mobile') : body.addClass('is-desktop');


    // Anim header on scroll + scroll indicator
    animHeader();

    // Anim gradient in btn and in menu links
    animBtn(body);

    // Form inputs
    if($('form').length){
        $('form').on('input propertychange', 'input, textarea', function(){
            checkEmptyInput($(this));
        }).find('input, textarea').each(function(){
            checkEmptyInput($(this));
        });

        $('#form-contact').on('submit', function(e){
            ga('send', 'event', {
                eventCategory: 'Form',
                eventAction: 'submit',
                eventLabel: window.location.host + '/contact-send'
            });
        });
    }

    // Slider home
    if($('#bloc-top').length){
        animMainSlider(body, $('#bloc-top'), themeColors);
    }

    if($('#more-than-moocs').length){
        parallax = new Parallax($('#more-than-moocs').get(0));
    }
    if(body.hasClass('page-template-contact')){
        parallax = new Parallax($('#main').get(0));
    }

    // $(document).on('scroll', throttle(function(){

    // }, 10));

    // $(window).on('resize', throttle(function(){

    // }, 60));

});


$(window).on('load', function(){
    var body = $('body');

    var initVideo = require('./initVideo.js');
    var animSlider = require('./slider.js');
    var animHoops = require('./animHoops.js');
    var setPosCircle = require('./setPosCircle.js');
    var animOnScroll = require('./animOnScroll.js');


    // Sliders drag
    if($('.wrapper-sliders').length){
        animSlider();
    }

    // Load videos
    if($('.wrapper-video').length){
        initVideo();
    }

    // Anim hoops
    if(body.hasClass('page-template-about')){
        animHoops($('#main').find('.hoop'), 300);
    }

    if(body.hasClass('page-template-solutions')){
        setPosCircle($('#solutions-header'));
    }

    // Anim on scroll
    if($('.animateOnScroll').length){
        animOnScroll();
    }
});
