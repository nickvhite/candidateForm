import React from 'react';
const AreaInput = (props) => {
		return (
			<div className="area block">
                <label htmlFor={props.name}>{props.data.label}</label>
                <textarea 
                    type="text" 
                    value={props.data.value} 
                    id={props.name}
                    onChange={(e) => props.changeFunction(e.target.value, props.name)}
                />
            </div>
		)
}
export default AreaInput;