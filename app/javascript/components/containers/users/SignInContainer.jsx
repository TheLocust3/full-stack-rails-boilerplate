import React from 'react';
import { Link } from 'react-router-dom';

import SignInForm from '../../components/users/SignInForm';

export default class SignInContainer extends React.Component {
    render() {
        return (
            <div>
                <SignInForm redirectUrl="/" />
                <Link to="/sign_up">Sign up</Link>
                <br />
                <Link to="/forgot_password">Forgot your password?</Link>
            </div>
        );
    }
}
