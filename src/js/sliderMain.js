var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var Cookies = require('./libs/js-cookie/src/js.cookie.js');
// var unveil = require('./libs/unveil.js');

var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var CustomEase = require('./libs/gsap/src/uncompressed/easing/CustomEase.js');

var Hammer = require('hammerjs');

window.requestAnimFrame = require('./requestAnimFrame.js');
var throttle = require('./throttle.js');
var getEltPosOnCover = require('./getEltPosOnCover');

module.exports = function(body, blocTop, themeColors){
    var blocRevel = $('#bloc-revelation');
    var slides = currentSlide = blocTop.find('.slide-on'), oldSlide;
    var currentTxt = blocRevel.find('.txt-on');
    var baseline = currentSlide.find('.baseline'), baselineSecond = currentSlide.find('.baseline-second');
    var plans = currentSlide.find('.slider-plans'), newPosPlan;
    var imgW = blocTop.data('img-width'), imgH = blocTop.data('img-height'), imgRatio = imgH / imgW;
    var circle = currentSlide.find('.hoop');
    var newPosBaseline, newPosCircle, containerW = blocTop.width(), gutter = 20;
    var header = $('#header');
    var favicons = $('.favicon'), currentColor = body.data('theme');
    var nav = blocTop.find('#slider-home-nav'), svgHoop = $('#gradient-hoop');
    var slides = blocTop.find('.slide-home'), nbSlides = slides.length, slidesTxt = blocRevel.find('.slide-home-txt');
    var oldDirNb, timeOut, scrollTop, sliding = false;
    var ease = CustomEase.create('custom', 'M0,0 C0,0 0.358,-0.02 0.52,0.18 0.631,0.317 0.65,0.713 0.75,0.862 0.828,0.978 1,1 1,1');
    var hammertime = new Hammer($('#bloc-top').get(0));


    function setPosCircle(){
        newPosCircle = getEltPosOnCover(blocTop, imgRatio, imgW, imgH, circle);
        TweenMax.set(circle, {scale: newPosCircle[2], left: newPosCircle[0] + 'px', top: newPosCircle[1] + 'px', force3D: true});
    }

    function setPosPlans(){
        plans.each(function(){
            newPosPlan = getEltPosOnCover(blocTop, imgRatio, imgW, imgH, $(this));
            TweenMax.set($(this), {scale: newPosPlan[2], left: newPosPlan[0] + 'px', top: newPosPlan[1] + 'px', force3D: true});
        });
    }

    function setPosBaseline(){
        newPosBaseline = getEltPosOnCover(blocTop, imgRatio, imgW, imgH, baseline);

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

    function setSliderTimeout(){
        clearTimeout(timeOut);

        timeOut = setTimeout(function(){
            slide(currentSlide.next('.slide-home'), currentTxt.next('.slide-home-txt'), 0, 'next');
        }, 8000);
    }

    function setTheme(){
        nav.find('.current').html(currentSlide.index('.slide-home') + 1);

        body.removeClass('theme-'+currentColor).addClass('theme-'+currentSlide.data('color')).data('theme', currentSlide.data('color'));
        svgHoop.find('[data-theme-main]').attr('stop-color', themeColors[currentSlide.data('color')][0]);
        svgHoop.find('[data-theme-second]').attr('stop-color', themeColors[currentSlide.data('color')][1]);

        // Favicons url
        favicons.each(function(){
            this.href = this.href.replace(currentColor, currentSlide.data('color'));
        });
    }

    function animSlide(oldDir, newDir){
        if(currentSlide.find('.slide-home-mb').is(':visible')){
            TweenMax.to(oldSlide, 1, {x: 100*oldDir + '%', delay: 0.3, force3D: true, ease: ease, onComplete: setTheme});
            TweenMax.fromTo(currentSlide, 1, {x: 100*newDir + '%'}, {x: '0%', delay: 0.3, force3D: true, ease: ease, onComplete: function(){
                sliding = false;
                TweenMax.to(blocRevel.find('.slide-anim-txt').eq(0), 0.7, {y: '0px', opacity: 1, ease: Power2.easeIn});
                TweenMax.to(blocRevel.find('.slide-anim-txt').eq(1), 0.7, {y: '0px', opacity: 1, delay: 0.1, ease: Power2.easeIn});
            }});
        }else{
            TweenMax.to(oldSlide, 1, {x: 100*oldDir + '%', delay: 0.3, force3D: true, ease: ease});
            TweenMax.fromTo(currentSlide, 1, {x: 100*newDir + '%'}, {x: '0%', delay: 0.3, force3D: true, ease: ease});
            TweenMax.fromTo(circle, 1.8, {x: newDir*containerW/4+'px'}, {x: '0px', delay: 0.3, force3D: true, ease: Power2.easeOut});
            TweenMax.fromTo(plans, 2.3, {x: newDir*containerW/4+'px'}, {x: '0px', delay: 0.3, force3D: true, ease: Power2.easeOut});
            TweenMax.fromTo([baseline.find('> span').eq(0), baselineSecond.find('> span')], 2.6, {x: newDir*containerW/4+'px'}, {x: '0px', delay: 0.3, force3D: true, ease: Power2.easeOut, onComplete: function(){
                sliding = false;
            }});
            TweenMax.fromTo(baseline.find('> span').eq(1), 2.5, {x: newDir*containerW/4+'px'}, {x: '0px', delay: 0.3, force3D: true, ease: Power2.easeOut});
            TweenMax.to(blocRevel.find('.slide-anim-txt').eq(0), 1.5, {y: '0px', opacity: 1, delay: 1.05, ease: Power2.easeOut});
            TweenMax.to(blocRevel.find('.slide-anim-txt').eq(1), 1.5, {y: '0px', opacity: 1, delay: 1.15, ease: Power2.easeOut});
        }
    }

    function slide(nextSlide, nextTxt, lastSlideIndex, dir){
        sliding = true;

        nextSlide.length ? nextSlide.addClass('slide-on') : slides.eq(lastSlideIndex).addClass('slide-on');
        currentSlide.removeClass('slide-on');

        oldSlide = currentSlide;
        currentSlide = blocTop.find('.slide-on');
        currentColor = body.data('theme');
        baseline = currentSlide.find('.baseline');
        baselineSecond = currentSlide.find('.baseline-second');
        circle = currentSlide.find('.hoop');
        plans = currentSlide.find('.slider-plans');

        oldDirNb = dir === 'next' ? -1 : 1;

        TweenMax.to(blocRevel.find('.slide-anim-txt').eq(1), .6, {y: '20px', opacity: 0, delay: 0.1, ease: Power2.easeIn});
        TweenMax.to(blocRevel.find('.slide-anim-txt').eq(0), .6, {y: '20px', opacity: 0, delay: 0.2, ease: Power2.easeIn, onComplete: function(){
            nextTxt.length ? nextTxt.addClass('txt-on') : slidesTxt.eq(lastSlideIndex).addClass('txt-on');
            currentTxt.removeClass('txt-on');
            currentTxt = blocRevel.find('.txt-on');
        }});

        if(!oldSlide.find('.slide-home-mb').is(':visible')){
            TweenMax.to([
                    oldSlide.find('.hoop'),
                    oldSlide.find('.baseline').find('> span'),
                    oldSlide.find('.baseline-second').find('> span'),
                    oldSlide.find('.slider-plans')
                ],
                .95, {x: oldDirNb*300 + 'px', force3D: true, ease: Power2.easeIn, onComplete: setTheme}
            );
        }

        setPosBaseline();
        setPosCircle();
        setPosPlans();

        dir === 'next' ? animSlide(-1, 1) : animSlide(1, -1);
        setSliderTimeout();

        Cookies.set('think-decli', currentSlide.index('.slide-home'), { expires: 7, path: '/' });
    }

    function checkIfInView(){
        scrollTop = $(document).scrollTop();
        scrollTop > 50 ? clearTimeout(timeOut) : setSliderTimeout();
    }

    function setSlider(){
        setPosBaseline();
        setPosCircle();
        setPosPlans();

        TweenMax.set(slides, {x: '100%', force3D: true});
        TweenMax.set(currentSlide, {x: '0%', force3D: true});
        TweenMax.to(currentSlide, 1, {opacity: 1, onComplete: function(){
            TweenMax.set(slides, {opacity: 1});
        }});
        TweenMax.to(blocRevel.find('.container'), 0.7, {opacity: 1, delay: 0.5});
        TweenMax.to(nav, 0.5, {opacity: 1});

        setTheme();
        checkIfInView();
    }


    nav.on('click', '.prev', function(e){
        e.preventDefault();

        if(!sliding){
            clearTimeout(timeOut);
            slide(currentSlide.prev('.slide-home'), currentTxt.prev('.slide-home-txt'), nbSlides-1, 'prev');
        }
    }).on('click', '.next', function(e){
        e.preventDefault();

        if(!sliding){
            clearTimeout(timeOut);
            slide(currentSlide.next('.slide-home'), currentTxt.next('.slide-home-txt'), 0, 'next');
        }
    });

    $(document).on('keydown', function(e){
        if(!sliding){
            clearTimeout(timeOut);
            if(e.keyCode === 39){
                slide(currentSlide.next('.slide-home'), currentTxt.next('.slide-home-txt'), 0, 'next');
            }else if(e.keyCode === 37){
                slide(currentSlide.prev('.slide-home'), currentTxt.prev('.slide-home-txt'), nbSlides-1, 'prev');
            }
        }
    });

    hammertime.on('swipeleft', function(){
        if(!sliding){
            slide(currentSlide.next('.slide-home'), currentTxt.next('.slide-home-txt'), 0, 'next');
        }
    }).on('swiperight', function(){
       if(!sliding){
            slide(currentSlide.prev('.slide-home'), currentTxt.prev('.slide-home-txt'), nbSlides-1, 'prev');
       }
    });


    setSlider();

    $(window).on('resize', throttle(function(){

        containerW = blocTop.width();

        requestAnimFrame(setPosBaseline);
        requestAnimFrame(setPosCircle);
        requestAnimFrame(setPosPlans);

    }, 60)).on('focusout', function(){

        clearTimeout(timeOut);

    }).on('focusin', checkIfInView);

    $(document).on('scroll', throttle(function(){
        requestAnimFrame(checkIfInView);
    }, 40));
}
