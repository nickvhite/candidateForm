const INPUT_VALUE = 'INPUT_VALUE';
const INPUT_SKILL = 'INPUT_SKILL';
const INPUT_EXPERIENCE = 'INPUT_EXPERIENCE';
const PUSH_SKILL = 'PUSH_SKILL';
const REMOVE_SKILL = 'REMOVE_SKILL';
const CHANGE_SKILL = 'CHANGE_SKILL';
const PUSH_EXPERIENCE = 'PUSH_EXPERIENCE';
const REMOVE_EXPERIENCE = 'REMOVE_EXPERIENCE';
const SHOW_ERROR = 'SHOW_ERROR';
const HIDE_ERROR = 'HIDE_ERROR';

const initialState = {
    name: {
        value: '',
        err: false,
        label: 'Full Name *',
        required: true,
        type: 'textInput'
    },
    email: {
        value: '',
        err: false,
        label: 'E-mail *',
        required: true,
        type: 'textInput'
    },
    phone: {
        value: '+38(0',
        err: false,
        label: 'Phone number *',
        required: true,
        type: 'phoneInput'
    },
    position: {
        value: 'Front-End Developer',
        err: false,
        label: 'Required position *',
        required: true,
        type: 'optionInput',
        options: [
            'Project Manager',
            'Front-End Developer',
            'Back-End Developer',
            'Full Stack Developer',
            'Designer'
        ]
    },
    experience: {
        type: 'experience',
        title: 'Recent project',
        required: false,
        inputs: [
            {
                label: 'Project name/link/git (if can provide):',
                type: 'text',
                name: 'projectInfo'
            },
            {
                label: 'Project tech stack:',
                type: 'text',
                name: 'projectStack'
            },
            {
                label: 'Project description',
                type: 'text',
                name: 'projectDescription'
            },
            {
                label: 'Your role in this project (define extensively):',
                type: 'textarea',
                name: 'projectRole'
            }
        ],
        values: [
            {
                projectInfo: '',
                projectStack: '',
                projectDescription: '',
                projectRole: ''
            }
        ]
    },
    skills: {
        inputLabel: 'Skills and technologies *',
        err: false,
        required: true,
        inputValue: '',
        type: 'scills',
        labels: [
            'Languages and tools',
            'Experience (yrs)'
        ],
        value: []
    },
    english: {
        type: 'optionInput',
        value: 'Pre-Intermediate',
        label: 'English level *',
        err: false,
        required: true,
        options: [
            'Elementary',
            'Pre-Intermediate',
            'Intermediate',
            'Upper-Intermediate',
            'Advanced',
            'Mastery'
        ]
    },
    summary: {
        value: '',
        err: false,
        title: 'Summary',
        label: 'Place here short description about yourself',
        required: false,
        type: 'areaInput'
    }
};

export default function inputsStates(state = initialState, action) {
    switch( action.type ) {
        case INPUT_VALUE: {
            state[action.payload.key].value = action.payload.value;
            state[action.payload.key].err = false;
            return {
                ...state
            }
        }
        case INPUT_SKILL: {
            return {
                ...state,
                skills: {
                    ...state.skills,
                    inputValue: action.payload,
                    err: false
                }
            }
        }
        case PUSH_SKILL: {
            if (!state.skills.inputValue) {
                return {
                    ...state,
                    skills: {
                        ...state.skills,
                        err: true
                    }
                }
            }
            let obj = {
                name: state.skills.inputValue,
                value: {
                    min: 2017,
                    max: 2018
                }
            }
            let value = state.skills.value;
            value.unshift(obj);
            return {
                ...state,
                skills: {
                    ...state.skills,
                    inputValue: '',
                    value: value
                }
            }
        }
        case CHANGE_SKILL: {
            let skills = state.skills;
            skills.value[action.payload.index].value = action.payload.value;
            return {
                ...state,
                skills: skills
            }
        }
        case REMOVE_SKILL: {
            let skills = state.skills;
            skills.value.splice(action.payload, 1);
            return {
                ...state,
                skills: skills
            }
        }
        case INPUT_EXPERIENCE: {
            let { index, key, value } = action.payload
            let experience = state.experience;
            experience.values[index][key] = value;
            return {
                ...state,
                experience: experience
            }
        }
        case PUSH_EXPERIENCE: {
            let obj = {
                projectInfo: '',
                projectStack: '',
                projectDescription: '',
                projectRole: ''
            }
            let experience = state.experience;
            experience.values.push(obj);
            return {
                ...state,
                experience: experience
            }
        }
        case REMOVE_EXPERIENCE: {
            let experience = state.experience;
            experience.values.splice(action.payload, 1);
            return {
                ...state,
                experience: experience
            }
        }
        case SHOW_ERROR: {
            
            state[action.payload].err = true;
            return {
                ...state
            }
        }
        case HIDE_ERROR: {
            state[action.payload].err = false;
            return {
                ...state
            }
        }
        default:
            return state;
    }
}

export function inputValue(value, key) {
    return {
        type: INPUT_VALUE,
        payload: {
            key,
            value
        }
    }
}

export function inputSkill(data) {
    return {
        type: INPUT_SKILL,
        payload: data
    }
}

export function pushSkill() {
    return {
        type: PUSH_SKILL
    }
}

export function removeSkill(index) {
    return {
        type: REMOVE_SKILL,
        payload: index
    }
}

export function changeSkill(value, index) {
    return {
        type: CHANGE_SKILL,
        payload: {
            value,
            index
        }
    }
}

export function inputExperience(value, index, key) {
    return {
        type: INPUT_EXPERIENCE,
        payload: {
            value,
            index,
            key
        }
    }
}

export function pushExperience(data) {
    return {
        type: PUSH_EXPERIENCE
    }
}

export function removeExperience(index) {
    return {
        type: REMOVE_EXPERIENCE,
        payload: index
    }
}

export function showError(key) {
    return {
        type: SHOW_ERROR,
        payload: key
    }
}

export function hideError(key) {
    return {
        type: HIDE_ERROR,
        payload: key
    }
}