import React from 'react';
import { Link } from 'react-router-dom';

import RegisterForm from '../../components/users/RegisterForm';

export default class SignUpContainer extends React.Component {
    render() {
        return (
            <div>
                <RegisterForm redirectUrl="/" />
                <Link to="/sign_in">Sign in</Link>
                <br />
            </div>
        );
    }
}
