//This will render input boxes on to our ContactData container it will check what the inputType should be and gives us the right input element
import React from 'react';

import csS from './Input.css'


const input = (props) => {
	let inputElement = null;
	const inputcsS = [csS.InputElement] //programmatically set css class

	if(props.invalid && props.shouldValidate && props.touched) {
		inputcsS.push(csS.Invalid);
	}
	switch (props.elementType) {
		case ('input'):
			inputElement = <input 
						onChange={props.changed} 
						className={inputcsS.join(' ')} 
						{...props.elementFrame} 
						value={props.value} />
			break;
		case ('textarea'):
			inputElement = <textarea 
						onChange={props.changed} 
						className={inputcsS.join(' ')} 
						{...props.elementFrame} 
						value={props.value} />
			break;
		case ('select'):
			inputElement = (<select onChange={props.changed} 
								className={inputcsS.join(' ')} 
								value={props.value}>
								{props.elementFrame.options.map(opt => (
								<option key={opt.value} value={opt.value} >
									{opt.displayValue}
								</option>
								),)}
							</select>);
			break;
		default:
			inputElement = <input 
							onChange={props.changed} 
							className={inputcsS.join(' ')} 
							{...props.elementFrame} 
							value={props.value} />;
	}

	return(
	<div className={csS.Input} >
		<label className={csS.Label}>{props.label}</label>
		{inputElement}
	</div>
		);
	};

export default input