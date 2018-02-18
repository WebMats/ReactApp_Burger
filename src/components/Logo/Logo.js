import React from 'react';

import burgerLogo from "../../assets/images/burger-logo.png"; 
import csS from './Logo.css';

const logo = (props) => (
	<div className={csS.Logo}>
		<img src={burgerLogo} alt="MyBurger"/>
	</div>
	);

export default logo;