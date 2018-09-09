import $ from 'jquery';

let AuthApi = {
    signIn(email, password) {
        return $.auth.emailSignIn({
            email: email,
            password: password
        });
    },

    signOut() {
        return $.auth.signOut();
    },

    register(email, password, passwordConfirmation, name) {
        return $.auth.emailSignUp({
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            name: name
        });
    },

    editUser(email, password, passwordConfirmation, name) {
        let hash = {};
        if (!_.isEmpty(email)) {
            hash.email = email;
        }

        if (!_.isEmpty(name)) {
            hash.name = name;
        }

        return $.auth.updateAccount(hash).then((user) => {
            if (!_.isEmpty(password)) {
                return $.auth.updatePassword({
                    password: password,
                    password_confirmation: passwordConfirmation
                });
            }
        });
    },

    forgotPassword(email) {
        return $.auth.requestPasswordReset({
            email: email
        });
    },

    resetPassword(password, passwordConfirmation) {
        return $.auth.updatePassword({
            password: password,
            password_confirmation: passwordConfirmation
        });
    },

    getCurrentUser() {
        return $.auth.validateToken();
    }
};

export default AuthApi;
