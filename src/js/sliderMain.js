var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var throttle = require('./throttle.js');

module.exports = function(blocTop){
    var baseline = blocTop.find('strong');
    var ratioScale, imgW = 1260, imgH = 760, imgRatio = imgH / imgW;
    var finalW, finalH;
    var newX, newY, posX = baseline.data('x'), posY = baseline.data('y');
    var containerH, containerW, containerRatio;

    function setPosBaseline(){
        containerH = blocTop.height();
        containerW = blocTop.width();
        containerRatio = containerH / containerW;

        // portrait
        if(containerRatio > imgRatio){
            finalH = containerH;
            finalW = (imgW*finalH)/imgH;
            newX = ((finalW*posX) / imgW) - (finalW - containerW)/2;
            newY = ((finalH*posY) / imgH);
        // paysage
        }else{
            finalW = containerW;
            finalH = (imgH*finalW)/imgW;
            newX = ((finalW*posX) / imgW);
            newY = ((finalH*posY) / imgH) - (finalH - containerH)/2;
        }

        ratioScale = finalH / imgH;

        TweenMax.set(baseline, {scale: ratioScale, x: newX + 'px', y: newY + 'px'});
    }
    setPosBaseline();

    $(window).on('resize', throttle(function(){
        requestAnimFrame(setPosBaseline);
    }, 60));
}
