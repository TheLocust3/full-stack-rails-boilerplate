import $ from 'jquery';
import * as Auth from 'j-toker';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './components/reducers/root-reducer';
import { DEVELOPMENT } from './features';

$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    beforeSend: function(xhr, settings) {
        $.auth.appendAuthHeaders(xhr, settings);
    }
});

const API_URL = DEVELOPMENT ? 'http://127.0.0.1:2000' : 'https://api.example.com';

$.auth.configure({
    apiUrl: API_URL,
    passwordResetSuccessUrl: () => {
        return `${API_URL}/reset_password`;
    }
});

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
