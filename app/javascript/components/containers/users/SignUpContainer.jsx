import React from 'react';
import { Link } from 'react-router-dom';
import { Text, MDCAutoInit } from 'react-material-components-web';

import RegisterForm from '../../components/users/RegisterForm';

export default class SignUpContainer extends React.Component {
    render() {
        return (
            <div className="content">
                <RegisterForm redirectUrl="/" />

                <Link to="/sign_in">
                    <Text type="body2">Sign in</Text>
                </Link>

                <MDCAutoInit />
            </div>
        );
    }
}
