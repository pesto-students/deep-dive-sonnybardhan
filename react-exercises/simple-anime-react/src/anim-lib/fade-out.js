import React from 'react';


function FadeOut({children, duration, timingFunction, delay, iterationCount, direction, initial=1, final=0 }){

 	const styleSheet = document.styleSheets[0];
	
  const keyframes = `
      @keyframes fade-out {
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
          {animation: `fade-out ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction}`}
        }>
			{children}
		</div>
	)
}


export default FadeOut;