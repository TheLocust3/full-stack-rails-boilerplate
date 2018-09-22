import React from 'react';
import { Link } from 'react-router-dom';
import { Text, MDCAutoInit } from 'react-material-components-web';

import ForgotPasswordForm from '../../components/users/ForgotPasswordForm';

export default class ForgotPasswordContainer extends React.Component {
    render() {
        return (
            <div className="content">
                <ForgotPasswordForm redirectUrl="/" />

                <Link to="/sign_in">
                    <Text type="body2">Sign in</Text>
                </Link>

                <MDCAutoInit />
            </div>
        );
    }
}
