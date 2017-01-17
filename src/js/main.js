'use strict';

var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var Cookies = require('./libs/js-cookie/src/js.cookie.js');
var parallax = require('./libs/parallax.min.js');

var isMobile = require('./libs/isMobile.min.js');


$(function(){

    var body = $('body');

    var animHeader = require('./animHeader.js');
    var animBtn = require('./animBtn.js');


    function checkEmptyInput(input){
        if(input.attr('type') === 'radio') return;
        input.val() !== '' ? input.addClass('on') : input.removeClass('on');
    }


    isMobile.any ? body.addClass('is-mobile') : body.addClass('is-desktop');


    // Anim header on scroll + scroll indicator
    animHeader();

    // Anim gradient in btn and in menu links
    if(!isMobile.any){
        animBtn(body);
    }

    // Form inputs
    if($('form').length){
        $('form').on('input propertychange', 'input, textarea', function(){
            checkEmptyInput($(this));
        }).find('input, textarea').each(function(){
            checkEmptyInput($(this));
        });

        $('#form-contact').on('submit', function(e){
            // ga('send', 'pageview', '/contact-send');
            // _gaq.push(['_trackEvent', 'button', 'click', 'Contact']);
            ga('send', 'event', 'button', 'click', 'Contact');
        });
    }

    // Cookie for cookie consentment
    body.on('click', '#cookie-ok', function(e){
        e.preventDefault();
        Cookies.set('think-cookies', true, { expires: 30, path: '/' });
        $('#header').removeClass('cookie-on').find('.cookie').addClass('off');
    });

});


$(window).on('load', function(){
    var body = $('body');
    var parallax;

    var themeColors = {
        'blue':   [ 'rgb(2, 187, 255)', 'rgb(138, 126, 224)' ],
        'green':  [ 'rgb(43, 240, 117)', 'rgb(2, 187, 255)' ],
        'yellow': [ 'rgb(255, 228, 0)', 'rgb(43, 240, 117)' ],
        'orange': [ 'rgb(255, 120, 0)', 'rgb(255, 228, 0)' ],
        'red':    [ 'rgb(255, 6, 0)', 'rgb(255, 120, 0)' ],
        'pink':   [ 'rgb(240, 43, 140)', 'rgb(255, 6, 0)' ]
    };

    var animMainSlider = require('./sliderMain.js');
    var initVideo = require('./initVideo.js');
    var animSlider = require('./slider.js');
    var animHoops = require('./animHoops.js');
    var setPosCircle = require('./setPosCircle.js');
    var animOnScroll = require('./animOnScroll.js');
    var animParallax = require('./animParallax.js');
    var spritesAnim = require('./spritesAnim.js');
    var newsletter = require('./newsletter.js');

    // Slider home
    if($('#bloc-top').length){
        animMainSlider(body, $('#bloc-top'), themeColors);
    }

    // Load videos
    if($('.wrapper-video').length){
        initVideo();
    }

    // Parallaxe
    if($('#more-than-moocs').length){
        parallax = new Parallax($('#more-than-moocs').get(0));
    }
    if(body.hasClass('page-template-contact')){
        parallax = new Parallax($('#main').get(0));
    }

    // Sliders drag
    if($('.wrapper-sliders').length){
        animSlider();
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

    // Parallax
    if($('.hasParallax').length){
        animParallax();
    }

    // Sprites SVG
    if($('.svgAnim').length){
        spritesAnim();
    }

    // Newsletter
    if($('#btnNewsletter').length){
        newsletter();
    }
});
