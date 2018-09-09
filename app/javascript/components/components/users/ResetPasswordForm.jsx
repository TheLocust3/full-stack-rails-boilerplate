import React from 'react';
import PropTypes from 'prop-types';

import AuthApi from '../../../api/auth-api';
import Form from '../base/Form';

export default class ResetPasswordForm extends React.Component {
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

        AuthApi.resetPassword(this.props.token, this.state.password, this.state.passwordConfirmation)
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
                Password:&nbsp;
                <input type="password" name="password" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                Confirm Password:&nbsp;
                <input type="password" name="passwordConfirmation" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                <button type="submit" onClick={this.handleSubmit.bind(this)}>
                    Reset Password
                </button>
            </Form>
        );
    }
}

ResetPasswordForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
};
