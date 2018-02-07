import React from 'react';
import PropTypes from 'prop-types';

export default class EditUserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: null, firstName: null, lastName: null };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state)
    }

    renderInputs() {
        return (
            <div>
                Email:&nbsp;<input type="email" name="email" onChange={this.handleChange.bind(this)} /><br /><br />
                First Name:&nbsp;<input type="text" name="firstName" onChange={this.handleChange.bind(this)} /><br /><br />
                Last Name:&nbsp;<input type="text" name="lastName" onChange={this.handleChange.bind(this)} /><br /><br /><br />
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
    redirectUrl: PropTypes.string.isRequired
};
