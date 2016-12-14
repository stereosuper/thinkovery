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

    var windowWidth = $(window).outerWidth();

    function desactivateSlide(){
        slides.removeClass('active');
    }

    function activateSlide(){
        // activate the centered slide
        centerSlider = (containerSliders.width())/2;
        slides.each(function(index){
            centerSlide = $(this).offset().left + (slideWidth/2);
            if(centerSlide === centerSlider){
                $(this).addClass('active');
            }
        });
    }

    function updateSlider(){
        newX = this.x;
        if(newX <= 0){
            // Going right
            TweenMax.set(sliderCloned, {x: widthSlider+'px'});
            if(newX < -widthSlider){
                newX = newX + widthSlider;
            }
        }else{
            // Going left
            TweenMax.set(sliderCloned, {x: -widthSlider+'px'});
            if(newX > widthSlider){
                newX = newX - widthSlider;
            }
        }
        if (newX !== this.x) {
            TweenMax.set(sliders, {x: newX, overwrite: false});
            this.x = newX;
        }
        // Rotate svg
        TweenMax.set(hoopSlider, {rotation: newX, overwrite: false});
    }

    // Position slides
    nbSlides = slides.length;
    slideWidth = slides.outerWidth();
    slideHeight = slides.outerHeight();
    halfSlides = nbSlides/2;
    if(nbSlides % 2 === 0){
        halfRight = halfSlides;
        halfLeft = halfSlides;
        // Center the middle slide
        TweenMax.set(wrapperSliders, {paddingRight: slideWidth+'px'});
    }else{
        halfRight = Math.ceil(halfSlides);
        halfLeft = nbSlides - halfRight;
    }

    // Duplicate list
    slider.clone().addClass('cloned').appendTo(sliders);
    var wrapperSliders = $('.wrapper-sliders'), slider = $('.slides'), slides = slider.find('> li');
    var sliderCloned = $('.slides.cloned'), originalSlider = $('.slides:not(.cloned)');

    // Rearrange list
    widthSlider = nbSlides*slideWidth;
    middleSlider = (widthSlider/2);
    leftSlidesStart = (widthSlider/2) - (halfLeft*slideWidth);
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

    activateSlide();

    // Draggable
    Draggable.create(sliders, {
        type: 'x',
        edgeResistance: 0.65,
        throwProps: true,
        // bounds: wrapperSliders,
        onDrag: updateSlider,
        onThrowUpdate: updateSlider,
        onDragStart: desactivateSlide,
        onDragEnd: activateSlide,
        snap: {
            x: function(endValue) {
                return Math.round(endValue / slideWidth) * slideWidth;
            }
        }
    });

}
