import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import reducer from '../components/reducers/root-reducer';

import Index from '../components/containers/Index';
import SignInContainer from '../components/containers/users/SignInContainer';
import SignUpContainer from '../components/containers/users/SignUpContainer';
import ForgotPasswordContainer from '../components/containers/users/ForgotPasswordContainer';
import ResetPasswordContainer from '../components/containers/users/ResetPasswordContainer';
import EditUserContainer from '../components/containers/users/EditUserContainer';

$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    dataType: 'json'
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// Always start navigation at the top of the page
const ScrollToTop = () => {
    window.scrollTo(0, 0);

    return null;
};

class Base extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router>
                        <div>
                            <Route component={ScrollToTop} />

                            <Switch>
                                <Route exact path='/' component={Index} />
                                <Route exact path='/sign_in' component={SignInContainer} />
                                <Route exact path='/sign_up' component={SignUpContainer} />
                                <Route exact path='/forgot_password' component={ForgotPasswordContainer} />
                                <Route exact path='/reset_password' component={ResetPasswordContainer} />
                                <Route exact path='/users/edit' component={EditUserContainer} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(
    <Base />,
    document.getElementById('root')
);
