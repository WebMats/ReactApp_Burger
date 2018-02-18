import {updateObject} from '../../shared/utility';

import * as actionTypes from '../actions/actionTypes';


const initialState = {
	ingr: null,
	totalPrice: 4, //base price of burger (without ingredients) will initially be $4
	error: false, 
	building: false
};
const INGREDIENT_PRICES = {salad: 0.7, cheese: 0.5, meat: 1.7, bacon: 1.5} //set price for ingre

const addIngredient = (state, action) => { //method called on Ingredient Control "Add". Updates state of ingredients, which will be needed in BurgerBuilder container
		const incomingIngredientToAdd = {[action.ingredientName]: state.ingr[action.ingredientName]+1}
			const addedFromList = updateObject(state.ingr, incomingIngredientToAdd);
			const updatedStateAfterAdd = {
				ingr: addedFromList,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
				building: true 	
			}
			return updateObject(state, updatedStateAfterAdd);
}

const removeIngredient = (state, action) => { //method called on Ingredient Control "Remove". Updates state of ingredients
		const incomingIngredientToRemove = {[action.ingredientName]: state.ingr[action.ingredientName]-1}
			const removedFromList = updateObject(state.ingr, incomingIngredientToRemove);
			const updatedStateAfterRemove = {
				ingr: removedFromList,
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
				building: true 	
			}
			return updateObject(state, updatedStateAfterRemove);
}

const setIngredients = (state, action) => { //Method called when loading BurgerBuilder and fetching ingredients {salad:0, bacon: 0, cheese: 0, meat: 0} from firebase
		const setIngr = updateObject(state.ingr, action.ingr);
			const updatedStateAfterSetIngr = {
				ingr: setIngr,
				totalPrice: 4,
				error:false,
				building: false
			}
			return updateObject(state, updatedStateAfterSetIngr);
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT: return addIngredient( state, action);

		case actionTypes.REMOVE_INGREDIENT: return removeIngredient( state, action);

// This case handles the initial call to get ingredients from firebase.google.com and sets the state to what we have passed in here
		case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
		
		case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {errror: true})
		default: return state;
	}
};

export default reducer;