import axios from 'axios';


export async function login(username, password) {
    try {
        const res = await axios.post('/loginRoute/login', { username: username, password: password });
        return res;
    }
    catch (error) {
        console.log("An error occurred when attempting to login: ");
        console.log(error);
        return "invalid login";
    }
}

export async function logout() {
    try {
        const res = await axios.post('/loginRoute/logout');
        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    }
    catch (error) {
        console.log("An error occured when logging out");
        console.log(error);
    }
}

export async function isLoggedIn() {
    try {
        const res = await axios.get('/loginRoute/isLoggedIn');
        if (res.data === true) {
            return true;
        } else {
            return false;
        }
    }
    catch (error) {
        console.log("An error occured when attempting to verify login");
        console.log(error);
    }
}

// Request a list of all PoI's from the backend
export async function getPois() {
    try {
        const res = await axios.get('/poi');

        let data = res.data;
        return (data);
    }
    catch (err) {
        alert("Det har oppstått et problem og punktdata kan desverre ikke vises, last inn siden eller prøv igjen senere.")
        return [];
    }
}

export async function getTracks() {
    try {
        const res = await axios.get('/tracks');

        let data = res.data;
        return (data);
    }
    catch (err) {
        console.log(err);
        alert("Det har oppstått et problem og løypedata kan desverre ikke leses av, last inn siden på nytt eller prøv igjen senere.")
        return [];
    }
}
