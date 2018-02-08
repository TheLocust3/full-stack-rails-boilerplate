import UserApi from '../../api/user-api';

export const REQUEST_CURRENT_USER = 'REQUEST_CURRENT_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export function requestCurrentUserAction() {
    return {
        type: REQUEST_CURRENT_USER
    }
}

export function receiveCurrentUserAction(data) {
    return {
        type: RECEIVE_CURRENT_USER,
        data: data
    }
}

export function fetchCurrentUser() {

    return function (dispatch) {
        dispatch(requestCurrentUserAction());

        UserApi.getCurrentUser().then( data => {
            dispatch(receiveCurrentUserAction(data));
        });
    }
}
