var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var Draggable = require('./libs/gsap/src/uncompressed/utils/Draggable.js');
var ThrowPropsPlugin = require('./libs/gsap/src/uncompressed/plugins/ThrowPropsPlugin.min.js');

module.exports = function(){
    var wrapperSlider = $('.wrapper-sliders'), slider = $('.slides'), slides = slider.find('> li'), nbSlides, slideWidth, slideHeight;
    var halfSlides, halfRight, halfLeft, widthSlider, middleSlider;
    var i, j;

    var windowWidth = $(window).outerWidth();

    function updateSlider(){
        var newX = this.x % widthSlider;
        if(newX > 0){
          newX = newX - widthSlider;
        }
        if (newX !== this.x) {
          TweenMax.set(slider, {x:newX, overwrite:false});
          this.x = newX;
        }
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
        //TweenMax.set(slider, {marginLeft: -(slideWidth/2)+'px'});
    }else{
        halfRight = Math.ceil(halfSlides);
        halfLeft = nbSlides - halfRight;
    }

    // Duplicate list
    slider.clone().appendTo(wrapperSlider);
    var wrapperSlider = $('.wrapper-sliders'), slider = $('.slides'), slides = slider.find('> li');

    // Rearrange list
    widthSlider = nbSlides*slideWidth;
    middleSlider = (widthSlider/2);
    leftSlidesStart = (widthSlider/2) - (halfLeft*slideWidth);
    TweenMax.set([slider, wrapperSlider], {width: widthSlider+'px'});
    slider.each(function(){
        for (i=0; i<halfRight; i++) {
            TweenMax.set($(this).find('>li').eq(i), {left: (middleSlider+(i*slideWidth))+'px'});
        }
        for (j=0; j<halfLeft; j++) {
            TweenMax.set($(this).find('>li').eq(halfRight+j), {left: (leftSlidesStart+(j*slideWidth))+'px'});
        }
    });

    // Draggable
    Draggable.create(slider, {
        type: 'x',
        edgeResistance: 0.65,
        throwProps: true,
        // bounds: wrapperSlider,
        onDrag: updateSlider,
        onThrowUpdate: updateSlider,
        snap: {
            x: function(endValue) {
                return Math.round(endValue / slideWidth) * slideWidth;
            }
        }
    });

}
