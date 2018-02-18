// renders the checkout summary page in the checkout container
import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import csS from './CheckoutSumm.css'


const checkoutSummary = (props) => {

	return (
		<div className={csS.CheckoutSumm}>
			<h1>We hope that you enjoy your burger!</h1>
			<div style= {{width:'100%', margin: 'auto'}}>
				<Burger ingr={props.ingr} />
			</div>
			<Button 
			clicked={props.checkoutCancelled}
			btnType="Danger">CANCEL</Button>
			<Button 
			clicked={props.checkoutContinue}
			btnType="Success">CONTINUE</Button>
		</div>
	);
}

export default checkoutSummary;