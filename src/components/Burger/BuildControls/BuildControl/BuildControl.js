//This should give us the specific buttons that will go into Build Controls
//This should build 1 Less button 1 More button and the label of the ingredient
import React from 'react';

import csS from './BuildControl.css';

const buildControl = (props) => (
			<div className={csS.BuildControl}>
				<div className={csS.Label}>{props.label} ({props.count})</div>
				<button 
					className={csS.Less}
					onClick={props.remove}
					disabled={props.disabled}
				>Less</button>
				<button 
					className={csS.More}
					onClick={props.added}
				>More</button>
			</div>
);


export default buildControl;