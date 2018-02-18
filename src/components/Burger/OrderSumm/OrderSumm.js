// this should fill the body of our Modal to show the full summary of the users order
import React from 'react';

import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux/Aux';


const orderSumm = (props) => {
	const ingredientsSumm = Object.keys(props.ingr)
	.map(ingKey => {
		return 	<li key={ingKey}>
					<span style={{textTransform:'capitalize'}}>{ingKey}</span>: {props.ingr[ingKey]}
				</li>
	})

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientsSumm}
			</ul>
			<p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
			<p>Continue to Checkout?</p>
			<Button clicked={props.purcan} btnType="Danger" >CANCEL</Button>
			<Button clicked={props.purcon} btnType="Success">CONTINUE</Button>
		</Aux>
		);
};

export default orderSumm;