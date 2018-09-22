import React from 'react';
import { connect } from 'react-redux';
import { MDCAutoInit } from 'react-material-components-web';

import { fetchCurrentUser } from '../../actions/user-actions';

import EditUserForm from '../../components/users/EditUserForm';

class EditUserContainer extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchCurrentUser());
    }

    render() {
        if (!this.props.isReady) return null;

        return (
            <div className="content">
                <EditUserForm redirectUrl="/" user={this.props.user} />

                <MDCAutoInit />
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
