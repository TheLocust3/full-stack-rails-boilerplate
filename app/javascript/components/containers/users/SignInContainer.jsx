import React from 'react';
import { Link } from 'react-router-dom';

import Text from '../../components/elements/Text';
import MDCAutoInit from '../../components/base/MDCAutoInit';
import SignInForm from '../../components/users/SignInForm';

export default class SignInContainer extends React.Component {
    render() {
        return (
            <div className="content">
                <SignInForm redirectUrl="/" />

                <Link to="/sign_up">
                    <Text type="body2">Sign up</Text>
                </Link>

                <Link to="/forgot_password">
                    <Text type="body2">Forgot your password?</Text>
                </Link>

                <MDCAutoInit />
            </div>
        );
    }
}
