import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
                    <Link to="/sign_in">Sign In</Link>
                    &nbsp;|&nbsp;
                    <Link to="/sign_up">Sign Up</Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to="/users/edit">Edit User</Link>
                    &nbsp;|&nbsp;
                    <a href="" onClick={this.handleSignOut.bind(this)}>
                        Sign Out
                    </a>
                    <br />
                </div>
            );
        }
    }

    render() {
        if (!this.props.isReady) return null;

        return (
            <div>
                {this.renderUserActions()}
                <br />
                Hello {this.props.user.name}
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
