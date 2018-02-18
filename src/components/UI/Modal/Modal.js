//This should give us a wrapping element for the summary of our order before purchasing
//This should be hidden until we press ORDER NOW on BurgerBuilder
import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

import csS from './Modal.css';


class Modal extends Component {

	shouldComponentUpdate(nextProps, nextState) { // makes sure we aren't updating the Modal when it is not shown
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}

	render() {

		return (
			<Aux >
				<Backdrop clicked={this.props.modalClosed} show={this.props.show} />
				<div 
					className={csS.Modal} 
					style={{transform: this.props.show ? 'translateY(0)':'translateY(-120vh)', opacity: this.props.show ? '1' : '0'}}>
					{this.props.children}
				</div>
			</Aux>

			)};
	}
export default Modal;