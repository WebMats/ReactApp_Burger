//This will be the form that the user needs to fillout with information before finalizing order
import React, {Component} from 'react';

import {connect} from 'react-redux';
import {updateObject, checkValidity} from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import csS from './ContactData.css'


class ContactData extends Component {
	state = { //this defines our form object and returns a scatfold to the user that they can fill out
		orderForm: {
			name: {
				elementType: 'input',
				elementFrame: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementFrame: {
					type: 'text',
					placeholder: 'Your Address'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},	
			zipcode: {
				elementType: 'input',
				elementFrame: {
					type: 'text',
					placeholder: 'Your Postal Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
					isNumeric: true
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementFrame: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementFrame: {
					type: 'text',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementFrame: {
					options: [
					{value: 'delivery', displayValue: 'Delivery'},
					{value: 'carry-out', displayValue: 'Carry-Out'}
					]
				},
				value:'delivery',
				validation: {},
				valid: true
			}
		},
		formIsValid: false,
	}
//orderHandler will respond to a submitForm event and post all the information entered by the user to firebase.google
orderHandler = (event) => {
	event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			//this will setup the form Elements inside formData and map their value to the value of the updating orderForm above
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
	const order = { //build the users order data
		ingredients: this.props.ingrs,
		price: this.props.price,
		orderData: formData,
		userId: this.props.userID,
		dateInfo: {
			month: (new Date()).getMonth(),
			day: (new Date()).getDate(),
			year: (new Date()).getFullYear(),
			hour: (new Date()).getHours(),
			minute: (new Date()).getMinutes()
		}
		
	}
this.props.onOrderBurger(order, this.props.token);
this.props.history.replace('/');
}

inputChangedHandler = (event, InputIdentifier) => { //called by <Input changed> 
	const userFormInput = updateObject(this.state.orderForm[InputIdentifier], { //gets us the right input and updates its state
			value: event.target.value,
			valid: checkValidity(event.target.value, this.state.orderForm[InputIdentifier].validation),
			touched: true
	});
	const userForm = updateObject(this.state.orderForm, { // changes value of order form
		[InputIdentifier]: userFormInput
	});
	let formIsValid = true;
	for(let InputIdentifier in userForm) { //makes sure every input in form is valid
		formIsValid = userForm[InputIdentifier].valid && formIsValid;
	}
		this.setState({orderForm: userForm, formIsValid: formIsValid});
}

	render () {
		const formElementsArray = []; 
		for (let key in this.state.orderForm) {
		formElementsArray.push({
			id: key,
			frame: this.state.orderForm[key]
		});
	}

	let form = (
				<form onSubmit={this.orderHandler}>
					{formElementsArray.map(formElement => ( //builds our form
						<Input
						key = {formElement.id}
						elementType={formElement.frame.elementType}
						elementFrame={formElement.frame.elementFrame}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
						value={formElement.frame.value}
						shouldValidate={formElement.frame.validation}
						touched={formElement.frame.touched}
						invalid={!formElement.frame.valid} />
					))}
					<Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
				</form>
			);

		if (this.props.loading) {
			form = <Spinner />
		}
		return (
			<div className={csS.ContactData}> 
				<h4>Enter Your Contact Information</h4>
				{form}
			</div>
			);
	}

}

const mapStateToProps = state => {
	return {
		ingrs: state.ingr.ingr,
		price: state.ingr.totalPrice,
		loading: state.order.loading,
		token: state.auth.firetoken,
		userID: state.auth.userID
	}
}

const mapDispatchToProps = dispatch => {
	return{
	onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)) //called by orderHandler to post order to firebase
}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);




