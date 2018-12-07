import React from 'react';
const TextInput = (props) => {
		return (
			<div className={`text block ${props.data.err ? 'error' : ''}`}>
                <label htmlFor={props.name}>{props.data.label}</label>
                <input
                    type="text" 
                    value={props.data.value} 
                    id={props.name}
                    onChange={(e) => props.changeFunction(e.target.value, props.name)}
                />
            </div>
		)
}
export default TextInput;