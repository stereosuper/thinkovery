var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var Cookies = require('./libs/js-cookie/src/js.cookie.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var CustomEase = require('./libs/gsap/src/uncompressed/plugins/CustomEase.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var throttle = require('./throttle.js');
var getEltPosOnCover = require('./getEltPosOnCover');

module.exports = function(body, blocTop, themeColors){
    var blocRevel = $('#bloc-revelation');
    var currentSlide = blocTop.find('.slide-on');
    var currentTxt = blocRevel.find('.txt-on');
    var baseline = currentSlide.find('.baseline'), baselineSecond = currentSlide.find('.baseline-second');
    var imgW = blocTop.data('img-width'), imgH = blocTop.data('img-height'), imgRatio = imgH / imgW;
    var newPosBaseline, containerW, gutter = 20;
    var header = $('#header');
    var nav = blocTop.find('#slider-home-nav'), svgHoop = $('#gradient-hoop');
    var slides = blocTop.find('.slide-home'), nbSlides = slides.length, slidesTxt = blocRevel.find('.slide-home-txt');
    var ease = CustomEase.create('custom', 'M0,0,C0,0.5,0.005,0.73,0.11,0.85,0.22,0.975,0.505,1,1,1');

    var tweenToOn = {x: '0px', opacity: 1, force3D: true, ease: ease}, tweenToOff = {x: '500px', opacity: 0, force3D: true, ease: Power2.easeIn};

    function setPosBaseline(){
        newPosBaseline = getEltPosOnCover(blocTop, imgRatio, imgW, imgH, baseline);
        containerW = blocTop.width();

        TweenMax.set(baseline, {scale: newPosBaseline[2], left: newPosBaseline[0] + 'px', top: newPosBaseline[1] + 'px', force3D: true, onComplete: function(){
            if(newPosBaseline[0] < gutter || newPosBaseline[0] + baseline.width() + gutter*2 > containerW || newPosBaseline[1] < header.height()){
                baseline.addClass('off');
                baselineSecond.addClass('on');
            }else{
                baseline.removeClass('off');
                baselineSecond.removeClass('on');
            }
        }});
    }

    function animSlide(){
        TweenMax.fromTo(baseline.find('> .icon'), 6, {x: 700-containerW+'px', opacity: 0}, {x: '0px', opacity: 0.85, force3D: true, ease: ease});
        TweenMax.fromTo([baseline.find('> span'), baselineSecond.find('> span')], 4, {x: 200-containerW+'px', opacity: 0}, tweenToOn);
        TweenMax.fromTo(currentSlide.find('.slider-plans'), 4, {x: 200-containerW+'px', opacity: 0}, tweenToOn);

        nav.find('.current').html(currentSlide.index('.slide-home') + 1);

        body.removeClass('theme-'+body.data('theme')).addClass('theme-'+currentSlide.data('color')).data('theme', currentSlide.data('color')).dequeue();
        svgHoop.find('[data-theme-main]').attr('stop-color', themeColors[currentSlide.data('color')][0]);
        svgHoop.find('[data-theme-second]').attr('stop-color', themeColors[currentSlide.data('color')][1]);
    }

    function slide(nextSlide, nextTxt, lastSlideIndex){
        nextSlide.length ? nextSlide.addClass('slide-on') : slides.eq(lastSlideIndex).addClass('slide-on');
        currentSlide.removeClass('slide-on');

        nextTxt.length ? nextTxt.addClass('txt-on') : slidesTxt.eq(lastSlideIndex).addClass('txt-on');
        currentTxt.removeClass('txt-on');
        currentTxt = blocRevel.find('.txt-on');

        TweenMax.fromTo(baseline.find('> .icon'), 0.5, {x: '0px'}, tweenToOff);
        TweenMax.fromTo([baseline.find('> span'), baselineSecond.find('> span')], 0.5, {x: '0px'}, tweenToOff);
        TweenMax.fromTo(currentSlide.find('.slider-plans'), 0.5, {x: '0px'}, {x: '500px', opacity: 0, force3D: true, ease: Power2.easeIn, onComplete: function(){
            currentSlide = blocTop.find('.slide-on');
            baseline = currentSlide.find('.baseline');
            baselineSecond = currentSlide.find('.baseline-second');

            setPosBaseline();
            animSlide();

            Cookies.set('think-decli', currentSlide.index('.slide-home'));
        }});
    }

    nav.on('click', '.prev', function(e){
        e.preventDefault();
        slide(currentSlide.prev('.slide-home'), currentTxt.prev('.slide-home-txt'), nbSlides - 1);
    }).on('click', '.next', function(e){
        e.preventDefault();
        slide(currentSlide.next('.slide-home'), currentTxt.next('.slide-home-txt'), 0);
    });

    $(window).on('load', function(){
        blocTop.addClass('loaded');

        setPosBaseline();
        animSlide();
    });

    $(window).on('resize', throttle(function(){
        requestAnimFrame(setPosBaseline);
    }, 60));
}
