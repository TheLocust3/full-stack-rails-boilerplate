import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import AuthApi from '../../../api/auth-api';

export default class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { email: null, password: null, rememberMe: false, error: '' };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCheckbox(event) {
        this.setState({
            [event.target.name]: !this.state[event.target.name]
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthApi.signIn(this.state.email, this.state.password, this.state.rememberMe)
            .then((response) => {
                window.location.href = this.props.redirectUrl;
            })
            .catch((response) => {
                this.setState({
                    error: response.responseJSON.error
                });
            });
    }

    renderError() {
        if (_.isEmpty(this.state.error)) return;

        return <div>{this.state.error}</div>;
    }

    renderInputs() {
        return (
            <div>
                Email:&nbsp;
                <input type="email" name="email" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                Password:&nbsp;
                <input type="password" name="password" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                Remember Me:&nbsp;
                <input type="checkbox" name="rememberMe" onChange={this.handleCheckbox.bind(this)} />
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                {this.renderInputs()}
                <input type="submit" style={{ visibility: 'hidden' }} />
                <br />

                <button type="submit">Sign In</button>
                {this.renderError()}
            </form>
        );
    }
}

SignInForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired
};
