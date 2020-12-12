import axios from 'axios'

export default class ServerConnection {
    async login(username, password) {
        try {
            const res = await axios.post('/qms/login', {username: username, password: password});
            console.log("got login response: " + res);
            console.log(res);

            return res;
        }
        catch(error) {
            console.log("An error occurred when attempting to login: ");
            console.log(error);
            return "invalid login";
        }
    }
}