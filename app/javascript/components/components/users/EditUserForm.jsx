import React from 'react';
import PropTypes from 'prop-types';

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
                Email:&nbsp;
                <input type="email" name="email" onChange={this.handleChange.bind(this)} defaultValue={this.state.email} />
                <br />
                <br />
                Name:&nbsp;
                <input type="text" name="name" onChange={this.handleChange.bind(this)} defaultValue={this.state.name} />
                <br />
                <br />
                <br />
                New Password:&nbsp;
                <input type="password" name="password" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                New Password Confirmation:&nbsp;
                <input type="password" name="passwordConfirmation" onChange={this.handleChange.bind(this)} />
                <br />
                <br />
                <button type="submit">Submit</button>
            </Form>
        );
    }
}

EditUserForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};
