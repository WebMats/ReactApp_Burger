import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import asyncComponent from './hoc/AsyncComponent/AsyncLoading';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';

import './App.css';
import * as actions from './store/actions/index';


const asyncCheckout = asyncComponent(() => { //Lazy loading for /checkout
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent(() => { //Lazy loading for /orders
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent(() => { //Lazy loading for /auth
  return import('./containers/Auth/Auth')
});


class App extends Component {

componentDidMount() { 
 this.props.onTryAutoSignup(); // on app mount the we will try to authenticate through firebase
}

  render() {
    const ordersRoute = localStorage.token !== undefined ? <Route path="/orders" component={asyncOrders} /> : null;
let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      {ordersRoute}
      <Route path="/auth" exact component={asyncAuth} />
      <Redirect to="/" />
    </Switch>
    );
  if (this.props.isAuth)  { // separate routes for authorized users (protecting privacy of users and our app's paths)
    routes = (
    <Switch>
        <Route path="/" exact component={BurgerBuilder} />  
        <Route path="/orders" component={asyncOrders} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
    </Switch>
    );
}

    return (
      <div className="App">
        <Layout>
        	{routes}
        </Layout>
      </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.firetoken !== null //retrives firetoken from auth-reducer and gives us true/false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()) // will try to authenticate user with credentials stored in localstorage when first loading our app
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// When Routes ordered properly under <Switch> , exact is a redundancy



