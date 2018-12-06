import React, { Component } from 'react';
import {connect} from 'react-redux';

import { inputValue, pushSkill, removeSkill, pushExperience, removeExperience, inputSkill,
    inputExperience, changeSkill, showError, hideError } from '../store/inputsStates';

import TextInput from './TextInput';
import PhoneInput from './PhoneInput';
import AreaInput from './AreaInput';
import Skills from './Skills';
import Experience from './Experience';
import OptionInput from './OptionInput';


class Form extends Component {
    hasValue(obj) {
        let has = false;
        Object.keys(obj).map(key => obj[key] ? has = true : null);
        return has;
    }

    submit() {
        let submitObject = {};
        let valid = true;
        Object.keys(this.props.data).map(key => {
            if (this.props.data[key].required) {
                if (!this.props.data[key].value.length || this.props.data[key].value.length < this.props.data[key].minLength) {
                    this.props.showError(key);
                    valid = false;
                } else {
                    this.props.hideError(key);
                }
            } 
            if (key === 'skills') {
                let value = this.props.data[key].value;
                let skillsValues = value.map(skill => ({
                    name: skill.name,
                    experience: skill.value.max - skill.value.min,
                    lastUsed: Math.trunc(skill.value.max)
                }))
                submitObject[key] = skillsValues;
            } else if (key === 'experience') {
                let value = this.props.data[key].values;
                let experienceValues = value.filter(experience => {
                    if (this.hasValue(experience)) {
                        return experience;
                    }
                });
                if (experienceValues.length) {
                    submitObject[key] = experienceValues;
                }
            } else {
                if (this.props.data[key].value) {
                    submitObject[key] = this.props.data[key].value;
                }
            }
        })
        if (valid) {
            console.log(submitObject);
            fetch("https://nameless-reef-79800.herokuapp.com/", { 
                method: "POST", 
                body: JSON.stringify(submitObject),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>console.log(res))
            .catch((err) => console.log(err));
        }
    }

    render() {
        return <div id="form">
            <div className="form_left-side">
                <p className="title">Personal data</p>
                {Object.keys(this.props.data).map((key, index) => {
                    switch(this.props.data[key].type) {
                        case 'textInput': 
                            return (
                                <TextInput 
                                    key={key} 
                                    data={this.props.data[key]} 
                                    name={key} 
                                    changeFunction={this.props.inputValue.bind(this)}
                                />
                            )
                        case 'phoneInput': 
                            return (
                                <PhoneInput 
                                    key={key} 
                                    data={this.props.data[key]} 
                                    name={key} 
                                    changeFunction={this.props.inputValue.bind(this)}
                                />
                            )
                        case 'optionInput': 
                            return (
                                <OptionInput 
                                    key={key} 
                                    data={this.props.data[key]} 
                                    name={key} 
                                    changeFunction={this.props.inputValue.bind(this)}
                                />
                            )
                        case 'areaInput': 
                            return (
                                <AreaInput 
                                    key={key} 
                                    data={this.props.data[key]} 
                                    name={key} 
                                    changeFunction={this.props.inputValue.bind(this)}
                                />
                            )
                        default: return undefined;
                    }
                })}
            </div>
            <div className="form_right-side">
                {Object.keys(this.props.data).map((key, index) => {
                    switch(this.props.data[key].type) {
                        case 'experience': 
                            return (
                                <Experience
                                    key={key} 
                                    data={this.props.data[key]} 
                                    name={key}
                                    inputFunction={this.props.inputExperience.bind(this)}
                                    addfunction={this.props.pushExperience.bind(this)}
                                    removeFunction={this.props.removeExperience.bind(this)}
                                />
                            )
                        case 'scills': 
                            return (
                                <Skills 
                                    key={key} 
                                    data={this.props.data[key]} 
                                    name={key}
                                    inputFunction={this.props.inputSkill.bind(this)}
                                    changeFunction={this.props.changeSkill.bind(this)}
                                    addfunction={this.props.pushSkill.bind(this)}
                                    removeFunction={this.props.removeSkill.bind(this)}
                                />
                            )
                        default: return undefined;
                    }
                })}
            </div>
            <button className="form_submit-button" onClick={this.submit.bind(this)}>submit</button>
        </div>
    }
};

export default connect(
    state => ({
        data: state.inputsStates
    }),
    ({
        inputValue,
        pushSkill,
        removeSkill,
        pushExperience,
        removeExperience,
        inputSkill,
        inputExperience,
        changeSkill, 
        showError, 
        hideError
    })
)(Form);