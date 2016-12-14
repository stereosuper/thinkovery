var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

module.exports = function(body){
    var btnI, posGradient;

    function getPosGradient(btnI, btnMouseX, btnMouseY){
        return [btnI.data('x') - btnMouseX, btnI.data('y') - btnMouseY];
    }

    body.on('mouseenter', '.btn, #menu-main a', function(e){

        btnI = $(this).find('> i');
        btnI.data('x', btnI.position().left + btnI.width() / 2).data('y', btnI.position().top + btnI.height() / 2);
        $(this).data('x', $(this).offset().left).data('y', $(this).offset().top);
        posGradient = getPosGradient(btnI, e.pageX - $(this).data('x'), e.pageY - $(this).data('y'));
        TweenMax.to(btnI, 0.3, {x: - posGradient[0] + 'px', y: - posGradient[1] + 'px'});

    }).on('mousemove', '.btn, #menu-main a', function(e){

        btnI = $(this).find('> i');
        posGradient = getPosGradient(btnI, e.pageX - $(this).data('x'), e.pageY - $(this).data('y'));
        TweenMax.set(btnI, {x: - posGradient[0] + 'px', y: - posGradient[1] + 'px'});

    }).on('mouseleave', '.btn, #menu-main a', function(){

        TweenMax.to($(this).find('> i'), 0.3, {x: '0px', y: '0px'});

    });
}
