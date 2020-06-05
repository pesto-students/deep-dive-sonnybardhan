import React from 'react';

function Pulse({children, duration, timingFunction, delay, iterationCount, direction, initial='1', final='2' }){

 	const styleSheet = document.styleSheets[0];

  const keyframes = `
      @keyframes pulse {
      0% {
        transform: scale(${initial})
      }

      100% {
        transform: scale(${final})
      }
    }
	`
	styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

	return(
		<div style={ 
          {animation: `pulse ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction}`}
        }>
			{children}
		</div>
	)
}


export default Pulse;