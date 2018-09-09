import React from 'react';
import PropTypes from 'prop-types';

import AuthApi from '../../../api/auth-api';

import Form from '../base/Form';

export default class ForgotPasswordForm extends React.Component {
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

        AuthApi.forgotPassword(this.state.email)
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
                <input type="email" name="email" onChange={this.handleChange.bind(this)} /> {this.state.errors.email}
                <br />
                <br />
                <button type="submit" onClick={this.handleSubmit.bind(this)}>
                    Reset Password
                </button>
            </Form>
        );
    }
}

ForgotPasswordForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired
};
