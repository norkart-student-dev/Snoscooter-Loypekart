import axios from 'axios';
import proj4 from 'proj4';
import { calcCrow } from './utils/geometry';


export async function login(data) {
    const res = await axios.post('/loginRoute/login', data);
    return res;
}

export async function logout() {
    try {
        const res = await axios.get('/loginRoute/logout');
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
export async function getPois({ pageParam = 0 }) {
    try {
        const res = await axios.get('/poi?index=' + pageParam);
        return res.data;
    }
    catch (err) {
        console.log(err)
        alert("Det har oppstått et problem og punktdata kan desverre ikke vises, last inn siden eller prøv igjen senere.")
    }
}

export async function getTracks() {
    try {
        const res = await axios.get('/tracks');
        return res.data;
    }
    catch (err) {
        alert("Det har oppstått et problem og løypedata kan desverre ikke leses av, last inn siden på nytt eller prøv igjen senere.")
    }
}

export async function createPoi(data) {
    const res = await axios.post('/poi', data);
}

export async function updatePoi(data) {
    console.log(data)
    const res = await axios.patch('/poi/' + data.id, data);
}

export async function deletePoi(id) {
    const res = await axios.delete('/poi/' + id);
}

export async function deleteTrack(id) {
    console.log("deleting track " + id)
    const res = await axios.delete('/tracks/' + id);
}

export async function bulkDeleteTrack(ids) {
    const res = await axios.patch('/tracks/bulkdelete', ids)
}

export async function updateTrack(data) {
    const res = await axios.patch('/tracks/' + data.id, data);
}

export async function splitTrack({ item, coords }) {
    let current = null;
    console.log(item)
    console.log(coords)
    item.coordinates.forEach(element => {
        let converted = proj4(
            '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs ',
            '+proj=longlat +datum=WGS84 +no_defs ',
            element);
        converted = [converted[1], converted[0]]
        let convertedCurr = proj4(
            '++proj=utm +zone=33 +datum=WGS84 +units=m +no_defs ',
            '+proj=longlat +datum=WGS84 +no_defs ',
            current);
        convertedCurr = [convertedCurr[1], convertedCurr[0]]
        if (current === null) {
            current = element
        } else if (calcCrow(converted[0], converted[1], coords.lat, coords.lng) < calcCrow(convertedCurr[0], convertedCurr[1], coords.lat, coords.lng)) {
            current = element
        }
    });
    console.log(current)
    const res = await axios.patch('/tracks/split/' + item.id + '/' + current)
}
