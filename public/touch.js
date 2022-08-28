document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
 
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            leftDirection = true;
            upDirection = false;
            downDirection = false;
        } else {
            /* right swipe */
            rightDirection = true;
            upDirection = false;
            downDirection = false;
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            upDirection = true;
            leftDirection = false;
            rightDirection = false;
        } else { 
            /* down swipe */
            downDirection = true;
            leftDirection = false;
            rightDirection = false;
        }                                                                 
    }
 
    /* reset values */
    xDown = null;
    yDown = null;                                             
};