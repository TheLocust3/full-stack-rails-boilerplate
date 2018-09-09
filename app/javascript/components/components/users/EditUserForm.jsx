import React from 'react';
import PropTypes from 'prop-types';

import AuthApi from '../../../api/auth-api';

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

        AuthApi.editUser(this.state.email, this.state.currentPassword, this.state.password, this.state.passwordConfirmation, this.state.name)
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
                <input type="email" name="email" onChange={this.handleChange.bind(this)} defaultValue={this.state.email} /> {this.state.errors.email}
                <br />
                <br />
                Name:&nbsp;
                <input type="text" name="name" onChange={this.handleChange.bind(this)} defaultValue={this.state.name} /> {this.state.errors.name}
                <br />
                <br />
                <br />
                Current Password:&nbsp;
                <input type="password" name="currentPassword" onChange={this.handleChange.bind(this)} /> {this.state.errors.current_password}
                <br />
                <br />
                New Password:&nbsp;
                <input type="password" name="password" onChange={this.handleChange.bind(this)} /> {this.state.errors.password}
                <br />
                <br />
                New Password Confirmation:&nbsp;
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

                <button type="submit">Submit</button>
            </form>
        );
    }
}

EditUserForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};
