import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import AuthApi from '../../../api/auth-api';
import Form from '../base/Form';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { errors: {} };
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
                    errors: response.data.errors
                });
            });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                Email:&nbsp;
                <input type="email" name="email" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                Name:&nbsp;
                <input type="text" name="name" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                Password:&nbsp;
                <input type="password" name="password" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                Confirm Password:&nbsp;
                <input type="password" name="passwordConfirmation" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                <button type="submit">Register</button>
            </Form>
        );
    }
}

RegisterForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired
};
