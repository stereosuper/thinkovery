var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

module.exports = function(){
    var tag = document.createElement('script'), firstScriptTag = document.getElementsByTagName('script')[0];
    var wrapperVideos = $('.wrapper-video'), players = [];

    global.onYouTubeIframeAPIReady = function(){
        function onPlayerReady(wrapperVideoParent){
            wrapperVideoParent.on('click', function(){
                TweenMax.to($(this).find('.cover-video'), 0.5, {opacity: 0, display: 'none'});
                players[$(this).index('.wrapper-video')].playVideo();
            });
        }

        wrapperVideos.each(function(i){
            players[i] = new YT.Player($(this).find('iframe').get(0), {
                events: { 'onReady': onPlayerReady($(this)) }
            });
        });
    }

    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
