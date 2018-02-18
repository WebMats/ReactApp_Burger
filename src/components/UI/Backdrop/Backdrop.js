//This will render a backdrop when the modal/SideDrawer is shown
import React from 'react';

import csS from './Backdrop.css';


const backdrop = (props) => (
	props.show ? <div onClick={props.clicked} className={csS.Backdrop}></div> : null
);

export default backdrop;