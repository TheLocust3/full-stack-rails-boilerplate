import React from 'react';
import PropTypes from 'prop-types';

import AuthApi from '../../../api/auth-api';

export default class EditUserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: this.props.user.email, firstName: this.props.user.first_name, lastName: this.props.user.last_name };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthApi.editUser(this.state.email, this.state.currentPassword, this.state.password, this.state.passwordConfirmation, this.state.firstName, this.state.lastName).then( response => {
            window.location.href = this.props.redirectUrl;
        }).catch( response => {
            console.log(response);
        });
    }

    renderInputs() {
        return (
            <div>
                Email:&nbsp;<input type="email" name="email" onChange={this.handleChange.bind(this)} defaultValue={this.state.email} /><br /><br />
                First Name:&nbsp;<input type="text" name="firstName" onChange={this.handleChange.bind(this)} defaultValue={this.state.firstName} /><br /><br />
                Last Name:&nbsp;<input type="text" name="lastName" onChange={this.handleChange.bind(this)} defaultValue={this.state.lastName} /><br /><br /><br />
                Current Password:&nbsp;<input type="password" name="currentPassword" onChange={this.handleChange.bind(this)} /><br /><br />
                New Password:&nbsp;<input type="password" name="password" onChange={this.handleChange.bind(this)} /><br /><br />
                New Password Confirmation:&nbsp;<input type="password" name="passwordConfirmation" onChange={this.handleChange.bind(this)} />
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                {this.renderInputs()}
                <input type="submit" style={{visibility: 'hidden'}} /><br />

                <button type="submit">Submit</button>
            </form>
        );
    }
}

EditUserForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};
