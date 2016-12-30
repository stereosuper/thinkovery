var $ = require('./libs/jquery/dist/jquery.slim.min.js');

module.exports = function(container, imgRatio, imgW, imgH, elt){
    containerH = container.outerHeight();
    containerW = container.width();
    containerRatio = containerH / containerW;

    posX = elt.data('x');
    posY = elt.data('y');

    // portrait
    if(containerRatio > imgRatio){
        finalH = containerH;
        finalW = imgW*finalH / imgH;
        newX = finalW*posX / imgW - (finalW - containerW)/2;
        newY = finalH*posY / imgH;
    // paysage
    }else{
        finalW = containerW;
        finalH = imgH*finalW / imgW;
        newX = finalW*posX / imgW;
        newY = finalH*posY / imgH - (finalH - containerH)/2;
    }

    ratioScale = finalH / imgH;

    console.log(containerH)

    return [newX, newY, ratioScale];
}
