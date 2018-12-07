import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const Skills = (props) => {
		return (
			<div className={`skills block ${props.data.err ? 'error' : ''}`}>
                <label htmlFor={props.name}>{props.data.inputLabel}</label>
                <input
                    type="text" 
                    value={props.data.inputValue} 
                    id={props.name}
                    onChange={(e)=>{
                        props.inputFunction(e.target.value)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            props.addfunction();
                        }
                    }}
                />
                <button className="skills_add-button" onClick={(e) => props.addfunction()}>Add</button>
                {props.data.value.map((val, index) => (
                    <div key={index} className="skills_value">
                        <p className="skills_value__title">{val.name}</p>
                        <InputRange 
                            value={val.value}
                            maxValue={2020}
                            minValue={2010}
                            step={0.5}
                            onChange={(e) => props.changeFunction(e, index)}
                        />
                        <button onClick={(e) => props.removeFunction(index)}>X</button>
                    </div>
                ))}
            </div>
		)
}
export default Skills;