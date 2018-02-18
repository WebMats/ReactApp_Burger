import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';


export const purchaseBurgerSuccess = (id, orderData) => { //will update our order array
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderID: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
}

export const purchaseBurger = (orderData, token) => { //post our new order to firebase DB
	return dispatch => {
		dispatch(purchaseBurgerStart());
	axios.post('/orders.json?auth='+token, orderData).then(response => {
		dispatch(purchaseBurgerSuccess(response.data.name, orderData)) //name is a long string that firebase sets up for each order
		}).catch(error => {
			dispatch(purchaseBurgerFail(error))
		});
	};
};


export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFail = () => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL
	}
}
export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}

export const fetchOrders = (token, userId) => { //GETs all the orders for a specific user from firebase
	return dispatch => {
			dispatch(fetchOrdersStart())
			//this wiill allow us to fetch the orders from firebase that only belong to the user with a specific userId
			const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+ '"';
			axios.get('/orders.json' + queryParams).then(res => {
		const fetchedOrders = []; //puts our orders into an array
		for (let key in res.data) {
			fetchedOrders.push({
				...res.data[key],
				id: key
				});
		}
		dispatch(fetchOrdersSuccess(fetchedOrders));
	}).catch(err => {
		dispatch(fetchOrdersFail(err))
	});
	}
}













