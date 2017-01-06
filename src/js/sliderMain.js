var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var Cookies = require('./libs/js-cookie/src/js.cookie.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var CustomEase = require('./libs/gsap/src/uncompressed/easing/CustomEase.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var throttle = require('./throttle.js');
var getEltPosOnCover = require('./getEltPosOnCover');

module.exports = function(body, blocTop, themeColors){
    var blocRevel = $('#bloc-revelation');
    var slides = currentSlide = blocTop.find('.slide-on'), oldSlide;
    var currentTxt = blocRevel.find('.txt-on');
    var baseline = currentSlide.find('.baseline'), baselineSecond = currentSlide.find('.baseline-second');
    var imgW = blocTop.data('img-width'), imgH = blocTop.data('img-height'), imgRatio = imgH / imgW;
    var circle = currentSlide.find('.hoop');
    var newPosBaseline, newPosCircle, containerW = blocTop.width(), gutter = 20;
    var header = $('#header');
    var favicons = $('.favicon'), currentColor = body.data('theme');
    var nav = blocTop.find('#slider-home-nav'), svgHoop = $('#gradient-hoop');
    var slides = blocTop.find('.slide-home'), nbSlides = slides.length, slidesTxt = blocRevel.find('.slide-home-txt');
    var oldDirNb;
    // var ease = CustomEase.create('custom', 'M0,0,C0,0.5,0.005,0.73,0.11,0.85,0.22,0.975,0.505,1,1,1');
    var ease = CustomEase.create('custom', 'M0,0 C0,0 0.382,0 0.544,0.2 0.655,0.337 0.7,0.751 0.8,0.9 0.878,1.016 1,1 1,1');

    var tweenToOn = {x: '0%', opacity: 1, force3D: true, ease: ease};


    function setPosCircle(){
        newPosCircle = getEltPosOnCover(blocTop, imgRatio, imgW, imgH, circle);
        TweenMax.set(circle, {scale: newPosCircle[2], left: newPosCircle[0] + 'px', top: newPosCircle[1] + 'px', force3D: true});
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

    function setTheme(){
        nav.find('.current').html(currentSlide.index('.slide-home') + 1);

        body.removeClass('theme-'+currentColor).addClass('theme-'+currentSlide.data('color')).data('theme', currentSlide.data('color'));
        svgHoop.find('[data-theme-main]').attr('stop-color', themeColors[currentSlide.data('color')][0]);
        svgHoop.find('[data-theme-second]').attr('stop-color', themeColors[currentSlide.data('color')][1]);

        // Favicons url
        favicons.each(function(){
            this.href = this.href.replace(currentColor, body.data('theme'));
        });
    }

    function animSlide(oldDir, newDir){
        TweenMax.to(oldSlide, 1, {x: 100*oldDir + '%', force3D: true, ease: ease});

        TweenMax.fromTo(currentSlide, 1, {x: 100*newDir + '%'}, {x: '0%', force3D: true, ease: ease});
        TweenMax.fromTo(circle, 1.25, {x: newDir*containerW/3+'px', opacity: 0}, {x: '0px', opacity: 0.85, force3D: true, ease: ease});
        TweenMax.fromTo([baseline.find('> span'), baselineSecond.find('> span')], 1.55, {x: newDir*40 + '%', opacity: 0}, tweenToOn);
        TweenMax.fromTo(currentSlide.find('.slider-plans'), 1.1, {x: newDir*50 + '%', opacity: 0}, tweenToOn);

        setTheme();
    }

    function slide(nextSlide, nextTxt, lastSlideIndex, dir){
        nextSlide.length ? nextSlide.addClass('slide-on') : slides.eq(lastSlideIndex).addClass('slide-on');
        currentSlide.removeClass('slide-on');

        nextTxt.length ? nextTxt.addClass('txt-on') : slidesTxt.eq(lastSlideIndex).addClass('txt-on');
        currentTxt.removeClass('txt-on');

        oldSlide = currentSlide;
        currentTxt = blocRevel.find('.txt-on');
        currentSlide = blocTop.find('.slide-on');
        currentColor = body.data('theme');

        oldDirNb = dir === 'next' ? 1 : -1;

        TweenMax.to(circle, 0.4, {x: oldDirNb*150 + 'px', opacity: 0, force3D: true, ease: Power2.easeIn});
        TweenMax.to([baseline.find('> span'), baselineSecond.find('> span')], 0.4, {x: oldDirNb*150 + 'px', opacity: 0, force3D: true, ease: Power2.easeIn});
        TweenMax.to(oldSlide.find('.slider-plans'), 0.4, {x: oldDirNb*150 + 'px', opacity: 0, force3D: true, ease: Power2.easeIn, onComplete: function(){
            baseline = currentSlide.find('.baseline');
            baselineSecond = currentSlide.find('.baseline-second');
            circle = currentSlide.find('.icon');

            setPosBaseline();
            setPosCircle();
            dir === 'next' ? animSlide(1, -1) : animSlide(-1, 1);

            Cookies.set('think-decli', currentSlide.index('.slide-home'));
        }});
    }

    function setSlider(){
        TweenMax.set(slides, {x: '-100%', opacity: 1, force3D: true});

        TweenMax.set(currentSlide, {x: '0%', force3D: true});
        TweenMax.set(circle, {x: '0px', opacity: 0.85, force3D: true});
        TweenMax.set([baseline.find('> span'), baselineSecond.find('> span')], {x: '0px', opacity: 1, force3D: true});
        TweenMax.set(currentSlide.find('.slider-plans'), {x: '0px', opacity: 1, force3D: true});

        setTheme();
    }

    nav.on('click', '.prev', function(e){
        e.preventDefault();
        slide(currentSlide.prev('.slide-home'), currentTxt.prev('.slide-home-txt'), nbSlides-1, 'prev');
    }).on('click', '.next', function(e){
        e.preventDefault();
        slide(currentSlide.next('.slide-home'), currentTxt.next('.slide-home-txt'), 0, 'next');
    });

    $(window).on('load', function(){
        blocTop.addClass('loaded');

        setPosBaseline();
        setPosCircle();
        setSlider();
    });

    $(window).on('resize', throttle(function(){
        containerW = blocTop.width();

        requestAnimFrame(setPosBaseline);
        requestAnimFrame(setPosCircle);
    }, 60));
}
