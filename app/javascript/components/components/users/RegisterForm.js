import React from 'react';
import PropTypes from 'prop-types';

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: null, firstName: null, lastName: null, password: null, passwordConfirmation: null };
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
                Last Name:&nbsp;<input type="text" name="lastName" onChange={this.handleChange.bind(this)} /><br /><br />
                Password:&nbsp;<input type="password" name="password" onChange={this.handleChange.bind(this)} /><br /><br />
                Confirm Password:&nbsp;<input type="password" name="passwordConfirmation" onChange={this.handleChange.bind(this)} />
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                {this.renderInputs()}
                <input type="submit" style={{visibility: 'hidden'}} /><br />

                <button type="submit">Register</button>
            </form>
        );
    }
}

RegisterForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired
};
