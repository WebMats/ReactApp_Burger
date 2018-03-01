import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		IDtoken: token,
		userID: userId
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const auth = (email, password, isSignup) => { //handles create account and login request from auth container
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=//"key"'
		if (!isSignup) { //if we are login in
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=//"key"'
		}
		axios.post(url, authData)
		.then(response => {
			const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
			//storing token, userId, and expiration of token(in seconds) in Browsers Local storage 
			localStorage.setItem('token', response.data.idToken)
			localStorage.setItem('expirationDate', expirationDate)
			localStorage.setItem('userID', response.data.localId)
			dispatch(authSuccess(response.data.idToken, response.data.localId))
			dispatch(checkAuthTimeout(response.data.expiresIn))
		})
		.catch(err => {
			dispatch(authFail(err.response.data.error)); 
		})
	};
};

export const logout = () => {
	// we are removing the token and expiration time when we are want/forced to logout
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userID');
	return {
		type: actionTypes.AUTH_LOGOUT
	}
};

export const checkAuthTimeout = (expirationTime) => { //will initialize logout sequence when expirationTime = 0
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, (expirationTime)*1000)
	}
};

//this method will build a function to change the redirect path
export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	}
}

export const authCheckState = () => {
	return dispatch => {
		//retrive token from localstorage
		const token = localStorage.getItem('token');
		if (!token) { //will call logout function to clear anything else that was stored along with token is state and localstorage
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'))
			if (expirationDate <= new Date()) { //if we have passed our expiration date we will force logout and clear state and localstorage
				dispatch(logout());
			} else { //this will trigger an auto authentication by dispatching authSuccess
				const userID = localStorage.getItem('userID')
			dispatch(authSuccess(token, userID));
			//this will set an auto logout after we have passed our expiration date
			dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
		}
	}
}
}

