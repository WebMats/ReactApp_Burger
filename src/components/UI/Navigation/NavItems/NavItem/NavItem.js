//This subcomponent will style and return our links to Navigation Items
import React from 'react';
import {NavLink} from 'react-router-dom';

import csS from './NavItem.css';


const navItem = (props) => (
	<li className={csS.NavItem}>
		<NavLink
			exact={props.exact}
			activeClassName={csS.active}
		 	to={props.link}>
		 {props.children}</NavLink>
	</li>
	);


export default navItem