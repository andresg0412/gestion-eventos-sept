import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default instance;