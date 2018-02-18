//This will retrive our orders from firebase and make them visible in our Orders container
import React, {Component} from "react";
import {connect} from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';


class Orders extends Component {
	state = {
		orders: <Spinner />
	}
	
	componentDidMount() {
		this.props.onFetchOrders(this.props.token, this.props.userId);
	}

	render () {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map(order => (
				<Order 
				key={order.id}
				ingr={order.ingredients}
				price={order.price}
				method={order.orderData.deliveryMethod}
				date={order.dateInfo}></Order>
				))
		};
		return (
			<div>
				{orders.length === 0 ? <p style={{textAlign: 'center'}}> You Do Not Have Any Pending Orders at This Time</p> : orders}
			</div>
			);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		laoding: state.order.loading,
		token: state.auth.firetoken,
		userId: state.auth.userID
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);