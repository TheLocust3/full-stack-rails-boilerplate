import * as UserActions from '../actions/user-actions';

const initialState = {
    isReady: false,
    currentUser: {},
    user: {},
    users: []
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case UserActions.REQUEST_CURRENT_USER:
            return Object.assign({}, state, {
                isReady: false
            });
        case UserActions.RECEIVE_CURRENT_USER:
            return Object.assign({}, state, {
                isReady: true,
                currentUser: action.data
            });
        default:
            return state;
    }
}
