var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var CustomEase = require('./libs/gsap/src/uncompressed/easing/CustomEase.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(){
    var visuSprites = $('.svgAnim'), sprite,
        spritesTl = [],
        numRows = 10, frameHeight = 200, frameWidth = 200, j,
        heightVisu,
        steppedEase = new SteppedEase(0);

    function animateSprites(){
        heightVisu = visuSprites.outerHeight();
        console.log('heightVisu : '+heightVisu);
        visuSprites.each(function(i){
            sprite = $(this);
            if(typeof spritesTl[i] !== 'undefined'){
                spritesTl[i].kill();
            }
            spritesTl[i] = new TimelineMax({repeat: -1});
            j = 0;
            for(j; j<numRows; j++){
               // spritesTl[i].add(TweenMax.fromTo(sprite, 0.15, {backgroundPosition: '0 -'+(frameHeight*j)+'px'}, {backgroundPosition: '-'+(frameWidth*(numCols-1))+'px -'+(frameHeight*j)+'px', ease: steppedEase}));
               // spritesTl[i].add(TweenMax.fromTo(sprite, 0.15, {backgroundPosition: '0% '+(10*j)+'%'}, {backgroundPosition: '0% '+(10*j)+'%', ease: steppedEase}));
               spritesTl[i].add(TweenMax.fromTo(sprite, 0.15, {backgroundPosition: '0 -'+(heightVisu*j)+'px'}, {backgroundPosition: '0 -'+(heightVisu*j)+'px', ease: steppedEase}));
            }
        });
    }

    animateSprites();

    $(window).on('resize', throttle(function(){
        console.log('aze');
        requestAnimFrame(animateSprites);
    }, 40));
}
