import React from 'react';

export default class SignInForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: null, password: null, rememberMe: false };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCheckbox(event) {
        this.setState({
            [event.target.name]: !this.state[event.target.name]
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
                Password:&nbsp;<input type="password" name="password" onChange={this.handleChange.bind(this)} /><br /><br />
                Remember Me:&nbsp;<input type="checkbox" name="rememberMe" onChange={this.handleCheckbox.bind(this)} />
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                {this.renderInputs()}<br />

                <input type="submit" style={{visibility: 'hidden'}} />
                <button type="submit">Sign In</button>
            </form>
        );
    }
}
