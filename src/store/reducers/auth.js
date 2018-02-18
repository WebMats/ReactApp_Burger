import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';


const initialState = { //initializes auth Object
	firetoken: null,
	userID: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
}

const authSuccess = (state, action) => {
	return updateObject(state, {
		firetoken: action.IDtoken,
		userID: action.userID,
		error: null,
		loading: false
	})
};

const authLogout = (state, action) => { // logout method
	return updateObject(state, {
		firetoken: null, 
		userID: null
	})
};

// method that changes our authRedirectPath in our state
const setAuthRedirectPath = (state, action) => {
	return updateObject(state, {authRedirectPath: action.path})
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START: return updateObject(state, {error: null, laoding: true});
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);

		case actionTypes.AUTH_FAIL: return updateObject(state, {error: action.error, loading: false});
		case actionTypes.AUTH_LOGOUT: return authLogout(state, action);

		case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
		
		default: return state;

	}
};

export default reducer;
