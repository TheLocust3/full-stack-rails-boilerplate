import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import ResetPasswordForm from '../../components/users/ResetPasswordForm';

export default class ResetPasswordContainer extends React.Component {
    render() {
        let parsed = queryString.parse(location.search);

        return (
            <div>
                <ResetPasswordForm redirectUrl="/" token={parsed.reset_password_token} />
                <Link to="/sign_in">Sign in</Link>
                <br />
            </div>
        );
    }
}
