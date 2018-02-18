// This should render navigation links for the toolbar component
import React from 'react';

import NavItem from './NavItem/NavItem';

import csS from './NavItems.css';


const navItems = (props) => (
	<ul className={csS.NavItems}>
		<NavItem exact link="/">Burger Builder</NavItem>
		{props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null}
		{ props.isAuthenticated ? <NavItem link="/logout">Logout</NavItem> : <NavItem link="/auth">Authenticate</NavItem>}
	</ul>
	);


export default navItems;