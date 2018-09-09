import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import EditUserForm from '../../components/users/EditUserForm';
import { fetchCurrentUser } from '../../actions/user-actions';

class EditUserContainer extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchCurrentUser());
    }

    render() {
        if (!this.props.isReady) return null;

        return (
            <div>
                <EditUserForm redirectUrl="/" user={this.props.user} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isReady,
        user: state.users.currentUser
    };
}

export default connect(mapStateToProps)(EditUserContainer);
