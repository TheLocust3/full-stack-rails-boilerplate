import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Text, MDCAutoInit } from 'react-material-components-web';

import ResetPasswordForm from '../../components/users/ResetPasswordForm';

export default class ResetPasswordContainer extends React.Component {
    render() {
        let parsed = queryString.parse(location.search);

        return (
            <div className="content">
                <ResetPasswordForm redirectUrl="/" token={parsed.reset_password_token} />

                <Link to="/sign_in">
                    <Text type="body2">Sign in</Text>
                </Link>

                <MDCAutoInit />
            </div>
        );
    }
}
