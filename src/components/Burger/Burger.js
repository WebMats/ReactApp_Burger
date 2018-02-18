// this should return all the burger ingredients that we have fetched from BurgerIngr
import React from 'react';

import BurgerIngr from './BurgerIngredients/BurgerIngr';

import csS from './Burger.css';


const burger = (props) => {

 
let transformedIngrs = Object.keys(props.ingr).map(ingKey => {
						return [...Array(props.ingr[ingKey])].map((_, i) => {
						return <BurgerIngr key ={ingKey + i} type={ingKey}/>;}); 
						})
						.reduce((arr, el) => {
							return arr.concat(el)
						}, []);

	if (transformedIngrs.length === 0) {
		transformedIngrs = <p> Please start adding ingredients </p>
	}
return (
	<div className={csS.Burger}>
		<BurgerIngr className={csS.BurgerInner} type="bread-top" />
		{transformedIngrs}
		<BurgerIngr type="bread-bottom" />
	</div>
	)
}

export default burger;