var $ = require('./libs/jquery/dist/jquery.slim.min.js');

module.exports = function(){
    var slider = $('.slides'), slides = slider.find('> li'), nbSlides, slideWidth, slideHeight;
    var halfSlides, halfRight, halfLeft;

    var windowWidth = $(window).outerWidth();

    // Position slides
    nbSlides = slides.length;
    slideWidth = slides.outerWidth();
    slideHeight = slides.outerHeight();
    halfSlides = nbSlides/2;
    if(nbSlides % 2 === 0){
        halfRight = halfSlides;
        halfLeft = halfSlides;
    }else{
        halfRight = Math.ceil(halfSlides);
        halfLeft = nbSlides - halfRight;
    }
    // Rearange list
    /*slides.each(function(index){
        
    });*/
    
}
