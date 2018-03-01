import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const addIngredient = (name) => { //makes a method to add ingredient and passes on name property to burgerBuilder reducer
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name // new property made in actions Object and set to ingName
	}
}

export const removeIngredient = (name) => { //makes a method to remove ingredient and passes on name property to burgerBuilder reducer
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name // new property made in actions Object and set to ingName
	}
};

export const setIngredients = (ingredients) => { //only called when we fetch ingredients from firebase by the initIngredients method
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingr: ingredients
	}
};

export const fetchIngredientsFailed = () => { 
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
};

export const initIngredients = () => { //this asyncronoous function will fetch our ingredients from the web and pass them onto setIngredients
	return dispatch => {
		axios.get('//path')
		.then(response => {
			dispatch(setIngredients(response.data));
		}).catch (error => {
			dispatch(fetchIngredientsFailed());
	});
};
}
