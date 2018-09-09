import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import AuthApi from '../../../api/auth-api';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            name: null,
            password: null,
            passwordConfirmation: null,
            errors: {}
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthApi.register(this.state.email, this.state.password, this.state.passwordConfirmation, this.state.name)
            .then(() => {
                window.location.href = this.props.redirectUrl;
            })
            .catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
    }

    renderInputs() {
        return (
            <div>
                Email:&nbsp;
                <input type="email" name="email" onChange={this.handleChange.bind(this)} /> {this.state.errors.email}
                <br />
                <br />
                Name:&nbsp;
                <input type="text" name="name" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                Password:&nbsp;
                <input type="password" name="password" onChange={this.handleChange.bind(this)} /> {this.state.errors.password}
                <br />
                <br />
                Confirm Password:&nbsp;
                <input type="password" name="passwordConfirmation" onChange={this.handleChange.bind(this)} />{' '}
                {this.state.errors.password_confirmation}
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                {this.renderInputs()}
                <input type="submit" style={{ visibility: 'hidden' }} />
                <br />

                <button type="submit">Register</button>
            </form>
        );
    }
}

RegisterForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired
};
