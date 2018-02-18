// A sidedrawer for our mobile users
import React from 'react';

import Aux from '../../../../hoc/Aux/Aux';
import Backdrop from '../../Backdrop/Backdrop';
import Logo from '../../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

import csS from './SideDrawer.css';


const sideDrawer = (props) => {

	let attachedcsS = [csS.SideDrawer, csS.Close];
	if (props.open) {
		attachedcsS=[csS.SideDrawer, csS.Open];
	}
	return (
	<Aux>
		<div className={csS.Backdrop}>
		<Backdrop show={props.open} clicked={props.closed}/>
		</div>
		<div className={attachedcsS.join(" ")}>
			<div className={csS.Logo}>
				<Logo />
			</div>
			<nav onClick={props.closed}>
				<NavItems isAuthenticated={props.isAuth} />
			</nav>
		</div>
	</Aux>
	);
};

export default sideDrawer;