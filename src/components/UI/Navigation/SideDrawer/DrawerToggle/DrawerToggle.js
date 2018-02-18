//Import a dragger toogle icon to the toolbar

import React from 'react';

import csS from './DrawerToggle.css';


const drawerToggle =(props) => (
	<div className={csS.DrawerToggle} onClick={props.clicked}>
		<div></div>
		<div></div>
		<div></div>
	</div>
);

export default drawerToggle;