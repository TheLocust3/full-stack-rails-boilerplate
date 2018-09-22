import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from 'react-material-components-web';

import AuthApi from '../../../api/auth-api';

import Form from '../base/Form';

export default class EditUserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { email: this.props.user.email, name: this.props.user.name, errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthApi.editUser(this.state.email, this.state.password, this.state.passwordConfirmation, this.state.name)
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

                <TextField label="Name" name="name" defaultValue={this.state.name} onChange={this.handleChange.bind(this)} />
                <br />
                <br />

                <TextField type="password" label="New Password" name="password" onChange={this.handleChange.bind(this)} />
                <br />

                <TextField type="password" label="New Password Confirmation" name="passwordConfirmation" onChange={this.handleChange.bind(this)} />
                <br />
                <br />

                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}

EditUserForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};
