import React from 'react';
import { Link } from 'react-router-dom'

import EditUserForm from '../../components/users/EditUserForm';

export default class EditUserContainer extends React.Component {

    render() {
        return (
            <div>
                <EditUserForm redirectUrl="/" />
            </div>
        );
    }
}
