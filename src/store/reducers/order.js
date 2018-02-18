// reducer will handle the state in our baseURL/orders path for each authorized user and execute checkout sequence when submitting checkout form 

import {updateObject} from '../../shared/utility';

import * as actionTypes from '../actions/actionTypes';


const initialState = {
	orders: [],
	loading: false,
	purchased: false
};

const purchaseBurgerSuccess = (state, action) => { // adds order placed to the orders array
		const newOrder = updateObject(action.orderData, {id: action.orderID});
			return updateObject(state, {
				loading: false,
				purchased: true,
				orders: state.orders.concat( newOrder )
			});
}

const fethOrdersSuccess = (state, action) => { //GETs orders from firebase for the user that is authorized, when authorization is valid
	console.log(action)
	return updateObject(state,{
		orders: action.orders, 
		loading: false
	});
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_START: return updateObject(state, {loading: true});
		case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);

		case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, {loading: false});
		case actionTypes.FETCH_ORDERS_START: return updateObject(state, {loading: true});
		case actionTypes.FETCH_ORDERS_SUCCESS: return fethOrdersSuccess(state, action);
		
		case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, {loading: false});
		default: return state;
	}
}

export default reducer;



