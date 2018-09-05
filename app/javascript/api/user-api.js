import $ from 'jquery';

let UserApi = {
    getCurrentUser() {
        return new Promise((resolve, reject) => {
            $.ajax('/api/users', {
                type: 'get',
                success: resolve,
                error: reject
            });
        });
    }
};

export default UserApi;
