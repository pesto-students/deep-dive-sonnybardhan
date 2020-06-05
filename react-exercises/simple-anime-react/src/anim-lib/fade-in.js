import React from 'react';

function FadeIn({children, duration, timingFunction, delay, iterationCount, direction, initial=0, final=1 }){

 	const styleSheet = document.styleSheets[0];
	
  const keyframes = `
      @keyframes fade-in {
      0% {
        opacity: ${initial}
      }

      100% {
        opacity: ${final}
      }
    }
	`
	styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

	return(
		<div style={ 
          {animation: `fade-in ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction}`}
        }>
			{children}
		</div>
	)
}


export default FadeIn;