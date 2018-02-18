//This Layout will be a wrapper that guide us through what we want our core content to look like and control our sidedrawer for phones
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../Aux/Aux';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';

import csS from './Layout.css';


class Layout extends Component {
	state = {
		showSideDrawer: false
	}
	
sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}

sideDrawerToggleHandler = () => { 
	this.setState((prevState) => {
		return {showSideDrawer: !prevState.showSideDrawer};
	});
}

render() {
	return(
		<Aux>
			<Toolbar 
				isAuth={this.props.isAuthenticated}
				drawerToggleClicked={this.sideDrawerToggleHandler} />
			<SideDrawer 
				open={this.state.showSideDrawer}
				isAuth={this.props.isAuthenticated} 
				closed={this.sideDrawerClosedHandler} />
			<main className={csS.Content}>
				{this.props.children}
			</main>
		</Aux>
		);
}
};

const mapStateToProps = state => {
	return{
		isAuthenticated: state.auth.firetoken !== null //will influence what is displayed on toolbar and sidedrawer
	}
}


export default connect(mapStateToProps)(Layout);