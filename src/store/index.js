import { combineReducers } from 'redux';

import inputsStates from './inputsStates';
import loader from './loader';
import modal from './modal';

export default combineReducers({
    inputsStates,
    loader,
    modal
})