import React from 'react';
import { Link } from 'react-router-dom'

import ForgotPasswordForm from '../../components/users/ForgotPasswordForm';

export default class ForgotPasswordContainer extends React.Component {

    render() {
        return (
            <div>
                <ForgotPasswordForm /><br />
                <Link to="/sign_in">Sign in</Link><br />
            </div>
        );
    }
}
