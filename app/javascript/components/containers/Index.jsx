import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Text } from 'react-material-components-web';

import { fetchCurrentUser } from '../actions/user-actions';
import AuthApi from '../../api/auth-api';

class Index extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchCurrentUser());
    }

    handleSignOut() {
        AuthApi.signOut().then(() => {
            window.location.href = '/';
        });
    }

    renderUserActions() {
        if (_.isEmpty(this.props.user)) {
            return (
                <div>
                    <Link to="/sign_in">
                        <Text type="body2">Sign In</Text>
                    </Link>

                    <Link to="/sign_up">
                        <Text type="body2">Sign Up</Text>
                    </Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to="/users/edit">
                        <Text type="body2">Edit User</Text>
                    </Link>

                    <a href="#" onClick={this.handleSignOut.bind(this)}>
                        <Text type="body2">Sign Out</Text>
                    </a>
                </div>
            );
        }
    }

    render() {
        if (!this.props.isReady) return null;

        return (
            <div className="content">
                {this.renderUserActions()}
                <br />
                <Text type="body2">Hello {this.props.user.name}</Text>
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

export default connect(mapStateToProps)(Index);
