//Provides a summary of our order and asks the user if they want to continue with this.
import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSumm/CheckoutSumm';


class Checkout extends Component {

onCheckoutCancelledHandler = () => {
	this.props.history.goBack() 
}

onCheckoutContinueHandler = () => { //replaces url with baseURL//checkout/contact-data, .replace does not give us access to previous page
	this.props.history.replace('/checkout/contact-data')
}

	render() {
	let summary = <Redirect to="/"/> //in case authenticated users manually replace URL with baseURL/chechout and they have not pressed the 'ORDER NOW' button
		if (this.props.ingrs) {
			summary = (
			<div>
				<CheckoutSummary 
					ingr={this.props.ingrs}
					checkoutCancelled={this.onCheckoutCancelledHandler}
					checkoutContinue={this.onCheckoutContinueHandler} />
				<Route 
					path={this.props.match.path + '/contact-data'}
					exact
					component = {ContactData}/>
			</div>
			);
		}
	return summary;
	}
	//We use render instead of component because this allows us to pass the ingredients to our component
}

const mapStateToProps = state => {
	return {
		ingrs: state.ingr.ingr,
		purchased: state.order.purchased
	}
};


export default connect(mapStateToProps)(Checkout);




