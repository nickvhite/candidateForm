import React, { Component } from 'react';
import {connect} from 'react-redux';

import { inputValue, pushSkill, removeSkill, pushExperience, removeExperience, inputSkill,
    inputExperience, changeSkill, showError, hideError } from '../../store/inputsStates';
import { showLoader, hideLoader } from '../../store/loader';
import { showModal, hideModal } from '../../store/modal';

import TextInput from './TextInput';
import PhoneInput from './PhoneInput';
import AreaInput from './AreaInput';
import Skills from './Skills';
import Experience from './Experience';
import OptionInput from './OptionInput';
import Loader from './Loader';
import Modal from './Modal';


class Form extends Component {
    hasValue(obj) {
        let has = false;
        Object.keys(obj).map(key => obj[key] ? has = true : null);
        return has;
    }

    validName() {
        let name = this.props.data.name.value;
        let hasNumber = /\d/;
        return !hasNumber.test(name) && name.length ? this.hideError('name') : this.showError('name');
    }

    validEmail() {
        let email = this.props.data.email.value;
        return email.includes('@') ? this.hideError('email') : this.showError('email'); 
    }

    validPhone() {
        let phone = this.props.data.phone.value;
        return phone.length === 17 ? this.hideError('phone') : this.showError('phone');
    }

    validSkills() {
        let skills = this.props.data.skills.value;
        return skills.length ? this.hideError('skills') : this.showError('skills');
    }

    showError(field) {
        this.props.showError(field);
        return false;
    }

    hideError(field) {
        this.props.hideError(field);
        return true;
    }

    validFields() {
        let validName = this.validName(),
        validEmail = this.validEmail(),
        validPhone = this.validPhone(),
        validSkills = this.validSkills()
        return (
            validName &&
            validEmail &&
            validPhone &&
            validSkills
        )
    }

    getServerResult(res) {
        this.props.hideLoader();
        this.props.showModal(res.status);
    }

    submitForm(data) {
        fetch("https://nameless-reef-79800.herokuapp.com/", { 
            method: "POST", 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            this.getServerResult(res);
        })
        .catch(err => {
            this.getServerResult(err);
        });
    }

    testSubmit() {
        this.props.showLoader();
        let data = {
            "name":"",
            "email":"email",
            "phone":"+38(066)505-98-96",
            "position":"Front-End Developer",
            "experience":[
                {
                    "projectInfo":"1",
                    "projectStack":"1",
                    "projectDescription":"1",
                    "projectRole":"1"
                },{
                    "projectInfo":"2",
                    "projectStack":"2",
                    "projectDescription":"2",
                    "projectRole":"2"
                }
            ],
            "skills":[
                {
                    "name":"3",
                    "experience":1,
                    "lastUsed":2018
                },{
                    "name":"2",
                    "experience":1,
                    "lastUsed":2018
                },{
                    "name":"1",
                    "experience":1,
                    "lastUsed":2018
                }
            ],
            "english":"Pre-Intermediate",
            "summary":"sdfgdsfg"
        }
        fetch("https://nameless-reef-79800.herokuapp.com/", { 
            method: "POST", 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            this.getServerResult(res);
        })
        .catch(err => {
            this.getServerResult(err);
        });
    }

    complitData() {
        let submitObject = {};
        let valid = this.validFields();
        if (valid) {
            this.props.showLoader();
            Object.keys(this.props.data).map(key => {
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
            this.submitForm(submitObject);
        }
    }

    render() {
        return <div id="form">
            {this.props.loader.show ? <div className="loader"></div> : null}
            {this.props.modal.show ? <Modal data={this.props.modal} close={this.props.hideModal.bind(this)}/> : null}
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
            <button className="form_submit-button" onClick={this.complitData.bind(this)}>{
                this.props.loader.show ?
                <Loader /> :
                'submit'
            }</button>
        </div>
    }
};

export default connect(
    state => ({
        data: state.inputsStates,
        loader: state.loader,
        modal: state.modal
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
        hideError,
        showLoader,
        hideLoader, 
        showModal, 
        hideModal
    })
)(Form);