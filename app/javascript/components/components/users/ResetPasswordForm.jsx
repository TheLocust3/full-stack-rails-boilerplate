import React from 'react';
import PropTypes from 'prop-types';

import AuthApi from '../../../api/auth-api';

export default class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { password: '', passwordConfirmation: '', errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthApi.resetPassword(this.props.token, this.state.password, this.state.passwordConfirmation)
            .then((response) => {
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

                <button type="submit" onClick={this.handleSubmit.bind(this)}>
                    Reset Password
                </button>
            </form>
        );
    }
}

ResetPasswordForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
};
