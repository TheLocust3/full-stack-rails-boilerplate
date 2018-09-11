import React from 'react';
import PropTypes from 'prop-types';

import AuthApi from '../../../api/auth-api';

import TextField from '../elements/TextField';
import Button from '../elements/Button';
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
                <TextField type="email" label="Email" name="email" onChange={this.handleChange.bind(this)} />
                <br />
                <br />

                <Button type="submit">Reset Password</Button>
            </Form>
        );
    }
}

ForgotPasswordForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired
};
