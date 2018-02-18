import React from 'react';

import csS from './Button.css';


const button = (props) => (
	<button className={[csS.Button, csS[props.btnType]].join(' ')}
	onClick={props.clicked}
	disabled={props.disabled}>{props.children}</button>
	);


export default button;