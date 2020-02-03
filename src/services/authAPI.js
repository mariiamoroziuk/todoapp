import axios from "axios";

export default class AuthAPI {
    constructor() {
        this.url = 'https://uxcandy.com/~shapoval/test-task-backend/v2';
    }
    postAuth(data) {
        return axios.post(
            `${this.url}/login?developer=mariia`,
            data,
        )
            .then(res => res.data);
    }

    logOut() {
        localStorage.removeItem('token');
    }
}