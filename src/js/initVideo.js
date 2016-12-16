var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

module.exports = function(){
    // Inject YouTube API script
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var wrapperVideos = $('.wrapper-video'), players = [], iframeVideo, coverVideos, indexClicked, wrapperVideoParent;
    
    

    global.onYouTubeIframeAPIReady = function() {
        function onPlayerReady(wrapperVideoParent){
            wrapperVideoParent.on('click', function(){
                indexClicked = $(this).index('.wrapper-video');
                coverVideo = $(this).find('.cover-video');
                TweenMax.to(coverVideo, 0.5, {opacity: 0});
                players[indexClicked].playVideo();
            });
        }
        wrapperVideos.each(function(index){
            iframeVideo = $(this).find('iframe').get(0);
            players[index] = new YT.Player(iframeVideo, {
                events: {
                    'onReady': onPlayerReady($(this))
                }
            });
        });
    }


}
