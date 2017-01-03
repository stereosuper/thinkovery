var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var Draggable = require('./libs/gsap/src/uncompressed/utils/Draggable.js');
var ThrowPropsPlugin = require('./libs/gsap/src/uncompressed/plugins/ThrowPropsPlugin.js');

module.exports = function(){
    var containerSliders = $('.container-sliders');
    var i, j, newX, centerSlider, centerSlide, originalSlider;
    var sliderTarget, originalSliderTarget, widthSliderTarget, centerSliderTarget, slidesTarget;
    var sliderCloned, sliderClonedTarget;
    var errorMargin, maxMargin, minMargin, halfSlide;
    var DraggableElems = [];

    function desactivateSlide(){
        $(this.target).find('.slides > li').removeClass('active');
    }

    function activateSlide(){
        // activate the centered slide
        sliderTarget = $(this.target);
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
        sliderTarget = $(this.target);
        sliderClonedTarget = sliderTarget.find('.slides.cloned');
        originalSliderTarget = sliderTarget.find('.slides:not(.cloned)');
        slidesTarget = originalSliderTarget.find('> li');
        widthSliderTarget = slidesTarget.length*slidesTarget.outerWidth();
        newX = this.x;

        if(newX > 0){
            // Going left
            TweenMax.set(sliderClonedTarget, {x: -widthSliderTarget+'px', force3D: true});
            if(newX > widthSliderTarget){
                newX -= widthSliderTarget;
            }
        }else{
            // Going right
            TweenMax.set(sliderClonedTarget, {x: widthSliderTarget+'px', force3D: true});
            if(newX < -widthSliderTarget){
                newX += widthSliderTarget;
            }
        }
        if(newX !== this.x){
            TweenMax.set(sliderTarget, {x: newX, force3D: true, overwrite: false});
            this.x = newX;
        }

        // Rotate svg
        TweenMax.set(sliderTarget.parents('.container-sliders').find('.hoop'), {rotation: newX/2, force3D: true, overwrite: false});
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
            // Center the middle slide
            //TweenMax.set(wrapperSliders, {paddingRight: slideWidth+'px'});
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

        activateSlideInitial(container, slides, slideWidth);

        // Draggable
        DraggableElems[indexSlider] = Draggable.create(sliders, {
            type: 'x',
            zIndexBoost: false,
            dragClickables: true,
            dragResistance: 0,
            edgeResistance: 0.65,
            throwProps: true,
            minimumMovement: 0,
            // bounds: wrapperSliders,
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
    });

}
