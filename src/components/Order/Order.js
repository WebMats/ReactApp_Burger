import React from 'react';

import csS from './Order.css';


const order = (props) => {
const ingredients = [];

for (let ingredientName in props.ingr) {
	ingredients.push(
		{
			name: ingredientName, 
			amount: props.ingr[ingredientName]
		}
		);
}
const ingredientOutput = ingredients.map(ing => {
	return <span
				style={{textTransform: 'capitalize', display: 'inline-block', margin: '3px 8px', border: '1px solid #ccc', padding: '5px'}}
	 			key={ing.name}> {ing.name} ({ing.amount}) 
	 		</span>;
});

return (
	<div className={csS.Order}>
		<p>This order was placed on {props.date.month}/{props.date.day}/{props.date.year} at {props.date.hour}:{props.date.minute} for {props.method}</p>
		<p>Ingredients: {ingredientOutput}  </p>
		<p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
	</div>
	);
	};

export default order;