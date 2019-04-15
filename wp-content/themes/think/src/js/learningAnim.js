import { TweenMax, TimelineMax } from 'gsap';
import { forEach } from './utils';
import win from './utils/Window';
import './plugins/DrawSVGPlugin';
import './plugins/MorphSVGPlugin';


const learningAnimHandler = () => {
    const schema = document.getElementById('learning-anim');

    if( !schema ) return;

    const pathBezier = MorphSVGPlugin.pathDataToBezier(schema.querySelector('circle'));
    const minions = schema.querySelectorAll('.shape');
    const tls = [];
    let resizeTimer;


    const init = () => {
        forEach(minions, (minion, i) =>{
            tls[i] = new TimelineMax({paused: true, repeat: -1});
    
            tls[i].to(minion, 50, {bezier: {values: pathBezier, type: 'cubic'}, ease: Linear.easeNone});
            tls[i].progress(i*0.2);
            tls[i].play();
            
            TweenMax.set(minion, {opacity: 1});
        });
    };


    // launch anim if schema is visible (window width > 960)
    if( getComputedStyle(schema).display !== 'none' ) init();

    win.addResizeFunction(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {

            if( getComputedStyle(schema).display !== 'none' ){
                init();
            }

        }, 500);
    });
    
};

export default learningAnimHandler;
