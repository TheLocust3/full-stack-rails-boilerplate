import $ from 'jquery';

let AuthApi = {

    signIn(email, password, rememberMe) {
        return new Promise((resolve, reject) => {
            $.ajax('/users/sign_in', {
                type: 'post',
                data: { user: { email: email, password: password, remember_me: rememberMe } },
                success: resolve,
                error: reject
            });
        });
    },

    signOut() {
        return new Promise((resolve, reject) => {
            $.ajax('/users/sign_out', {
                type: 'delete',
                success: resolve,
                error: reject
            });
        });
    },

    register(email, password, passwordConfirmation, firstName, lastName) {
        return new Promise((resolve, reject) => {
            $.ajax('/users', {
                type: 'post',
                data: { user: { email: email, password: password, password_confirmation: passwordConfirmation, first_name: firstName, last_name: lastName } },
                success: resolve,
                error: reject
            });
        });
    },

    editUser(email, currentPassword, password, passwordConfirmation, firstName, lastName) {
        return new Promise((resolve, reject) => {
            $.ajax('/users', {
                type: 'patch',
                data: { user: { email: email, current_password: currentPassword, password: password, password_confirmation: passwordConfirmation, first_name: firstName, last_name: lastName } },
                success: resolve,
                error: reject
            });
        });
    },

    forgotPassword(email) {
        return new Promise((resolve, reject) => {
            $.ajax('/users/password', {
                type: 'post',
                data: { user: { email: email } },
                success: resolve,
                error: reject
            });
        });
    }
};

export default AuthApi
