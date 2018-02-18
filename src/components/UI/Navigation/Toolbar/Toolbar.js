//Gives us a navigation toolbar that will be found at the top of every page
import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

import csS from './Toolbar.css';


const toolbar = (props) => (
	<header className={csS.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked} />
		<div className={csS.Logo}>
			<Logo />
		</div>
		<nav className={csS.DesktopOnly}>
			<NavItems isAuthenticated={props.isAuth} />
		</nav>
	</header>
);

export default toolbar;