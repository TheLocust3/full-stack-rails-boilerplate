import React from 'react';
import { Link } from 'react-router-dom';

import Text from '../../components/elements/Text';
import MDCAutoInit from '../../components/base/MDCAutoInit';
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
