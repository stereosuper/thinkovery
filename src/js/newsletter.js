var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var ScrollToPlugin = require('./libs/gsap/src/uncompressed/plugins/ScrollToPlugin.js');

module.exports = function(){
    var btnNewsletter = $('#btnNewsletter'),
        newsletter = $('.newsletter-footer');

    btnNewsletter.on('click', function(e){
        e.preventDefault();
        TweenMax.to(newsletter, 0.4, {height: 'auto', onComplete: function(){
            TweenMax.to(newsletter, 0.4, {opacity: 1});
            TweenMax.to(window, 1, {scrollTo:{y: $(document).outerHeight()}});
        }});
    });

    if($('.mc4wp-form-submitted').length){
        TweenMax.to(newsletter, 0.4, {height: 'auto', onComplete: function(){
            TweenMax.to(newsletter, 0.4, {opacity: 1});
            TweenMax.to(window, 1, {scrollTo:{y: $(document).outerHeight()}});
        }});
    }
}
