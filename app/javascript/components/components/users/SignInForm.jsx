import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { setCookie, getCookie } from '../../../helpers';
import AuthApi from '../../../api/auth-api';

import Form from '../base/Form';

export default class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        let email = getCookie('email');
        this.state = { email: email, rememberMe: !_.isEmpty(email), error: '' };
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

        if (this.state.rememberMe) {
            setCookie('email', this.state.email, 14);
        } else {
            setCookie('email', '', 14);
        }

        AuthApi.signIn(this.state.email, this.state.password, this.state.rememberMe)
            .then(() => {
                window.location.href = this.props.redirectUrl;
            })
            .catch((response) => {
                this.setState({
                    errors: response.data.errors
                });
            });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                Email:&nbsp;
                <input type="email" name="email" defaultValue={this.state.email} onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                Password:&nbsp;
                <input type="password" name="password" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                Remember Me:&nbsp;
                <input type="checkbox" name="rememberMe" defaultChecked={this.state.rememberMe} onChange={this.handleCheckbox.bind(this)} />
                <br />
                <br />
                <button type="submit">Sign In</button>
            </Form>
        );
    }
}

SignInForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired
};
