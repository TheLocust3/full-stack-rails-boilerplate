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

    register(email, password, passwordConfirmation, firstName, lastName) {
        return $.auth.emailSignUp({
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            first_name: firstName,
            last_name: lastName
        });
    },

    editUser(email, password, passwordConfirmation, firstName, lastName) {
        let hash = {};
        if (!_.isEmpty(email)) {
            hash.email = email;
        }

        if (!_.isEmpty(firstName)) {
            hash.first_name = firstName;
        }

        if (!_.isEmpty(lastName)) {
            hash.last_name = lastName;
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
