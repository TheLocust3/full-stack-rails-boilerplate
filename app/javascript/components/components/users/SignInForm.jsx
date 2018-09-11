import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { setCookie, getCookie } from '../../../helpers';
import AuthApi from '../../../api/auth-api';

import TextField from '../elements/TextField';
import Button from '../elements/Button';
import Checkbox from '../elements/Checkbox';
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
                <TextField type="email" label="Email" name="email" defaultValue={this.state.email} onChange={this.handleChange.bind(this)} />
                <br />

                <TextField type="password" label="Password" name="password" onChange={this.handleChange.bind(this)} />
                <br />
                <br />

                <Checkbox label="Remember Me" defaultChecked={this.state.rememberMe} onChange={this.handleCheckbox.bind(this)} />
                <br />
                <br />

                <Button type="submit">Sign In</Button>
            </Form>
        );
    }
}

SignInForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired
};
