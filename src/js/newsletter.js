var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var ScrollToPlugin = require('./libs/gsap/src/uncompressed/plugins/ScrollToPlugin.js');

module.exports = function(){
    var btnNewsletter = $('#btnNewsletter'),
        newsletter = $('.newsletter-footer'),
        tlNewsletter = new TimelineMax();

    btnNewsletter.on('click', function(e){
        e.preventDefault();
        tlNewsletter.to(newsletter, 0.4, {height: 'auto'});
        tlNewsletter.to(window, 1, {scrollTo:{y: $(document).outerHeight()}});
        tlNewsletter.to(newsletter.find('.content-newsletter'), 0.4, {y: '0'}, 0.4);
    });
}
