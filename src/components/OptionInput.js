import React from 'react';
const OptionInput = (props) => {
		return (
			<div className={`options block ${props.data.err ? 'error' : ''}`}>
                <label htmlFor={props.name}>{props.data.label}</label>
                <select 
                    name={props.name} size='1' value={props.data.value} id={props.name}
                    onChange={(e) => props.changeFunction(e.target.value, props.name)}
                >
                    {props.data.options.map((option, index) => (
                        <option value={option} key={index}>{option}</option>
                    ))}
                </select>
            </div>
		)
}
export default OptionInput;