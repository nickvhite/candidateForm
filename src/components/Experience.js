import React from 'react';

const Experience = (props) => {
		return (
			<div className="experience block">
                <div className="experience_forms">
                    {props.data.values.map((value, index) => (
                        <div key={index} className={`experience_form_${index}`}>
                            <p className="title">{props.data.title}</p>
                            {index > 0 ? 
                                <button className="experience_remove-button" onClick={(e) => props.removeFunction(index)}>X</button> :
                                null
                            }
                            {props.data.inputs.map((inp, ind) => (
                                <div key={ind} className="experience_form__input">
                                    <label htmlFor={inp.name}>{inp.label}</label>
                                    {inp.type === 'text' ?
                                        <input type="text" id={inp.name} value={value[inp.name]} onChange={(e) => {props.inputFunction(e.target.value, index, inp.name)}}/> :
                                        <textarea id={inp.name} value={value[inp.name]} onChange={(e) => {props.inputFunction(e.target.value, index, inp.name)}}/>
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button className="experience_add-button" onClick={(e) => props.addfunction()}>Add project</button>
            </div>
		)
}
export default Experience;