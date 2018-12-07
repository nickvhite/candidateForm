import React from 'react';
function mask (evt) {
    var text = evt.target;
    var value = text.value;
    var mask = '+38(000)000-00-00'
    var literalPattern=/[0\*]/;
    var numberPattern=/[0-9]/;
    var newValue = "+38(0";
    for (var vId = 5, mId = 5 ; mId < mask.length ; ) {
        if (mId >= value.length) break;
        if (mask[mId] === '0' && value[vId].match(numberPattern) == null) break;
        while (mask[mId].match(literalPattern) == null) {
            if (value[vId] === mask[mId]) break;
            newValue += mask[mId++];
        }
        newValue += value[vId++];
        mId++;
    }
    return newValue;
}

const PhoneInput = (props) => {
		return (
			<div className={`phone block ${props.data.err ? 'error' : ''}`}>
                <label htmlFor={props.name}>{props.data.label}</label>
                <input 
                    type="tel" 
                    value={props.data.value} 
                    id={props.name}
                    onChange={(e) => props.changeFunction(mask(e), props.name)}
                />
            </div>
		)
}
export default PhoneInput;