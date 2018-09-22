import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from 'react-material-components-web';

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
                <TextField type="password" label="Password" name="password" onChange={this.handleChange.bind(this)} />
                <br />

                <TextField type="password" label="Confirm Password" name="passwordConfirmation" onChange={this.handleChange.bind(this)} />

                <br />
                <br />
                <Button type="submit">Reset Password</Button>
            </Form>
        );
    }
}

ResetPasswordForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
};
