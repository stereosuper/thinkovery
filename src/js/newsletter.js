var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var ScrollToPlugin = require('./libs/gsap/src/uncompressed/plugins/ScrollToPlugin.js');

module.exports = function(){
    var btnNewsletter = $('#btnNewsletter'), newsletter = $('#newsletter');

    function openNewsletter(){
        if(newsletter.css('opacity') == 0) {
            TweenMax.to(newsletter, 0.4, {height: 'auto', onComplete: function(){
                TweenMax.to(newsletter, 0.4, {opacity: 1});
                TweenMax.to(window, 1, {scrollTo:{y: $(document).outerHeight()}});
            }});
        } else {
            TweenMax.to(newsletter, 0.4, {opacity: 0, height: '0px'});
        }
    }

    btnNewsletter.on('click', function(e){
        e.preventDefault();
        openNewsletter();
    });

    if(newsletter.find('.mc4wp-form').hasClass('mc4wp-form-submitted')){
        openNewsletter();
    }
}
