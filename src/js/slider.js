var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var Draggable = require('./libs/gsap/src/uncompressed/utils/Draggable.js');
var ThrowPropsPlugin = require('./libs/gsap/src/uncompressed/plugins/ThrowPropsPlugin.js');
var throttle = require('./throttle.js');
var isMobile = require('./libs/isMobile.min.js');

module.exports = function(){
    var containerSliders = $('.container-sliders');
    var i, j, newX, centerSlider, centerSlide, originalSlider, gapLeft;
    var sliderTarget, originalSliderTarget, widthSliderTarget, centerSliderTarget, slidesTarget, widthSlidesTarget, nbSlidesTarget, isEven;
    var sliderCloned, sliderClonedTarget;
    var errorMargin, maxMargin, minMargin, halfSlide;
    var DraggableElems = [];
    var nativeTouchScrollingVar = false;
    var firstInit = true;
    var tlAutoScroll = [], parentSlider, indexSliderToDesactivate, timeOutAutoScroll = [];
    var totalWithSlider, rotationValue;

    var windowWidth = $(window).outerWidth(), smallWindowWidth = false;

    function actualizeSlider(sliderToActualize, sliderThis, hasGSAPObject){
        sliderTarget = sliderToActualize;
        sliderClonedTarget = sliderTarget.find('.slides.cloned');
        originalSliderTarget = sliderTarget.find('.slides:not(.cloned)');
        slidesTarget = originalSliderTarget.find('> li');
        widthSlidesTarget = slidesTarget.outerWidth();
        nbSlidesTarget = slidesTarget.length;
        widthSliderTarget = nbSlidesTarget*widthSlidesTarget;

        isEven = nbSlidesTarget % 2 === 0 ? true : false;
        newX = hasGSAPObject ? sliderThis.x : sliderTarget.get(0)._gsTransform.x;
        gapLeft = nbSlidesTarget % 2 === 0 ? widthSlidesTarget/2 : 0;

        // if(newX > 0){
        if(newX > gapLeft){
            // Going left
            TweenMax.set(sliderClonedTarget, {x: -widthSliderTarget+'px', force3D: true});
            if((!isEven && (newX > widthSliderTarget)) || (isEven && (newX > (widthSliderTarget-widthSlidesTarget)))){
                newX -= widthSliderTarget;
            }
        }else{
            // Going right
            TweenMax.set(sliderClonedTarget, {x: widthSliderTarget+'px', force3D: true});
            if((!isEven && (newX < -widthSliderTarget)) || (isEven && (newX < (-widthSliderTarget+widthSlidesTarget/2)))){
                newX += widthSliderTarget;
            }
        }
        if(newX !== this.x){
            TweenMax.set(sliderTarget, {x: newX, force3D: true, overwrite: false});
            if(hasGSAPObject){
                sliderThis.x = newX;
            }
        }

        // Rotate svg
        totalWithSlider = nbSlidesTarget*widthSlidesTarget;
        rotationValue = (newX*360)/totalWithSlider;
        TweenMax.set(sliderTarget.parents('.container-sliders').find('.hoop'), {rotation: rotationValue, force3D: true, overwrite: false});
    }

    function autoScroll(slidersInit, slideWidthInit, indexSliderInit, tlScroll){
        activateCenteredSlide(slidersInit);

        timeOutAutoScroll[indexSliderInit] = setTimeout(function(){
            tlScroll.set(slidersInit.find('.slides > li'), {className: '-=active'});
            tlScroll.to(slidersInit, 1, {x: '-='+slideWidthInit, force3D: true, ease: Power3.easeInOut, onUpdate: actualizeSlider, onUpdateParams: [slidersInit, false, false], onComplete: autoScroll, onCompleteParams: [slidersInit, slideWidthInit, indexSliderInit, tlScroll]});
        }, 5000);
    }

    function clearSliders(){
        $('.slides.cloned').remove();
        $('.slides > li.active').removeClass('active');
        TweenMax.set([$('.slider'), $('.container-sliders .hoop')], {clearProps: 'transform'});
    }

    function desactivateSlide(){
        actualizeSlider($(this.target), this, true);
        $(this.target).find('.slides > li').removeClass('active');

        parentSlider = $(this.target).parents('.container-sliders');
        indexSliderToDesactivate = parentSlider.index('.container-sliders');
        tlAutoScroll[indexSliderToDesactivate].kill();
        clearTimeout(timeOutAutoScroll[indexSliderToDesactivate]);
    }

    function activateSlide(){
        actualizeSlider($(this.target), this, true);
        activateCenteredSlide($(this.target));
    }

    function activateCenteredSlide(sliderTarget){
        // activate the centered slide
        centerSliderTarget = sliderTarget.parents('.container-sliders').width()/2;
        slidesTarget = sliderTarget.find('.slides > li');
        errorMargin = slidesTarget.outerWidth()/4;
        maxMargin = centerSliderTarget+errorMargin;
        minMargin = centerSliderTarget-errorMargin;
        halfSlide = slidesTarget.outerWidth()/2;

        slidesTarget.each(function(){
            centerSlide = Math.floor($(this).offset().left + halfSlide);
            if(centerSlide >= minMargin && centerSlide <= maxMargin){
                $(this).addClass('active');
            }
        });
    }

    function activateSlideInitial(containerS, slidesS, slidesWidthS){
        centerSlider = containerS.outerWidth()/2;
        errorMargin = slidesS.outerWidth()/2;
        maxMargin = centerSlider+errorMargin;
        minMargin = centerSlider-errorMargin;

        slidesS.each(function(){
            centerSlide = Math.floor($(this).offset().left + slidesWidthS/2);
            // if(centerSlide === centerSlider){
            //     $(this).addClass('active');
            // }
            if(centerSlide >= minMargin && centerSlide <= maxMargin){
                $(this).addClass('active');
            }
        });
    }

    function updateSlider(){
        actualizeSlider($(this.target), this, true);
    }

    function initSlider(container, indexSlider){
        var wrapperSliders = container.find('.wrapper-sliders');
        var sliders = container.find('.slider'), slider = container.find('.slides');
        var slides = slider.find('> li'), nbSlides = slides.length;
        var slideWidth = slides.outerWidth(), slideHeight = slides.outerHeight(), halfSlides = nbSlides/2;
        var halfRight, halfLeft, widthSlider = nbSlides*slideWidth, middleSlider = widthSlider/2 - slideWidth/2;

        if(nbSlides % 2 === 0){
            halfRight = halfSlides;
            halfLeft = halfSlides;
        }else{
            halfRight = Math.ceil(halfSlides);
            halfLeft = nbSlides - halfRight;
        }

        // Duplicate list
        slider.clone().addClass('cloned').appendTo(sliders);
        slider = container.find('.slides');
        slides = slider.find('> li');
        sliderCloned = container.find('.slides.cloned');
        originalSlider = container.find('.slides:not(.cloned)');

        // Rearrange list
        leftSlidesStart = middleSlider - halfLeft*slideWidth;
        TweenMax.set([slider, wrapperSliders], {width: widthSlider+'px'});
        slider.each(function(){
            for(i = 0; i<halfRight; i++){
                TweenMax.set($(this).find('>li').eq(i), {left: middleSlider+i*slideWidth+'px'});
            }
            for(j = 0; j<halfLeft; j++){
                TweenMax.set($(this).find('>li').eq(halfRight+j), {left: leftSlidesStart+j*slideWidth+'px'});
            }
        });
        TweenMax.set(sliderCloned, {x: widthSlider+'px', force3D: true});
        TweenMax.set(slider, {marginLeft: -widthSlider/2+'px'});
        TweenMax.set(container, {opacity: 1});

        activateSlideInitial(container, slides, slideWidth);

        // Draggable
        if(isMobile.any){
            nativeTouchScrollingVar = true;
        }
        DraggableElems[indexSlider] = Draggable.create(sliders, {
            type: 'x',
            trigger: wrapperSliders,
            zIndexBoost: false,
            dragClickables: true,
            dragResistance: 0,
            edgeResistance: 0.65,
            throwProps: true,
            minimumMovement: 0,
            allowNativeTouchScrolling: nativeTouchScrollingVar,
            onDrag: updateSlider,
            onThrowUpdate: updateSlider,
            onDragStart: desactivateSlide,
            onThrowComplete: activateSlide,
            snap: {
                x: function(endValue){
                    return ((endValue / slideWidth) | 0) * slideWidth;
                }
            }
        });
    }

    containerSliders.each(function(i){
        initSlider($(this), i);

        tlAutoScroll[i] = new TimelineMax();
        var slidersInit = $(this).find('.slider'), sliderInit = $(this).find('.slides');
        var slidesInit = sliderInit.find('> li');
        var slideWidthInit = slidesInit.outerWidth();
        autoScroll(slidersInit, slideWidthInit, i, tlAutoScroll[i]);
    });

    if(windowWidth <= 580){
        smallWindowWidth = true;
    }

    $(window).on('resize', throttle(function(){
        windowWidth = $(window).outerWidth();
        if(windowWidth > 580 && smallWindowWidth){
            clearSliders();
            containerSliders.each(function(i){
                tlAutoScroll[i].kill();
                clearTimeout(timeOutAutoScroll[i]);

                initSlider($(this), i);

                tlAutoScroll[i] = new TimelineMax();
                var slidersInit = $(this).find('.slider'), sliderInit = $(this).find('.slides');
                var slidesInit = sliderInit.find('> li');
                var slideWidthInit = slidesInit.outerWidth();
                autoScroll(slidersInit, slideWidthInit, i, tlAutoScroll[i]);
            });
            smallWindowWidth = false;
        }else if(windowWidth <= 580 && !smallWindowWidth){
            clearSliders();
            containerSliders.each(function(i){
                tlAutoScroll[i].kill();
                clearTimeout(timeOutAutoScroll[i]);

                initSlider($(this), i);

                tlAutoScroll[i] = new TimelineMax();
                var slidersInit = $(this).find('.slider'), sliderInit = $(this).find('.slides');
                var slidesInit = sliderInit.find('> li');
                var slideWidthInit = slidesInit.outerWidth();
                autoScroll(slidersInit, slideWidthInit, i, tlAutoScroll[i]);
            });
            smallWindowWidth = true;
        }
    }, 60));
}
