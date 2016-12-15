var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var Draggable = require('./libs/gsap/src/uncompressed/utils/Draggable.js');
var ThrowPropsPlugin = require('./libs/gsap/src/uncompressed/plugins/ThrowPropsPlugin.min.js');

module.exports = function(){
    var containerSliders = $('.container-sliders'), wrapperSliders = $('.wrapper-sliders'), hoopSlider = containerSliders.find('.hoop'), sliders = $('.slider'), slider = $('.slides'), slides = slider.find('> li'), nbSlides, slideWidth, slideHeight;
    var halfSlides, halfRight, halfLeft, widthSlider, middleSlider;
    var i, j;
    var newX;
    var centerSlider, centerSlide;
    var sliderTarget, originalSliderTarget, sliderClonedTarget, nbSlidesTarget, slideTargetWidth, widthSliderTarget, centerSliderTarget, containerSlidersTarget, slidesTarget, slideTargetWidth, hoopSliderTarget;

    var windowWidth = $(window).outerWidth();

    function desactivateSlide(){
        sliderTarget = $(this.target);
        sliderTarget.find('.slides > li').removeClass('active');
    }

    function activateSlide(){
        // activate the centered slide
        sliderTarget = $(this.target);
        containerSlidersTarget = sliderTarget.parents('.container-sliders');
        centerSliderTarget = (containerSlidersTarget.width())/2;
        slidesTarget = sliderTarget.find('.slides > li');
        slideTargetWidth = slidesTarget.outerWidth();
        slidesTarget.each(function(index){
            centerSlide = Math.floor($(this).offset().left + (slideTargetWidth/2));
            if(centerSlide === centerSliderTarget){
                $(this).addClass('active');
            }
        });
    }

    function activateSlideInitial(containerS, slidesS, slidesWidthS){
        centerSlider = (containerS.width())/2;
        slidesS.each(function(index){
            centerSlide = Math.floor($(this).offset().left + (slidesWidthS/2));
            if(centerSlide === centerSlider){
                $(this).addClass('active');
            }
        });
    }

    function updateSlider(){
        sliderTarget = $(this.target);
        containerSlidersTarget = sliderTarget.parents('.container-sliders');
        sliderClonedTarget = sliderTarget.find('.slides.cloned');
        originalSliderTarget = sliderTarget.find('.slides:not(.cloned)');
        nbSlidesTarget = originalSliderTarget.find('> li').length;
        slideTargetWidth = originalSliderTarget.find('> li').outerWidth();
        widthSliderTarget = nbSlidesTarget*slideTargetWidth;
        hoopSliderTarget = containerSlidersTarget.find('.hoop');
        newX = this.x;
        if(newX <= 0){
            // Going right
            TweenMax.set(sliderClonedTarget, {x: widthSliderTarget+'px'});
            if(newX < -widthSliderTarget){
                newX = newX + widthSliderTarget;
            }
        }else{
            // Going left
            TweenMax.set(sliderClonedTarget, {x: -widthSliderTarget+'px'});
            if(newX > widthSliderTarget){
                newX = newX - widthSliderTarget;
            }
        }
        if (newX !== this.x) {
            TweenMax.set(sliderTarget, {x: newX, overwrite: false});
            this.x = newX;
        }
        // Rotate svg
        TweenMax.set(hoopSliderTarget, {rotation: newX/2, overwrite: false});
    }

    containerSliders.each(function(index){
        var wrapperSliders = $(this).find('.wrapper-sliders'), hoopSlider = $(this).find('.hoop'), sliders = $(this).find('.slider'), slider = $(this).find('.slides'), slides = slider.find('> li'), nbSlides, slideWidth, slideHeight;

        // Position slides
        nbSlides = slides.length;
        slideWidth = slides.outerWidth();
        slideHeight = slides.outerHeight();
        halfSlides = nbSlides/2;
        if(nbSlides % 2 === 0){
            halfRight = halfSlides;
            halfLeft = halfSlides;
            // Center the middle slide
            //TweenMax.set(wrapperSliders, {paddingRight: slideWidth+'px'});
        }else{
            halfRight = Math.ceil(halfSlides);
            halfLeft = nbSlides - halfRight;
        }

        // Duplicate list
        slider.clone().addClass('cloned').appendTo(sliders);
        var slider = $(this).find('.slides'), slides = slider.find('> li');
        var sliderCloned = $(this).find('.slides.cloned'), originalSlider = $(this).find('.slides:not(.cloned)');

        // Rearrange list
        widthSlider = nbSlides*slideWidth;
        middleSlider = (widthSlider/2) - (slideWidth/2);
        leftSlidesStart = (widthSlider/2) - (halfLeft*slideWidth) - (slideWidth/2);
        TweenMax.set([slider, wrapperSliders], {width: widthSlider+'px'});
        slider.each(function(){
            for (i=0; i<halfRight; i++) {
                TweenMax.set($(this).find('>li').eq(i), {left: (middleSlider+(i*slideWidth))+'px'});
            }
            for (j=0; j<halfLeft; j++) {
                TweenMax.set($(this).find('>li').eq(halfRight+j), {left: (leftSlidesStart+(j*slideWidth))+'px'});
            }
        });
        TweenMax.set(sliderCloned, {x: widthSlider+'px'});
        TweenMax.set(slider, {marginLeft: -(widthSlider/2)+'px'});

        activateSlideInitial($(this), slides, slideWidth);

        // Draggable
        Draggable.create(sliders, {
            type: 'x',
            edgeResistance: 0.65,
            throwProps: true,
            // bounds: wrapperSliders,
            onDrag: updateSlider,
            onThrowUpdate: updateSlider,
            onDragStart: desactivateSlide,
            onThrowComplete: activateSlide,
            snap: {
                x: function(endValue) {
                    return Math.round(endValue / slideWidth) * slideWidth;
                }
            }
        });
    });

}
