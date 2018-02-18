//This should allow us to fetch ingredients one by one as we need them
import React, {Component} from 'react';

import PropTypes from 'prop-types'; 

import csS from './BurgerIngr.css';


class BurgerIngr extends Component {

render () {

	let ingredient = null;
switch (this.props.type) { 
	case ('bread-bottom'):
		ingredient = <div className={csS.BreadBottom}></div>; 
		break; 
	case ('bread-top'):
		ingredient= (
			<div className={csS.BreadTop}>
				<div className={csS.Seeds1}></div>
				<div className={csS.Seeds2}></div>
			</div>
			); 
		break;
	case ('meat'):
		ingredient= <div className={csS.Meat}></div> ;
		break;
	case ('cheese'):
		ingredient= <div className={csS.Cheese}></div> ;
		break;
	case ('salad'):
		ingredient= <div className={csS.Salad}></div> ;
		break;
	case ('bacon'):
		ingredient= <div className={csS.Bacon}></div> ;
		break;
	default:
		ingredient = null;
		break;
	}
	return ingredient;
}
}

BurgerIngr.propTypes = {
	type: PropTypes.string.isRequired //makes sure firebase is giving us our ingredient names as string types
};

export default BurgerIngr;