import React from 'react';

function Slide({children, duration, timingFunction, delay, iterationCount, direction, start='0vw', end='20vw' }){

	
 	const styleSheet = document.styleSheets[0];
  const keyframes = `
      @keyframes slide {
      0% {
        transform: translateX(${start})
      }

      100% {
        transform: translateX(${end})
      }
    }
	`
	styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

	return(
		<div style={ 
          {animation: `slide ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction}`}
        }>
			{children}
		</div>
	)
}

export default Slide;