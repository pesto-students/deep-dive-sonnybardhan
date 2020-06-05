import React from 'react';

function Bounce({children, duration, timingFunction, delay, iterationCount, direction, start, end }){

 	const styleSheet = document.styleSheets[0];

  const keyframes = `
      @keyframes bounce {
      0% {
        transform: translateY(${start})
      }

      100% {
        transform: translateY(${end})
      }
    }
	`
	styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

	return(
		<div style={ 
          {animation: `bounce ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction}`}
        }>
			{children}
		</div>
	)
}

export default Bounce;