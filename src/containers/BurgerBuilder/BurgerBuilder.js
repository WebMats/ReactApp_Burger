import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSumm from '../../components/Burger/OrderSumm/OrderSumm';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
	state = { 
		purchasing: false  //Monitors if the ORDER NOW button has been clicked
	}

componentDidMount() { //fetch the ingredients from firebase after the BurgerBuilder container has mounted to our app
	this.props.onInitIngredients();
}

makePurchasable (newingrcount) { //toggle disabled attribute on ORDER NOW button when 'addIngr'/'removeIngr' properties are called from <BuildControls purchasable />
	const sum = Object.keys(newingrcount).map(ingKey => { //retrive name of ingr each ingredient
		return newingrcount[ingKey]; //retrive the value of each ingredient
	}).reduce((sum, el) => { //sum up the values in array
		return sum +el;
		}, 0);
	return sum > 0 // if sum is > 0 return true to update ORDER NOW.
}

purchaseHandler = () => {
	if (this.props.isAuthenticated) { //if the user is authenticated the user will be allowed to ourchase the burger through this path
		this.setState({purchasing:true});
	} else { //otherwise the user will be redirected to /auth when he clickes the order button, and the redirectpath in the auth state will 
		//be changed to /checkout so that when the user either signs in or creates an account he is redirected to the /checkout with the burger the user just built
		this.props.onSetAuthRedirectPath('/checkout');
		this.props.history.push("/auth");
}
}

purchaseCancelHandler = () => { //called through <OrderSumm purcan> 
	this.setState({purchasing:false})
 }
 
 purchaseContinueHandler = () => { //this will send the order the customer placed to the server 'firebase.google.com'. and redirect user to baseURL/checkout
this.props.history.push('/checkout')
}

	render() {
		const disabledInfo ={ //will toggle the state of the 'Less' button for each ingredient through <BuildControls disabled >
			...this.props.ingrs
		};
		for (let key in disabledInfo) {  // running a key command so that key is the name of the ingr in our copied state
			disabledInfo[key] = disabledInfo[key] <= 0 //checking if the value is 0 or less then it is assigning true or false to the copied state's value of the amount of each ingredient.
		}



		let orderSumm = null;
		let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
		if (this.props.ingrs) { //check if we have ingredients that were fetched from firebase.google.com by axios being rendered into our state.
			burger = (
				<Aux>
					<Burger ingr={this.props.ingrs}/>
					<BuildControls 
						addIngr={this.props.onIngredientAdd}
						removeIngr={this.props.onIngredientRemove}
						disabled ={disabledInfo}
						price={this.props.price}
						ordernowclicked={this.purchaseHandler}
						ingr={this.props.ingrs}
						isAuth={this.props.isAuthenticated}
						purchasable={this.makePurchasable(this.props.ingrs)} />
			    </Aux>
			    );
			orderSumm = ( //modal will hold this info
				<OrderSumm 
						ingr={this.props.ingrs}
						purcan={this.purchaseCancelHandler}
						purcon={this.purchaseContinueHandler}
						price={this.props.price}
					 />
					 );
		}
		return (
			<Aux>
				<Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
					{orderSumm}
				</Modal>
				{burger}
			</Aux>
			);
	}
}

const mapStateToProps = state => {
	return {
		ingrs: state.ingr.ingr,
		price: state.ingr.totalPrice,
		error: state.ingr.error,
		isAuthenticated: state.auth.firetoken !== null
	}
}

const mapDispatchToProps = dispatch => {
	return { // these dispatch functions will wait for actions to return the functions for which they are calling
//ingName comes from the 'added' property in BuildControl which is passing a variable ctlr.type, which holds the name of the ingredient. we redefine ctrl.type to be ingName within this dispatch function
		onIngredientAdd: (ingName) => dispatch(actions.addIngredient(ingName)), 
		onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder, axios);






