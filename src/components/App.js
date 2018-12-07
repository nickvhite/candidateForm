import React, { Component } from 'react';
import {connect} from 'react-redux';

import Form from './Form';

class App extends Component {
    render() {
        return (
            <Form />
        )
    };
}

export default connect(
    state => ({
        data: state.inputsStates
    }),
    ({})
)(App);