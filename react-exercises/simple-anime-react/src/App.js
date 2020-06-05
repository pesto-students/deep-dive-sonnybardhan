import React from 'react'
import './App.css';
import {Bounce, Pulse, FadeIn, FadeOut, Slide} from './anim-lib';

export default function App() {

	return (
		<>
			<div className="App">
				<div className="bounce-box">
					<Bounce 
						duration={'1.5s'} 
						timingFunction={'cubic-bezier(1,.9,1,1)'} 
						delay={'0s'} iterationCount={'infinite'} 
						direction={'alternate'} 
						start={'0vh'} 
						end={'35vh'}
					>
						<div className="circle"/>
					</Bounce>
				</div>
				<div className="box">
					<Pulse
						duration={'1s'} 
						timingFunction={'ease-in'} 
						delay={'0s'} iterationCount={'infinite'} 
						direction={'alternate'}
						initial={'1'}
						final={'1.5'}
					>
						<div className="circle"/>
					</Pulse>
				</div>
				<div className="box">
					<FadeIn
						duration={'2s'} 
						timingFunction={'linear'} 
						delay={'0s'} 
						iterationCount={'infinite'} 
						direction={'alternate'} 
						initial={'0'}
						final={'1'}
					>
						<div className="circle"/>
					</FadeIn>
				</div>
				<div className="box">
					<FadeOut
						duration={'2s'} 
						timingFunction={'linear'} 
						delay={'0s'} 
						iterationCount={'infinite'} 
						direction={'alternate'}
						initial={'1'}
						final={'0'}
					>
						<div className="circle"/>
					</FadeOut>
				</div>
			</div>
      <div className="App">
        <div className="">Bounce</div>
        <div className="">Pulse</div>
        <div className="">Fade-in</div>
        <div className="">Fade-out</div>
      </div>
			<div className="App">
				<div className="slide-box">
					<Slide
						duration={'2s'} 
						timingFunction={'cubic-bezier(1,.1,1,1)'} 
						delay={'0s'} iterationCount={'infinite'} 
						direction={'alternate'}
						start={'0vw'}
						end={'80%'}
					>
						<div className="circle"/>
					</Slide>
				</div>
			</div>
      <div className="App">
        <div className="">Slide</div>
      </div>
		</>
	)
}
