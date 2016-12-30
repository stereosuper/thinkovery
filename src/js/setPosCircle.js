var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var throttle = require('./throttle.js');
var getEltPosOnCover = require('./getEltPosOnCover');


module.exports = function(container){
    var posCircle, circle = container.find('> .hoop');
    var imgW = container.data('img-width'), imgH = container.data('img-height'), imgRatio = imgH / imgW;

    function setPosCircle(){
        posCircle = getEltPosOnCover(container, imgRatio, imgW, imgH, circle);
        TweenMax.set(circle, {scale: posCircle[2], left: posCircle[0] + 'px', top: posCircle[1] + 'px', force3D: true});
    }

    setPosCircle();
    TweenMax.to(circle, 1, {opacity: 1});

    $(window).on('resize', throttle(function(){
        requestAnimFrame(setPosCircle);
    }, 60));
}
