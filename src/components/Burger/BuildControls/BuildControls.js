//This should render a list of controls for adding and removing ingredients on the BurgerBuilder page

import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import csS from './BuildControls.css'

// will be used to make the label of our controls and then will refer back to the real ingrients in burgerbuilder
const controls = [
		{label: 'Meat', type: 'meat'},
		{label: 'Cheese', type: 'cheese'},
		{label: 'Bacon', type: 'bacon'},
		{label: 'Salad', type: 'salad'}
];

const buildControls = (props) => ( // toFixed(2) rounds the price to two decimal spaces
			<div className={csS.BuildControls}>
			<p className={csS.Price}>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
				{controls.map(ctrl => (
				<BuildControl 
					key={ctrl.label} 
					label={ctrl.label}
					added={() => props.addIngr(ctrl.type)}
					remove={() => props.removeIngr(ctrl.type)}
					count={props.ingr[ctrl.type]}
					disabled={props.disabled[ctrl.type]}
				/>))}
				<button 
					className={csS.OrderButton}
					disabled={!props.purchasable}
					onClick={props.ordernowclicked}
				>{props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}</button>
			</div>
			);


export default buildControls;