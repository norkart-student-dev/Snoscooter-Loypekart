import axios from 'axios'

export default class ServerConnection {
    async login(username, password) {
        try {
            const res = await axios.post('/qms/login', {username: username, password: password});
            return res;
        }
        catch(error) {
            console.log("An error occurred when attempting to login: ");
            console.log(error);
            return "invalid login";
        }
    }

    async logout() {
        try {
            const res = await axios.post('/qms/logout');
            if(res.status === 200) {
                return true;
            } else {
                return false;
            }
        }
        catch(error) {
            console.log("An error occured when logging out");
            console.log(error);
        }
    }

    async isLoggedIn() {
        try {
            const res = await axios.get('/qms/isLoggedIn');
            if (res.data === true) {
                return true;
            } else {
                return false;
            }
        }
        catch(error) {
            console.log("An error occured when attempting to verify login");
            console.log(error);
        }
    }
}